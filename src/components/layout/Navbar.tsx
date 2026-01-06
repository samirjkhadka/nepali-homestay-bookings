"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { getSession, logout } from "@/lib/auth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    getSession().then(setSession);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  if (!mounted) return null; // Prevent hydration mismatch

  const isLoggedIn = !!session;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo_without_bg.png"
                alt="Nepali Homestays"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl hidden sm:block text-primary">
              Nepali Homestays
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* "List your homestay" for guests or hosts */}
                {session.role !== "admin" && (
                  <Link href="/admin/listings/new">
                    <Button className="bg-green-600 hover:bg-green-700 hidden sm:inline-flex">
                      List Your Homestay
                    </Button>
                  </Link>
                )}

                {/* User menu */}
                <div className="flex items-center gap-3">
                  <span className="text-sm hidden md:block">
                    Hi, {session.email?.split("@")[0] || "User"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline ml-2">Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signup?role=host">
                  <Button className="bg-green-600 hover:bg-green-700 hidden sm:inline-flex">
                    List Your Homestay
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-8 mt-8">
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

                  <div className="border-t pt-6 space-y-4">
                    {isLoggedIn ? (
                      <>
                        {session.role !== "admin" && (
                          <Link
                            href="/admin/listings/new"
                            onClick={() => setMobileOpen(false)}
                          >
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                              List Your Homestay
                            </Button>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileOpen(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 text-destructive"
                        >
                          <LogOut className="w-5 h-5" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/signup?role=host"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            List Your Homestay
                          </Button>
                        </Link>
                      </>
                    )}
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
