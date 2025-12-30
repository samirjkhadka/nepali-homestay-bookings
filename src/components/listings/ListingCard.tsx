"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

type ListingCardProps = {
  listing: {
    id: string;
    title: string;
    location: string;
    province: string;
    imageUrl: string;
    hostName: string;
    hostAvatar: string;
    rating: number;
    reviewCount: number;
    displayPrice: number;
    isVerified: boolean;
    instantBook: boolean;
    amenities?: string[];
  };
};

export default function ListingCard({ listing }: ListingCardProps) {
  const amenities = (listing.amenities as string[] | null) ?? [];

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
          
          {/* Image Container */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {listing.isVerified && (
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </div>
                )}
              </div>
              
              {listing.instantBook && (
                <div className="bg-amber-400 text-black p-2 rounded-full shadow-lg" title="Instant Book">
                  <Zap className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

            {/* Bottom Image Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Location & Rating Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">{listing.location}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-gray-900">{listing.rating}</span>
                <span className="text-[10px] text-gray-400">({listing.reviewCount})</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>

            {/* Host & Price Row */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-50">
                  <Image
                    src={listing.hostAvatar}
                    alt={listing.hostName}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {listing.hostName.split(' ')[0]}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-gray-500">NPR</span>
                  <span className="text-xl font-black text-gray-900 tracking-tight">
                    {listing.displayPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">per night</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}