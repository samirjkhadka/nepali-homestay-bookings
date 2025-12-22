// src/types/listing.ts
export type Listing = {
  id: string;
  title: string;
  description: string;
  location: string;
  province: string;
  priceNPR: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  isVerified: boolean;
  instantBook: boolean;
  latitude?: number;
  longitude?: number;
  status: "new" | "recommended" | "pending" | "approved";
  createdAt: string;
  hosts: Host[];
  hostId?: number;
};

export type Host = {
  id?: number;
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  languages?: string[];
  badges?: string[];
};

// src/types/booking.ts
export type Booking = {
  id: string;
  listingId: string;
  guestId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPriceNPR: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
};

// src/types/currency.ts
export type SupportedCurrency = "NPR" | "USD" | "EUR" | "GBP" | "INR";

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  NPR: "₨ ",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export type SearchListing = {
  id: string;
  title: string;
  location: string;
  province: string;
  priceNPR: number;
  imageUrl: string;
  hostName: string;
  hostAvatar: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  instantBook: boolean;
  displayPrice: number;
};

export type ListingCardProps = {
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
  };
};