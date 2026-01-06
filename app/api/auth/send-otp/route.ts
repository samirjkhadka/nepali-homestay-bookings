// app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { otpVerifications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendEmailOTP } from "@/lib/email";
import { sendSMSOTP } from "@/lib/sms";

export async function POST(request: Request) {
  const { email, phone, userId } = await request.json();

  if (!email || !userId) {
    return NextResponse.json(
      { error: "Email and user ID required" },
      { status: 400 }
    );
  }

  try {
    const [existing] = await db
      .select()
      .from(otpVerifications)
      .where(eq(otpVerifications.userId, userId));

    if (existing) {
      const attempts = existing.attempts ?? 0;
      const maxAttempts = existing.maxAttempts ?? 3;

      if (attempts >= maxAttempts) {
        return NextResponse.json(
          {
            error: "Maximum resend attempts reached. Please try signup again.",
          },
          { status: 429 }
        );
      }

      // Increment attempts
      await db
        .update(otpVerifications)
        .set({ attempts: attempts + 1 })
        .where(eq(otpVerifications.id, existing.id));
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 120 * 1000); // 120 seconds

    if (existing) {
      await db
        .update(otpVerifications)
        .set({ code, expiresAt })
        .where(eq(otpVerifications.id, existing.id));
    } else {
      await db.insert(otpVerifications).values({
        userId,
        email,
        phone: phone || null,
        code,
        expiresAt,
      });
    }

    await sendEmailOTP(email, code);
    if (phone) {
      await sendSMSOTP(phone, code);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
