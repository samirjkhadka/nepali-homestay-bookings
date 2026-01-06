export type HeroCarouselItemDTO = {
  id: string;
  title: string;
  location: string;
  province: string;
  price: number;
  currency: string;
  imageUrl: string;
  hostName: string;
  hostAvatar: string | null;
  isVerified: boolean;
  instantBook: boolean;
};
