// app/api/auth/set-password/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token")?.toString();
  const password = formData.get("password")?.toString();
  const confirm = formData.get("confirm")?.toString();

  if (password !== confirm) {
    return NextResponse.json({ error: "Passwords don't match" }, { status: 400 });
  }

  const [host] = await db.select().from(hosts).where(eq(hosts.password_reset_token, token || ""));

  if (!host || !host.token_expiry || new Date() > host.token_expiry) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const hashed = await hashPassword(password!);

  await db.update(hosts)
    .set({ 
      password: hashed, 
      password_reset_token: null, 
      token_expiry: null 
    })
    .where(eq(hosts.id, host.id));

  return NextResponse.redirect(new URL("/host/login?setup=success", request.url));
}