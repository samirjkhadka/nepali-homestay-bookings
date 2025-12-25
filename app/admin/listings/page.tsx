// app/admin/listings/page.tsx
import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ManageListings() {
  const allListings = await db.select().from(listings);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Listings</h1>
        <Link href="/admin/listings/new">
          <Button>Add New Listing</Button>
        </Link>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Price (NPR)</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allListings.map((listing) => (
              <tr key={listing.id} className="border-t">
                <td className="p-4">{listing.title}</td>
                <td className="p-4">{listing.location}</td>
                <td className="p-4">{listing.price_npr}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      listing.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : listing.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/admin/listings/${listing.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/admin/listings/${listing.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
