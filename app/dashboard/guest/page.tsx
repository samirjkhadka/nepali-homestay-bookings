// app/dashboard/guest/page.tsx
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuestDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sign in to view your bookings
          </p>
          <Link href="/search">
            <Button size="lg">Explore Homestays</Button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
          <div className="bg-card border rounded-xl p-8 text-center">
            <p className="text-xl text-muted-foreground mb-6">
              No upcoming bookings
            </p>
            <Link href="/search">
              <Button size="lg">Book Your Next Homestay</Button>
            </Link>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
