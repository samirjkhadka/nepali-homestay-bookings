// app/host/login/page.tsx
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HostLogin({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const session = await getSession();

  if (session && session.role === "host") {
    redirect(params.redirect || "/host/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        action="/api/auth/host-login"
        method="post"
        className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Host Login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border rounded-lg mb-8"
        />
        {params.redirect && (
          <input type="hidden" name="redirect" value={params.redirect} />
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-6 rounded-lg font-semibold"
        >
          Login as Host
        </button>
      </form>
    </div>
  );
}
