// app/verify-email/page.tsx
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
        <p className="text-muted-foreground mb-8">
          We sent a 6-digit verification code to your email.
          Enter it below to complete signup.
        </p>

        <form action="/api/auth/verify-email" method="post" className="space-y-6">
          <input
            name="code"
            type="text"
            placeholder="123456"
            maxLength={6}
            required
            className="w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}