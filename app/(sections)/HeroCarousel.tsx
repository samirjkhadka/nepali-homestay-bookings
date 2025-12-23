// app/(sections)/HeroCarousel.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyProvider";

type HeroListing = {
  id: string;
  title: string;
  location: string;
  province: string;
  priceNPR: number;
  imageUrl: string;
  hostName: string;
  hostAvatar: string;
  isVerified: boolean;
  instantBook: boolean;
};

type HeroCarouselProps = {
  initialListings: HeroListing[];
};

const rates: Record<string, number> = {
  NPR: 1,
  USD: 0.0075,
  EUR: 0.0069,
  GBP: 0.0059,
  INR: 0.625,
};

export default function HeroCarousel({ initialListings }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const { currency, symbol } = useCurrency();
  const listings = initialListings;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % listings.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [listings.length]);

  const listing = listings[current];
  const price = Math.round(listing.priceNPR * rates[currency]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <Image
        src={listing.imageUrl}
        alt={listing.title}
        fill
        className="object-cover brightness-75"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 flex items-end pb-20 px-8 md:px-16">
        <div className="max-w-4xl text-white">
          <div className="flex items-center gap-4 mb-4">
            {listing.isVerified && (
              <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">Verified</span>
            )}
            {listing.instantBook && (
              <span className="bg-green-600 text-xs px-3 py-1 rounded-full">Instant Book</span>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {listing.title}
          </h1>

          <div className="flex items-center gap-8 mb-8 text-xl">
            <div className="flex items-center gap-3">
              <Image
                src={listing.hostAvatar}
                alt={listing.hostName}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">Hosted by {listing.hostName}</p>
                <p className="text-sm opacity-90">{listing.location}, {listing.province}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-5xl font-bold">
              {symbol}{price}
              <span className="text-2xl font-normal opacity-90"> / night</span>
            </p>
            <Link
              href={`/listings/${listing.id}`}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            >
              View Homestay
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {listings.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-12" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}