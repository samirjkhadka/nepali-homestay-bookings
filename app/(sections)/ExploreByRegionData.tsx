// app/(sections)/ExploreByRegionData.tsx
import ExploreByRegionClient from "./ExploreByRegionClient";
import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type GroupedData = Record<string, Record<string, any[]>>;

export default async function ExploreByRegionData() {
  const rawListings = await db
    .select()
    .from(listings)
    .where(eq(listings.status, "approved"));

  const grouped: GroupedData = {};

  rawListings.forEach((listing) => {
    const province = listing.province;
    console.log(listing.province);
    const districtMatch = listing.location.match(/([^,]+),\s*([^,]+)/);
    const district = districtMatch ? districtMatch[2].trim() : "Other";

    if (!grouped[province]) grouped[province] = {};
    if (!grouped[province][district]) grouped[province][district] = [];

    grouped[province][district].push(listing);
  });

  // Get available provinces from data
  const availableProvinces = Object.keys(grouped).sort();
  const defaultProvince = availableProvinces[0] || "Bagmati"; // fallback

  return (
    <ExploreByRegionClient 
      groupedData={grouped} 
      //defaultProvince={defaultProvince}
      availableProvinces={availableProvinces}
    />
  );
}