// app/login/page.tsx
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const session = await getSession();

  if (session) {
    // If already logged in, redirect to intended page or home
    const redirectTo = params.redirect || "/";
    redirect(redirectTo);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/20 to-background">
      <div className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <form action="/api/auth/login" method="post" className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email or Phone Number
            </label>
            <input
              name="identifier"
              type="text"
              placeholder="samir@example.com or +9779841892149"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {params.redirect && (
            <input type="hidden" name="redirect" value={params.redirect} />
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
