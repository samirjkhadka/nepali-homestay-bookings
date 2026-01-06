// app/host/dashboard/HostDashboard.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, Calendar, MessageSquare, Plus } from "lucide-react";
import Image from "next/image";

import HostCalendar from "./HostCalendar";
import { CldUploadButton } from "next-cloudinary";
import { updateProfileAction } from "./update-profile-action";

type Session = {
  userId: number;
  role: string;
  email: string;
  name: string;
  phone: string | null;
  bio: string | null;
  avatar: string | null;
};

type Listing = {
  id: number;
  title: string;
  location: string;
  price_npr: number;
  status: string;
  images: string[] | null;
};

export default function HostDashboard({
  session,
  hostListings = [],
  blockedDateStrings = [],
}: {
  session: Session;
  hostListings?: Listing[];
  blockedDateStrings?: string[];
}) {
  const totalListings = hostListings.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session.email.split("@")[0]}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your homestay business
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Listings
              </CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Bookings
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NPR 0</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-8">
            {totalListings === 0 ? (
              <div className="text-center py-20 bg-muted/50 rounded-2xl">
                <BedDouble className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                <h2 className="text-2xl font-bold mb-4">No listings yet</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start earning by adding your homestay. Guests are waiting to
                  discover your home.
                </p>
                <Link href="/admin/listings/new">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Listing
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hostListings.map((listing) => {
                  const mainImage =
                    Array.isArray(listing.images) && listing.images[0]
                      ? listing.images[0]
                      : "/placeholder.jpg";

                  return (
                    <Card
                      key={listing.id}
                      className="overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="relative h-48">
                        <Image
                          src={mainImage}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              listing.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {listing.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">
                          {listing.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-2">
                          {listing.location}
                        </p>
                        <p className="text-2xl font-bold mb-4">
                          NPR {listing.price_npr}/night
                        </p>
                        <Link href={`/admin/listings/${listing.id}/edit`}>
                          <Button className="w-full">Edit Listing</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-8">
            <div className="text-center py-20 bg-muted/50 rounded-2xl">
              <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bold mb-4">
                No booking requests yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                When guests inquire about your homestay, they'll appear here for
                you to review and respond.
              </p>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <HostCalendar
              blockedDates={blockedDateStrings}
              listingIds={hostListings.map((l) => l.id)}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update your personal details and photo
                </p>
              </CardHeader>
              <CardContent>
                <form action={updateProfileAction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        defaultValue={session.name}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        defaultValue={session.phone || ""}
                        placeholder="+977 9841892149"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      rows={5}
                      defaultValue={session.bio || ""}
                      placeholder="Tell guests about yourself and your homestay..."
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src={session.avatar || "/default-avatar.png"}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CldUploadButton
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        onSuccess={(result: any) => {
                          const input = document.createElement("input");
                          input.type = "hidden";
                          input.name = "avatar";
                          input.value = result.info.secure_url;
                          document.querySelector("form")?.appendChild(input);
                        }}
                      >
                        <Button type="button" variant="outline">
                          Change Photo
                        </Button>
                      </CldUploadButton>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
