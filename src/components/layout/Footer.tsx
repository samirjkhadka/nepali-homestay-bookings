// src/components/layout/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo_without_bg.png"
                  alt="Nepali Homestay Bookings"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">Nepali Homestays</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting travelers with authentic Nepali families. Every booking
              directly supports local communities and preserves cultural
              traditions.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com/nepalihomestays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/nepalihomestays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/@nepalihomestays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/nepalihomestays"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <X className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="hover:text-primary transition">
                  All Homestays
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-primary transition">
                  YouTube Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/#featured"
                  className="hover:text-primary transition"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#mission"
                  className="hover:text-primary transition"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary transition">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Nepali Homestay Bookings. All rights reserved.</p>
          <p className="font-medium">
            Product of{" "}
            <span className="text-primary font-bold">
              <a href="https://himalayanfoxtechnology.com.np" className="">
                Himalayan Fox Technology{" "}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
