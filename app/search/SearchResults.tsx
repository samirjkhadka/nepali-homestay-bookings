// app/search/SearchResults.tsx
"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/listings/ListingCard";

import { convertPrice } from "@/server/actions/currency";
import { SearchListing } from "@/types/listing";
import { useCurrency } from "../CurrencyProvider";



// Mock until we have real API — replace with fetch later
const mockResults: SearchListing[] = [
  {
    id: "1",
    title: "Traditional Newari House in Bhaktapur",
    location: "Bhaktapur",
    province: "Bagmati",
    priceNPR: 1445,
    imageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    hostName: "Kamala Shakya",
    hostAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    instantBook: true,
    displayPrice: 1445
  },
  {
    id: "2",
    title: "Lakeside Mountain View Homestay",
    location: "Pokhara",
    province: "Gandaki",
    priceNPR: 2235,
    imageUrl: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    hostName: "Binod Gurung",
    hostAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    rating: 4.9,
    reviewCount: 89,
    isVerified: true,
    instantBook: false,
    displayPrice: 2235
  },
];

export default function SearchResults({ searchParams }: { searchParams: Record<string, string> }) {
  const { currency } = useCurrency();
  const [results, setResults] = useState<SearchListing[]>([]);

  useEffect(() => {
    async function loadResults() {
      // In real app: fetch from API with searchParams
      const filtered = mockResults.filter((l) => {
        const q = searchParams.q?.toLowerCase() || "";
        const province = searchParams.province || "";
        const minPrice = Number(searchParams.minPrice) || 0;
        const maxPrice = Number(searchParams.maxPrice) || Infinity;
        const guests = Number(searchParams.guests) || 1;

        return (
          (q === "" ||
            l.title.toLowerCase().includes(q) ||
            l.location.toLowerCase().includes(q)) &&
          (province === "" || l.province === province) &&
          l.priceNPR >= minPrice &&
          l.priceNPR <= maxPrice
          // Add guests check when we have maxGuests in DB
        );
      });

      const withPrice = await Promise.all(
        filtered.map(async (l) => ({
          ...l,
          displayPrice: await convertPrice(l.priceNPR, currency),
        }))
      );

      setResults(withPrice);
    }

    loadResults();
  }, [searchParams, currency]);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No homestays found matching your filters.</p>
        <p className="text-muted-foreground mt-2">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg font-medium mb-6">{results.length} homestays found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}