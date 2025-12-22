// app/dashboard/host/page.tsx
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HostDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Host Dashboard</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sign in as a host to manage your listings
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Your Listings</h1>
          <div className="bg-card border rounded-xl p-8 text-center">
            <p className="text-xl text-muted-foreground mb-6">
              You haven&apos;t listed any homestays yet
            </p>
            <Button size="lg">Create Your First Listing</Button>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
