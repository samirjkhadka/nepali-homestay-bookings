// app/verify-otp/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome to Nepali Homestays! 🎉");
        router.push("/");
      } else {
        toast.error(data.error || "Invalid or expired code");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    toast.loading("Sending new code...");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // backend uses session
      });

      if (res.ok) {
        toast.dismiss();
        toast.success("New code sent to your email & phone!");
        setOtp("");
      } else {
        const data = await res.json();
        toast.dismiss();
        toast.error(data.error || "Too many attempts. Try again later.");
      }
    } catch {
      toast.dismiss();
      toast.error("Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Account</h1>
          <p className="text-muted-foreground">
            We sent a 6-digit code to your email and phone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-center">
              Enter Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              required
              autoFocus
              className="w-full px-6 py-5 border rounded-xl text-center text-4xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition text-lg"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-primary font-medium hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}