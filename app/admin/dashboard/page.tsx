// app/admin/dashboard/page.tsx
import { db } from "@/lib/db/db";
import { listings, bookings, users } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export default async function AdminDashboard() {
  const listingResult = await db
    .select({ value: count(listings.id) })
    .from(listings);
  const bookingResult = await db
    .select({ value: count(bookings.id) })
    .from(bookings);
  const userResult = await db.select({ value: count(users.id) }).from(users);

  const listingCount = Number(listingResult[0]?.value ?? 0);
  const bookingCount = Number(bookingResult[0]?.value ?? 0);
  const userCount = Number(userResult[0]?.value ?? 0);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-card border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Total Listings</h2>
          <p className="text-5xl font-bold text-primary">{listingCount}</p>
        </div>
        <div className="bg-card border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Total Bookings</h2>
          <p className="text-5xl font-bold text-primary">{bookingCount}</p>
        </div>
        <div className="bg-card border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
          <p className="text-5xl font-bold text-primary">{userCount}</p>
        </div>
      </div>

      <div className="bg-primary/5 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome back, Admin</h2>
        <p className="text-xl text-muted-foreground">
          Manage listings, monitor bookings, and grow the Nepali Homestay
          community
        </p>
      </div>
    </div>
  );
}
