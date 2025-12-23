// app/(sections)/HeroCarouselData.tsx
import HeroCarousel from "./HeroCarousel";
import { getHeroListings } from "@/lib/db/queries/listings";

export default async function HeroCarouselData() {
  const listings = await getHeroListings();

  if (listings.length === 0) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">No featured homestays yet</p>
      </div>
    );
  }

  return <HeroCarousel initialListings={listings} />;
}