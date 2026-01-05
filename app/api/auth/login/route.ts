// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().toLowerCase();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirect")?.toString() || "/admin";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user || !user.password || !(await verifyPassword(user.password, password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(user.id, user.role || "admin", user.email);

  return NextResponse.redirect(new URL(redirectTo, request.url));
}