// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { hosts, users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/auth";

type Account = {
  id: number;
  email: string;
  password: string | null;
  role: string;
};
export async function POST(request: Request) {
  const formData = await request.formData();
  const identifier = formData.get("identifier")?.toString().trim();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirect")?.toString() || "/admin";

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Email or Mobile Number and password required" },
      { status: 400 }
    );
  }

  try {
    let account: Account | null = null;

    // Search in users table first
    const [userAccount] = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        role: users.role,
      })
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.phone, identifier)));

    if (userAccount) {
      account = {
        id: userAccount.id,
        email: userAccount.email,
        password: userAccount.password,
        role: userAccount.role || "guest",
      };
    }

    // If not found, search in hosts table
    if (!account) {
      const [hostAccount] = await db
        .select({
          id: hosts.id,
          email: hosts.email,
          password: hosts.password,
          role: hosts.role,
        })
        .from(hosts)
        .where(or(eq(hosts.email, identifier), eq(hosts.phone, identifier)));

      if (hostAccount) {
        account = {
          id: hostAccount.id,
          email: hostAccount.email,
          password: hostAccount.password,
          role: hostAccount.role || "host",
        };
      }
    }

    if (
      !account ||
      !account.password ||
      !(await verifyPassword(account.password, password))
    ) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createSession(account.id, account.role, account.email);

    const url =
      redirectTo || (account.role === "admin" ? "/admin" : "/host/dashboard");
    return NextResponse.redirect(new URL(url, request.url));
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
