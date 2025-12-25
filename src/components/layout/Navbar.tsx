/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/layout/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Sun, Moon, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { useTheme } from "next-themes";
import { useCurrency } from "../../../app/CurrencyProvider";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const signOut = () => {
    window.location.href = "/sign-out";
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo_without_bg.png"
                alt="Nepali Homestay Bookings"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl hidden sm:block text-primary">
              Nepali Homestays
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 ">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors hover:underline "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="NPR">NPR - ₨</option>
              <option value="USD">USD - $</option>
              <option value="EUR">EUR - €</option>
              <option value="GBP">GBP - £</option>
              <option value="INR">INR - ₹</option>
            </select>

            {/* Dark Mode Toggle */}
            {/* <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button> */}

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <nav className="flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-lg font-medium hover:text-primary transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t pt-6">
                    <SignedIn>
                      <Link
                        href="/dashboard/guest"
                        onClick={() => setMobileOpen(false)}
                        className="block py-2"
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setMobileOpen(false)}
                        className="block py-2"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 text-destructive"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </SignedIn>

                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button className="w-full">Sign In</Button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
