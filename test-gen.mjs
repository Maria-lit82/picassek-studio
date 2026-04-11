import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
let apiKey = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('OPENROUTER_API_KEY=')) {
    apiKey = line.replace('OPENROUTER_API_KEY=', '').replace(/"/g, '').trim();
  }
}

async function run() {
  try {
    const topic = "карусель которая рассказывает про новые проекты с вайбкодингом";
    const type = "CAROUSEL";
    const slideCount = 5;
    const tone = "viral";

    const safetyCheckPrompt = `Проверь следующий запрос пользователя на наличие запрещенных тем: насилие, дискриминация, сексуальный контент, терроризм, наркотики, педофилия. 
    Запрос: "${topic}" 
    Верни ТОЛЬКО слово "SAFE", если запрос безопасен, или "FORBIDDEN", если он нарушает правила.`;

    const safetyResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: safetyCheckPrompt }],
      }),
    });

    if (!safetyResponse.ok) {
       console.log("SAFETY CALL FAILED", await safetyResponse.text());
       return;
    }

    const safetyData = await safetyResponse.json();
    const safetyResult = safetyData.choices[0].message.content.trim();
    console.log("Safety Result:", safetyResult);

    const systemPrompt = `You are "Picassek Content Studio", a viral social media expert. 
      Create a high-converting carousel for social media about: "${topic}".
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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": `http://localhost:3000`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: "You are Picassek AI Studio expert. Return ONLY JSON." },
            { role: "user", content: systemPrompt }
          ],
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
         console.log("GENERATE CALL FAILED", await response.text());
         return;
      }
      
      const aiData = await response.json();
      console.log("GPT RAW", aiData.choices[0].message.content);
      const contentJson = JSON.parse(aiData.choices[0].message.content);
      console.log("Parsed keys", Object.keys(contentJson));
  } catch (e) {
    console.log("ERROR", e);
  }
}
run();
