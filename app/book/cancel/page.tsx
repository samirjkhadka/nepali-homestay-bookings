// app/book/cancel/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookingCancel() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your booking request was not completed.
        </p>
        <Link href="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
