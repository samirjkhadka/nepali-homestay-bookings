// src/lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmailOTP(to: string, code: string) {
  await transporter.sendMail({
    from: '"Nepali Homestays" <no-reply@nepalihomestays.com>',
    to,
    subject: "Your Verification Code",
    text: `Your verification code is ${code}. Valid for 2 minutes.`,
    html: `<p>Your verification code is <strong>${code}</strong></p><p>Valid for 2 minutes.</p>`,
  });
}
