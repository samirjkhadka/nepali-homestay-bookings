// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./CurrencyProvider";

import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepali Homestay Bookings",
  description: "Authentic family-run homestays across Nepal",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ClerkProvider publishableKey= {publishableKey}> */}
          <CurrencyProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CurrencyProvider>
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
