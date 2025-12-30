// app/(sections)/ExploreByRegionClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import ListingCard from "@/components/listings/ListingCard";

type Props = {
  groupedData: Record<string, Record<string, any[]>>;
  defaultProvince: string;
  availableProvinces: string[];
};

export default function ExploreByRegionClient({ groupedData, defaultProvince, availableProvinces }: Props) {
  const [activeProvince, setActiveProvince] = useState<string>(defaultProvince);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = Object.keys(groupedData[activeProvince] || {}).sort();
  const listings = selectedDistrict 
    ? groupedData[activeProvince]?.[selectedDistrict] || []
    : [];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Explore by Region</h2>
          <p className="text-xl text-muted-foreground">
            Discover authentic homestays across Nepal's beautiful provinces
          </p>
        </div>

        {/* Province Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {availableProvinces.map((province) => (
            <button
              key={province}
              onClick={() => {
                setActiveProvince(province);
                setSelectedDistrict(null);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeProvince === province
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border hover:bg-accent"
              }`}
            >
              {province}
            </button>
          ))}
        </div>

        {/* District Chips + Listings */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6">{activeProvince} Districts</h3>
          <div className="flex flex-wrap gap-3">
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district === selectedDistrict ? null : district)}
                className={`px-5 py-2 rounded-full transition-all ${
                  selectedDistrict === district
                    ? "bg-primary text-white"
                    : "bg-card border hover:bg-accent"
                }`}
              >
                {district} ({groupedData[activeProvince][district].length})
              </button>
            ))}
          </div>
        </div>

        {/* Selected District Listings */}
        {selectedDistrict ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-semibold">
                Homestays in {selectedDistrict}
              </h4>
              <Link href={`/search?province=${activeProvince}&district=${selectedDistrict}`}>
                <button className="btn btn-outline btn-primary">
                  View all ({listings.length})
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={{
                    id: listing.id.toString(),
                    title: listing.title,
                    location: listing.location,
                    province: listing.province,
                    imageUrl: (listing.images as string[] | null)?.[0] || "/placeholder.jpg",
                    hostName: "Local Host",
                    hostAvatar: "/default-avatar.jpg",
                    rating: 4.8,
                    reviewCount: 50,
                    displayPrice: listing.price_npr,
                    isVerified: listing.is_verified ?? false,
                    instantBook: listing.instant_book ?? false,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12 text-lg">
            Select a district to see homestays
          </p>
        )}
      </div>
    </section>
  );
}