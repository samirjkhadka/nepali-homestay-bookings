// lib/db/queries/search.ts
import { db } from "../db";
import { listings, hosts } from "../schema";
import { eq, ilike, and, gte, lte, or } from "drizzle-orm";

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
  const conditions: any[] = [eq(listings.status, "approved")];

  if (q) {
    const searchCondition = or(
      ilike(listings.title, `%${q}%`),
      ilike(listings.location, `%${q}%`)
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  if (province) {
    conditions.push(eq(listings.province, province));
  }

  if (minPrice !== undefined) {
    conditions.push(gte(listings.price_npr, minPrice));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(listings.price_npr, maxPrice));
  }

  if (guests !== undefined) {
    conditions.push(gte(listings.max_guests, guests));
  }

  const rawListings = await db
    .select()
    .from(listings)
    .where(conditions.length > 1 ? and(...conditions) : conditions[0]);

  const listingsWithHosts = await Promise.all(
    rawListings.map(async (listing) => {
      const hostData = await db
        .select()
        .from(hosts)
        .where(eq(hosts.listingId, listing.id))
        .limit(1);

      const mainHost = hostData[0] || { name: "Local Host", avatar: null };

      return {
        id: listing.id.toString(),
        title: listing.title,
        location: listing.location,
        province: listing.province,
        imageUrl:
          (listing.images as string[] | null)?.[0] || "/default-avatar.png",
        hostName: mainHost.name,
        hostAvatar: mainHost.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        priceNPR: listing.price_npr,
        rating: 4.8,
        reviewCount: 89,
        isVerified: listing.is_verified ?? false,
        instantBook: listing.instant_book ?? false,
      };
    })
  );

  return listingsWithHosts;
}
