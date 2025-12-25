// app/search/SearchResults.tsx
"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/listings/ListingCard";
import { convertPrice } from "@/server/actions/currency";
import { useCurrency } from "../CurrencyProvider";

type SearchListing = {
  id: string;
  title: string;
  location: string;
  province: string;
  imageUrl: string;
  hostName: string;
  hostAvatar: string;
  priceNPR: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  instantBook: boolean;
  displayPrice: number;
  amenities?: string[]; // ← Changed from string[] | null to optional undefined
};

type SearchResultsProps = {
  initialResults: SearchListing[];
};

export default function SearchResults({ initialResults }: SearchResultsProps) {
  const { currency } = useCurrency();
  const [results, setResults] = useState<SearchListing[]>(initialResults);

  useEffect(() => {
    async function updatePrices() {
      const withPrice = await Promise.all(
        initialResults.map(async (l) => ({
          ...l,
          displayPrice: await convertPrice(l.priceNPR, currency),
          amenities: l.amenities ?? undefined, // safe conversion
        }))
      );
      setResults(withPrice);
    }

    updatePrices();
  }, [initialResults, currency]);

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No homestays match your filters.</p>
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