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
    redirect(params.redirect || "/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form action="/api/auth/login" method="post" className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {params.redirect && (
          <input type="hidden" name="redirect" value={params.redirect} />
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-6 rounded-lg font-semibold hover:bg-primary/90"
        >
          Login
        </button>
      </form>
    </div>
  );
}