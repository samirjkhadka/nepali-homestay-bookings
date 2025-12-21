// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./CurrencyProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepali Homestay Bookings",
  description: "Authentic family-run homestays across Nepal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything with CurrencyProvider */}
        <CurrencyProvider>
          <div className="flex flex-col min-h-screen">
            
            <main className="flex-1">{children}</main>
           
          </div>
        </CurrencyProvider>
      </body>
    </html>
  );
}