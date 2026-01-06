// app/host/set-password/page.tsx
import { db } from "@/lib/db/db";
import { hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <div>Invalid link</div>;
  }

  const [host] = await db
    .select()
    .from(hosts)
    .where(eq(hosts.password_reset_token, token));

  if (!host || !host.token_expiry || new Date() > host.token_expiry) {
    return <div>Link expired or invalid</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action="/api/auth/set-password"
        method="post"
        className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8">Set Your Password</h1>
        <input type="hidden" name="token" value={token} />
        <input
          name="password"
          type="password"
          placeholder="New password"
          required
          className="w-full p-3 border rounded mb-4"
        />
        <input
          name="confirm"
          type="password"
          placeholder="Confirm password"
          required
          className="w-full p-3 border rounded mb-8"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-4 rounded font-semibold"
        >
          Set Password
        </button>
      </form>
    </div>
  );
}
