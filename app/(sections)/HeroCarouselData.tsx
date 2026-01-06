// app/(sections)/HeroCarouselData.tsx
import { getHeroCarouselListings } from "@/application/homepage/getHeroCarouselListings";
import HeroCarousel from "./HeroCarousel";
import { getCurrencyFromCookies } from "@/server/actions/currency";

export default async function HeroCarouselData() {
  const currency = getCurrencyFromCookies();
  const listings = await getHeroCarouselListings(await currency);

  if (listings.length === 0) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">No featured homestays yet</p>
      </div>
    );
  }

  return <HeroCarousel initialListings={listings} />;
}