// app/host/dashboard/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";

export default async function HostDashboard() {
  const session = await getSession();
  if (!session || session.role !== "host") {
    redirect("/host/login");
  }

  // Find listings where this host is primary (you can adjust logic)
  const hostListings = await db
    .select()
    .from(listings)
    .where(eq(listings.primary_host_id, session.userId)); 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome back, Host!</h1>
      <p className="text-xl mb-8">Manage your homestay listings</p>

      {hostListings.length === 0 ? (
        <p>No listings yet — contact admin to link your property</p>
      ) : (
        <div className="grid gap-6">
          {hostListings.map((listing) => (
            <div key={listing.id} className="bg-card border rounded-xl p-6">
              <h2 className="text-2xl font-semibold">{listing.title}</h2>
              <p>{listing.location}</p>
              <Link href={`/admin/listings/${listing.id}/edit`}>
                <Button className="mt-4">Edit Listing</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
