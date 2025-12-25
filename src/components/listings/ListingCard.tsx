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
    amenities?: string[] ;
  };
};

export default function ListingCard({ listing }: ListingCardProps) {
  const amenities = (listing.amenities as string[] | null) ?? [];

  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <div className="bg-card border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
        <div className="relative h-64">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            {listing.isVerified && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Verified
              </span>
            )}
            {listing.instantBook && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Instant Book
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
          <p className="text-muted-foreground mb-4">
            {listing.location}, {listing.province}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <Image
              src={listing.hostAvatar}
              alt={listing.hostName}
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-muted-foreground">
              Hosted by {listing.hostName}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">NPR {listing.displayPrice}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">★ {listing.rating}</p>
              <p className="text-sm text-muted-foreground">
                ({listing.reviewCount} reviews)
              </p>
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
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
    </Link>
  );
}
