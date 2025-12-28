// components/listings/ListingCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <Link href={`/listings/${listing.id}`} className="block">
      <div className="bg-card border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className="relative h-48 md:h-56">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {listing.isVerified && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Verified
              </span>
            )}
            {listing.instantBook && (
              <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium">
                Instant Book
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {listing.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {listing.location}, {listing.province}
          </p>

          {/* Host + Price row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image
                src={listing.hostAvatar}
                alt={listing.hostName}
                width={28}
                height={28}
                className="rounded-full"
              />
              <p className="text-sm text-muted-foreground">
                Hosted by {listing.hostName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold"> {listing.displayPrice}</p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
          </div>
          {/* Rating + Amenities */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">★ {listing.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({listing.reviewCount})
              </span>
            </div>

            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {amenities.slice(0, 3).map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs"
                  >
                    {amenity}
                  </span>
                ))}
                {amenities.length > 3 && (
                  <span className="text-muted-foreground text-xs">
                    +{amenities.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
