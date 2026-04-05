import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const OPENROUTER_MODEL = "bytedance-seed/seedream-4.5";

const PRICING = {
  IMAGE: 40,
  CAROUSEL: 75
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Необходима авторизация" }, { status: 401 });
    }

    const { type = "CAROUSEL", topic, slideCount = 5, tone = "viral", referenceUrl, referenceDesc } = await req.json();

    if (!topic) {
      return NextResponse.json({ message: "Введите тему или описание" }, { status: 400 });
    }

    const cost = type === "IMAGE" ? PRICING.IMAGE : PRICING.CAROUSEL;

    // 1. Check user balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true },
    });

    if (!user || user.balance < cost) {
      return NextResponse.json({ message: `Недостаточно средств. Стоимость: ${cost} ₽` }, { status: 403 });
    }

    // 2. Safety & Moderation Check (System-level guardrail)
    const safetyCheckPrompt = `Проверь следующий запрос пользователя на наличие запрещенных тем: насилие, дискриминация, сексуальный контент, терроризм, наркотики, педофилия. 
    Запрос: "${topic}" ${referenceDesc ? `Описание стиля: "${referenceDesc}"` : ""}
    Верни ТОЛЬКО слово "SAFE", если запрос безопасен, или "FORBIDDEN", если он нарушает правила.`;

    const safetyResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Use a cheaper model for safety check
        messages: [{ role: "user", content: safetyCheckPrompt }],
      }),
    });

    const safetyData = await safetyResponse.json();
    const safetyResult = safetyData.choices[0].message.content.trim();

    if (safetyResult.includes("FORBIDDEN")) {
      return NextResponse.json({ 
        message: "Ваш запрос содержит недопустимые темы (насилие, дискриминация и т.д.) и был отклонен системой безопасности." 
      }, { status: 400 });
    }

    // 3. Generation Logic (Picassek Style)
    let systemPrompt = "";
    const referenceContext = `
    ${referenceUrl ? `REFERENCE IMAGE URL: ${referenceUrl}` : ""}
    ${referenceDesc ? `STYLE REFERENCE DESCRIPTION: ${referenceDesc}` : ""}
    If a reference is provided, MATCH its aesthetic, lighting, and mood perfectly.
    `;

    if (type === "IMAGE") {
      systemPrompt = `You are "Picassek AI", a professional digital artist. 
      The user describes what they want in Russian: "${topic}".
      ${referenceContext}
      Task: Create a highly detailed technical prompt in ENGLISH for a professional image generator (like Midjourney/Stable Diffusion).
      The prompt should be artistic, aesthetic, and use ${tone} style.
      Mention artistic lighting, texture, and composition.
      
      IMPORTANT: You must return ONLY a JSON object.
      Structure:
      {
        "topic": "${topic}",
        "picassek_prompt": "Detailed English artistic prompt here",
        "caption": "Креативное описание на русском языке для этого арта. Автор: @mary_lit"
      }`;
    } else {
      systemPrompt = `You are "Picassek Content Studio", a viral social media expert. 
      Create a high-converting carousel for social media about: "${topic}".
      ${referenceContext}
      The tone should be ${tone}.
      Generate exactly ${slideCount} slides.
      
      IMPORTANT: You must return ONLY a JSON object. No Markdown.
      Structure:
      {
        "topic": "${topic}",
        "slides": [
          {
            "title": "Заголовок слайда на русском",
            "content": "Краткий и цепляющий текст на русском (макс 150 симв)",
            "imagePrompt": "Detailed technical English prompt for an AI image generator representing this slide's content. Aesthetic and professional."
          }
        ],
        "caption": "Цепляющее описание для поста на русском с эмодзи. Разработано в @mary_lit"
      }`;
    }

    const messages = [
      { role: "system", content: "You are Picassek AI Studio expert. Return ONLY JSON." },
      { role: "user", content: systemPrompt }
    ];

    // If multimodal support is needed and referenceUrl is present, we could potentially pass it as a content-array
    // But since we're using Seedream via OpenRouter which is a chat-to-image/prompt model in this context,
    // we pass the URL in the text prompt as instructed.

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${process.env.NEXTAUTH_URL}`,
        "X-Title": "Picassek AI Studio",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
        return NextResponse.json({ message: "Ошибка нейросети. Попробуйте позже." }, { status: 500 });
    }

    const aiData = await response.json();
    const contentJson = JSON.parse(aiData.choices[0].message.content);

    // 4. Save to Database & Deduct Balance
    const [post, updatedUser] = await prisma.$transaction([
      prisma.post.create({
        data: {
          userId: session.user.id,
          type: type,
          topic: topic,
          content: JSON.stringify(type === "IMAGE" ? [contentJson.picassek_prompt] : contentJson.slides),
          caption: contentJson.caption,
          referenceUrl,
          referenceDesc,
          status: "COMPLETED",
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { balance: { decrement: cost } },
      }),
    ]);

    return NextResponse.json({ 
      message: "Успешно создано", 
      post,
      balanceRemaining: updatedUser.balance 
    });

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ message: "Произошла внутренняя ошибка" }, { status: 500 });
  }
}
