// app/wishlist/page.tsx
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ListingCard from "@/components/listings/ListingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockWishlist = [
  {
    id: "1",
    title: "Traditional Newari House in Bhaktapur",
    location: "Bhaktapur",
    province: "Bagmati",
    imageUrl:
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    hostName: "Kamala Shakya",
    hostAvatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    rating: 4.8,
    reviewCount: 127,
    displayPrice: 1445,
    isVerified: true,
    instantBook: true,
  },
  {
    id: "2",
    title: "Lakeside Mountain View Homestay",
    location: "Pokhara",
    province: "Gandaki",
    imageUrl:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    hostName: "Binod Gurung",
    hostAvatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    rating: 4.9,
    reviewCount: 89,
    displayPrice: 2235,
    isVerified: true,
    instantBook: false,
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <SignedOut>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sign in to save your favorite homestays
            </p>
            <Link href="/search">
              <Button size="lg">Explore Homestays</Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
          {mockWishlist.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-8">
                Your wishlist is empty
              </p>
              <Link href="/search">
                <Button size="lg">Start Exploring</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockWishlist.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </SignedIn>
      </div>
    </div>
  );
}
