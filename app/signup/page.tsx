// app/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { load } from "cheerio";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Client-side validation
    if (data.password !== data.confirm_password) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        //const data = await res.json();
        toast.success("Account created! check your email & phone");
        router.push("/verify-otp");
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPasswordCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
    });
  };

  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-blue-50 p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground text-sm">
            Join thousands experiencing authentic Nepal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Samir Khadka"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="samir@example.com"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+977 9841892149"
              required
              pattern="\+?[0-9\s\-]{10,15}"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <p className="text-xs text-muted-foreground mt-1">
              We'll send OTP here
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Create strong password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Criteria */}
            <div className="mt-3 space-y-1 text-xs">
              <p
                className={
                  passwordCriteria.length
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                ✓ At least 8 characters
              </p>
              <p
                className={
                  passwordCriteria.uppercase
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                ✓ One uppercase letter
              </p>
              <p
                className={
                  passwordCriteria.lowercase
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                ✓ One lowercase letter
              </p>
              <p
                className={
                  passwordCriteria.number
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                ✓ One number
              </p>
              <p
                className={
                  passwordCriteria.symbol
                    ? "text-green-600"
                    : "text-muted-foreground"
                }
              >
                ✓ One symbol (!@#$ etc.)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirm_password"
                type={showConfirm ? "text" : "password"}
                required
                minLength={8}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!allCriteriaMet}
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed transition text-lg"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
