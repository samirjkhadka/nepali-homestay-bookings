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

const mockHeroes: HeroListing[] = [
  {
    id: "1",
    title: "Traditional Newari House in Bhaktapur",
    location: "Bhaktapur",
    province: "Bagmati",
    priceNPR: 1445,
    imageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hostName: "Kamala Shakya",
    hostAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    isVerified: true,
    instantBook: true,
  },
  {
    id: "2",
    title: "Lakeside Mountain View Homestay",
    location: "Pokhara",
    province: "Gandaki",
    priceNPR: 2235,
    imageUrl: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    hostName: "Binod Gurung",
    hostAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    isVerified: true,
    instantBook: false,
  },
];

const rates: Record<string, number> = {
  NPR: 1,
  USD: 0.0075,
  EUR: 0.0069,
  GBP: 0.0059,
  INR: 0.625,
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const { currency, symbol } = useCurrency();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mockHeroes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const listing = mockHeroes[current];
  const price = Math.round(listing.priceNPR * rates[currency]);

  return (
    <section className="relative h-screen min-h-150 overflow-hidden">
      <Image
        src={listing.imageUrl}
        alt={listing.title}
        fill
        className="object-cover brightness-75"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

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

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {mockHeroes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-12" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}