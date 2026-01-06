// app/host/dashboard/DashboardContent.tsx
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HostDashboardClient from "./HostDashboardClient";
import { db } from "@/lib/db/db";
import { blockedDates, listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardContent() {
  const session = await getSession();

  if (!session || session.role !== "host") {
    redirect("/login?redirect=/host/dashboard");
  }

  const rawListings = await db
    .select({
      id: listings.id,
      title: listings.title,
      location: listings.location,
      price_npr: listings.price_npr,
      status: listings.status,
      images: listings.images,
    })
    .from(listings)
    .where(eq(listings.primary_host_id, session.userId));

  const hostListings = rawListings.map((l) => ({
    id: l.id,
    title: l.title,
    location: l.location,
    price_npr: l.price_npr,
    status: l.status,
    images: l.images,
    blockedDates: [],
    hostId: session.userId,
    
  }));

  const blockedRecords = await db
    .select({ date: blockedDates.date })
    .from(blockedDates)
    .innerJoin(listings, eq(blockedDates.listingId, listings.id))
    .where(eq(listings.primary_host_id, session.userId));

  const blockedDateStrings = blockedRecords.map((r) => r.date);

  return (
    <HostDashboardClient
      session={session}
      hostListings={hostListings}
      blockedDateStrings={blockedDateStrings}
    />
  );
}
