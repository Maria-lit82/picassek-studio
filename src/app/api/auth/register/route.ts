import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, referralCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Initial Registration
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        balance: 150, // Начальный бонус для всех новых пользователей
        role: email === "palette1982@gmail.com" ? "ADMIN" : "USER",
        invitedBy: referralCode || null,
      },
    });

    // Handle Referral Bonus for Inviter
    if (referralCode) {
      const inviter = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (inviter) {
        await prisma.user.update({
          where: { id: inviter.id },
          data: {
            balance: { increment: 200 }, // Бонус 200 руб за приглашение
            referralsCount: { increment: 1 }
          }
        });
      }
    }

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser.id, email: newUser.email, role: newUser.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
