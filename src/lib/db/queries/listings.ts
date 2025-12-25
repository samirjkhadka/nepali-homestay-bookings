// lib/db/queries/listings.ts
import { db } from "../db";
import { listings, hosts } from "../schema";
import { eq } from "drizzle-orm";

export async function getHeroListings(limit = 4) {
  const rawListings = await db
    .select()
    .from(listings)
    .where(eq(listings.status, "approved"))
    .limit(limit);

  const listingsWithHosts = await Promise.all(
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
        priceNPR: listing.price_npr,
        imageUrl: mainImage,
        hostName: mainHost.name,
        hostAvatar: mainHost.avatar || "/default-avatar.jpg",
        isVerified: listing.is_verified ?? false,
        instantBook: listing.instant_book ?? false,
      };
    })
  );

  return listingsWithHosts;
}