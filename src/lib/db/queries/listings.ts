// src/lib/db/queries/listings.ts
import { db } from "../db";
import { listings, hosts } from "../schema";
import { eq } from "drizzle-orm";

export async function getHeroListings(limit = 4) {
  const rawListings = await db
    .select({
      id: listings.id,
      title: listings.title,
      location: listings.location,
      province: listings.province,
      priceNPR: listings.priceNPR,
      images: listings.images,
      isVerified: listings.isVerified,
      instantBook: listings.instantBook,
    })
    .from(listings)
    .where(eq(listings.status, "approved"))
    .limit(limit);

  const listingsWithHosts = await Promise.all(
    rawListings.map(async (listing) => {
      const hostData = await db
        .select({
          name: hosts.name,
          avatar: hosts.avatar,
        })
        .from(hosts)
        .where(eq(hosts.listingId, listing.id))
        .limit(1); // Main host

      const mainHost = hostData[0] || { name: "Local Host", avatar: null };

      return {
        id: listing.id.toString(),
        title: listing.title,
        location: listing.location,
        province: listing.province,
        priceNPR: listing.priceNPR,
        imageUrl: (listing.images as string[])[0],
        hostName: mainHost.name,
        hostAvatar: mainHost.avatar || "/default-avatar.jpg",
        isVerified: listing.isVerified,
        instantBook: listing.instantBook,
      };
    })
  );

  return listingsWithHosts;
}