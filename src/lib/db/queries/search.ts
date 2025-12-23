// src/lib/db/queries/search.ts
import { db } from "../db";
import { listings, hosts } from "../schema";
import { eq, and, ilike, gte, lte, or } from "drizzle-orm";

export async function searchListings({
  q = "",
  province = "",
  minPrice,
  maxPrice,
  guests,
}: {
  q?: string;
  province?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
}) {
  let query = db
    .select({
      id: listings.id,
      title: listings.title,
      location: listings.location,
      province: listings.province,
      priceNPR: listings.priceNPR,
      images: listings.images,
      isVerified: listings.isVerified,
      instantBook: listings.instantBook,
      maxGuests: listings.maxGuests,
    })
    .from(listings)
    .where(eq(listings.status, "approved"));

  if (q) {
    query = query.where(
      or(
        ilike(listings.title, `%${q}%`),
        ilike(listings.location, `%${q}%`),
        ilike(listings.description, `%${q}%`)
      )
    );
  }

  if (province) {
    query = query.where(ilike(listings.province, province));
  }

  if (minPrice !== undefined) {
    query = query.where(gte(listings.priceNPR, minPrice));
  }

  if (maxPrice !== undefined) {
    query = query.where(lte(listings.priceNPR, maxPrice));
  }

  if (guests !== undefined) {
    query = query.where(gte(listings.maxGuests, guests));
  }

  const rawListings = await query;

  const listingsWithHosts = await Promise.all(
    rawListings.map(async (listing) => {
      const hostData = await db
        .select({
          name: hosts.name,
          avatar: hosts.avatar,
        })
        .from(hosts)
        .where(eq(hosts.listingId, listing.id))
        .limit(1);

      const mainHost = hostData[0] || { name: "Local Host", avatar: null };

      return {
        id: listing.id.toString(),
        title: listing.title,
        location: listing.location,
        province: listing.province,
        imageUrl: (listing.images as string[])[0],
        hostName: mainHost.name,
        hostAvatar: mainHost.avatar || "/default-avatar.jpg",
        priceNPR: listing.priceNPR,
        rating: 4.8, // placeholder until reviews
        reviewCount: 89,
        isVerified: listing.isVerified,
        instantBook: listing.instantBook,
      };
    })
  );

  return listingsWithHosts;
}