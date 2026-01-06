// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { otpVerifications, users } from "@/lib/db/schema";
import { eq, and, gte } from "drizzle-orm";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { otp } = await request.json();

  if (!otp || otp.length !== 6) {
    return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
  }

  try {
    const [verification] = await db
      .select()
      .from(otpVerifications)
      .where(
        and(
          eq(otpVerifications.code, otp),
          gte(otpVerifications.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!verification || !verification.userId) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, verification.userId));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await createSession(user.id, user.role || "guest", user.email);

    await db
      .delete(otpVerifications)
      .where(eq(otpVerifications.id, verification.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
