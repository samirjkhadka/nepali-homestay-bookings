// app/api/auth/host-login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString().toLowerCase();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirect")?.toString() || "/host/dashboard";

  if (!email || !password) {
    return NextResponse.json({ error: "Required" }, { status: 400 });
  }

  const [host] = await db.select().from(hosts).where(eq(hosts.email, email));

  if (!host || !host.password || !(await verifyPassword(host.password, password))) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  await createSession(host.id, "host", host.email);

  return NextResponse.redirect(new URL(redirectTo, request.url));
}