// app/book/success/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Booking Request Sent!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your host has been notified and will respond within 24 hours.
        </p>

        <p className="text-muted-foreground mb-8">
          We&apos;ll send you a confirmation email and SMS when your booking is
          accepted.
        </p>

        <div className="space-y-4">
          <Link href="/dashboard/guest">
            <Button className="w-full">View My Bookings</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
