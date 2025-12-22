// app/(sections)/FeaturedHomestays.tsx
import ListingCard from "@/components/listings/ListingCard";

const featured = [
  {
    id: "1",
    title: "Traditional Newari House in Bhaktapur",
    location: "Bhaktapur",
    province: "Bagmati",
    imageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
    hostName: "Kamala Shakya",
    hostAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
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
    imageUrl: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    hostName: "Binod Gurung",
    hostAvatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    rating: 4.9,
    reviewCount: 89,
    displayPrice: 2235,
    isVerified: true,
    instantBook: false,
  },
  // Add 4 more for full grid
];

export default function FeaturedHomestays() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Homestays</h2>
          <p className="text-xl text-muted-foreground">
            Handpicked experiences loved by travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}