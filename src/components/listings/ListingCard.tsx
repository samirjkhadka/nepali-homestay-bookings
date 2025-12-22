// src/components/listings/ListingCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Heart, Verified } from "lucide-react";
import { ListingCardProps } from "@/types/listing";

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          width={400}
          height={300}
          className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition">
          <Heart className="w-5 h-5" />
        </button>
        {listing.isVerified && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Verified className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="font-medium">★ {listing.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({listing.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-2">
          {listing.location}, {listing.province}
        </p>

        <div className="flex items-center gap-2">
          <Image
            src={listing.hostAvatar}
            alt={listing.hostName}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            Hosted by {listing.hostName}
          </span>
        </div>

        <p className="mt-4 font-semibold text-lg">
          NPR {listing.displayPrice}{" "}
          <span className="font-normal text-base">/ night</span>
        </p>
      </div>
    </Link>
  );
}
