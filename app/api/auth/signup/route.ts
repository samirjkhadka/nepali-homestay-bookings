// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, password, confirm_password } = body;

    // Validation (same — good)
    if (!name || !email || !password || !confirm_password) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (password !== confirm_password) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        first_name: name.split(" ")[0],
        last_name: name.split(" ").slice(1).join(" ") || null,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: "guest",
      })
      .returning();

    // Fire-and-forget OTP send
    fetch(new URL("/api/auth/send-otp", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, userId: newUser.id }),
    }).catch(console.error);

    // DO NOT create session here
    // User must verify OTP first

    return NextResponse.json({ 
      success: true,
      message: "Account created! Please verify your email/phone"
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}