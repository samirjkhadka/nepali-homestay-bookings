import { getHeroListings } from "@/lib/db/queries/listings";
import { HeroCarouselItemDTO } from "./heroCarousel.types";
import { convertPrice } from "@/domain/pricing/priceConverter";


export async function getHeroCarouselListings(
  currency: string
): Promise<HeroCarouselItemDTO[]> {
  const listings = await getHeroListings();

  return listings.map((l) => ({
    id: l.id,
    title: l.title,
    location: l.location,
    province: l.province,
    price: convertPrice(l.priceNPR, currency),
    currency,
    imageUrl: l.imageUrl,
    hostName: l.hostName,
    hostAvatar: l.hostAvatar ?? null,
    isVerified: l.isVerified,
    instantBook: l.instantBook,
  }));
}
