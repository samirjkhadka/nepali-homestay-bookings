// app/admin/listings/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function ViewListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = parseInt(id);

  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, listingId));

  if (!listing) {
    notFound();
  }

  const listingHosts = await db
    .select()
    .from(hosts)
    .where(eq(hosts.listingId, listingId));

  const images = listing.images as string[];
  const mainImage = images[0] || "/placeholder.jpg";
  const wayToGetThere = (listing.way_to_get_there as string[]) || [];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                listing.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {(listing.status || "Pending").toUpperCase()}
            </span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              {listing.homestay_type === "community"
                ? `Community (${listing.number_of_houses || 0} houses)`
                : "Individual Homestay"}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={`/admin/listings/${listing.id}/edit`}>
            <Button>Edit Listing</Button>
          </Link>
          <Link href="/admin/listings">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 md:h-150 rounded-2xl overflow-hidden mb-8">
        <Image
          src={mainImage}
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {images.slice(1).map((img, i) => (
            <div key={i} className="relative h-32 rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`${listing.title} - ${i + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Address */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <p className="text-lg text-muted-foreground">
              {listing.location}, {listing.province}
              {listing.ward_no && ` • Ward ${listing.ward_no}`}
              {listing.street && ` • ${listing.street}`}
            </p>
          </section>

          {/* Pricing & Capacity */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pricing & Capacity</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Price per night</p>
                <p className="text-3xl font-bold">NPR {listing.price_npr}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Guests</p>
                <p className="text-3xl font-bold">{listing.max_guests}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bedrooms</p>
                <p className="text-2xl font-bold">{listing.bedrooms}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Bathrooms</p>
                <p className="text-2xl font-bold">{listing.bathrooms}</p>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(listing.amenities as string[]).map((amenity) => (
                <div key={amenity} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">✓</span>
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {listing.description}
            </p>
          </section>

          {/* Way to Get There */}
          {wayToGetThere.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Way to Get There</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                {wayToGetThere.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column - Hosts */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Hosts ({listingHosts.length})
          </h2>
          <div className="space-y-6">
            {listingHosts.map((host) => (
              <div key={host.id} className="bg-card border rounded-xl p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-24 shrink-0">
                    <Image
                      src={host.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt={host.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{host.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {host.role}
                    </p>
                    <p className="text-muted-foreground mb-4">{host.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {(host.badges as string[]).map((badge) => (
                        <span
                          key={badge}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
