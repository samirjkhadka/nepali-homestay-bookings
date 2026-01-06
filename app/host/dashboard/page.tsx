// app/host/dashboard/page.tsx
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, Calendar, MessageSquare, User } from "lucide-react";
import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function HostDashboard() {
  const session = await getSession();

  if (!session || session.role !== "host") {
    redirect("/login?redirect=/host/dashboard");
  }

  // Fetch host's listings
  const hostListings = await db
    .select()
    .from(listings)
    .where(eq(listings.primary_host_id, session.userId));

  const totalListings = hostListings.length;
  const pendingBookings = 0; // placeholder — we'll add real count later
  const totalEarnings = 0; // placeholder

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session.email?.split("@")[0] || "Host"}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your homestay business
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalListings}</div>
              <p className="text-xs text-muted-foreground">
                {totalListings === 1 ? "Active listing" : "Active listings"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NPR {totalEarnings}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Listing CTA */}
        {totalListings === 0 && (
          <div className="text-center py-12 bg-primary/5 rounded-2xl mb-12">
            <h2 className="text-2xl font-bold mb-4">No listings yet</h2>
            <p className="text-muted-foreground mb-8">
              Start welcoming guests by adding your first homestay
            </p>
            <Link href="/admin/listings/new">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Add Your First Listing
              </Button>
            </Link>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-8">
            <div className="space-y-6">
              {hostListings.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No listings yet. Add one to get started!
                </p>
              ) : (
                hostListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardHeader>
                      <CardTitle>{listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{listing.location}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Status: {listing.status}
                      </p>
                      <Link href={`/admin/listings/${listing.id}/edit`}>
                        <Button className="mt-4">Edit Listing</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <p className="text-center py-12 text-muted-foreground">
              Booking requests will appear here
            </p>
          </TabsContent>

          <TabsContent value="calendar">
            <p className="text-center py-12 text-muted-foreground">
              Availability calendar coming soon
            </p>
          </TabsContent>

          <TabsContent value="profile">
            <p className="text-center py-12 text-muted-foreground">
              Update your profile information
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}