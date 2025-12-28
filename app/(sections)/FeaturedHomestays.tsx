// app/(sections)/FeaturedHomestays.tsx
import ListingCard from "@/components/listings/ListingCard";
import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function FeaturedHomestays() {
  // Fetch approved listings
  const rawListings = await db
    .select()
    .from(listings)
    .where(eq(listings.status, "approved"))
    .limit(6); // Show 6 featured

  // Fetch main host for each
  const listingsWithHost = await Promise.all(
    rawListings.map(async (listing) => {
      const hostData = await db
        .select()
        .from(hosts)
        .where(eq(hosts.listingId, listing.id))
        .limit(1);

      const mainHost = hostData[0] || { name: "Local Host", avatar: null };

      const images = (listing.images as string[] | null) || [];
      const mainImage = images[0] || "/placeholder.jpg";

      return {
        id: listing.id.toString(),
        title: listing.title,
        location: listing.location,
        province: listing.province,
        imageUrl: mainImage,
        hostName: mainHost.name,
        hostAvatar: mainHost.avatar || "/default-avatar.jpg",
        rating: 4.8, // TODO: real ratings later
        reviewCount: 89, // TODO: real count
        displayPrice: listing.price_npr,
        isVerified: listing.is_verified ?? false,
        instantBook: listing.instant_book ?? false,
        amenities: (listing.amenities as string[]) || [], // safe
      };
    })
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Homestays</h2>
          <p className="text-xl text-muted-foreground">
            Handpicked experiences loved by travelers
          </p>
        </div>

        {listingsWithHost.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No homestays available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listingsWithHost.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
