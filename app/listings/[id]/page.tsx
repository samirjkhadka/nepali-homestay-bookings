// app/listings/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  Calendar,
  Verified,
  Zap,
} from "lucide-react";
import MapSection from "../../(sections)/MapSection";
import BookingWidget from "./BookingWidget";

const mockListings = [
  {
    id: "1",
    title: "Traditional Newari House in Bhaktapur",
    description:
      "Experience authentic Newari culture in this beautifully preserved traditional house in the heart of Bhaktapur. Wake up to stunning views of ancient temples and enjoy home-cooked Newari meals with your host family.",
    location: "Bhaktapur",
    province: "Bagmati",
    priceNPR: 1445,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      "WiFi",
      "Kitchen",
      "Garden",
      "Cultural Experience",
      "Breakfast Included",
    ],
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    ],
    latitude: 27.6728,
    longitude: 85.4298,
    isVerified: true,
    instantBook: true,
    hosts: [
      {
        name: "Kamala Shakya",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        role: "Owner",
        bio: "Kamala is a passionate host who loves sharing Newari culture and cuisine with guests. She has been running the homestay for over 10 years.",
        badges: ["Superhost", "Local Expert"],
        languages: ["English", "Nepali", "Newari"],
      },
      {
        name: "Suresh Shakya",
        avatar:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
        role: "Co-Host",
        bio: "Suresh helps with guest tours and is an expert in local history and temple architecture.",
        badges: ["Verified"],
        languages: ["Nepali", "Newari", "Hindi"],
      },
    ],
  },
  {
    id: "2",
    title: "Lakeside Mountain View Homestay",
    description:
      "Wake up to breathtaking views of the Annapurna range and Phewa Lake. This family-run homestay offers comfortable accommodation with traditional Nepali hospitality and delicious organic meals.",
    location: "Pokhara",
    province: "Gandaki",
    priceNPR: 2235,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: [
      "WiFi",
      "Mountain View",
      "Lakefront",
      "Parking",
      "Organic Meals",
    ],
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/1630673/pexels-photo-1630673.jpeg",
      "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
    ],
    latitude: 28.2096,
    longitude: 83.9856,
    isVerified: true,
    instantBook: false,
    hosts: [
      {
        name: "Binod Gurung",
        avatar:
          "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
        role: "Owner",
        bio: "Binod is a nature lover and mountain guide who enjoys introducing guests to the beauty of Pokhara and the Annapurna region.",
        badges: ["Superhost", "Verified"],
        languages: ["English", "Nepali", "Gurung"],
      },
      {
        name: "Mina Gurung",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        role: "Chef",
        bio: "Mina prepares delicious organic meals and shares family recipes with guests.",
        badges: ["Local Expert"],
        languages: ["Nepali", "Hindi"],
      },
    ],
  },
];

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-primary">
            Homestays
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted-foreground">{listing.title}</span>
        </nav>

        {/* Title + Badges */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{listing.title}</h1>
            <div className="flex gap-3">
              {listing.isVerified && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Verified className="w-4 h-4" />
                  Verified
                </span>
              )}
              {listing.instantBook && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Instant Book
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              {listing.location}, {listing.province}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              Up to {listing.maxGuests} guests
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="w-5 h-5" />
              {listing.bedrooms} bedrooms
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-5 h-5" />
              {listing.bathrooms} bathrooms
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {listing.images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={img}
                alt={`${listing.title} - photo ${i + 1}`}
                width={i === 0 ? 800 : 400}
                height={i === 0 ? 800 : 400}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                About this homestay
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {listing.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Hosts */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                Meet your hosts ({listing.hosts.length})
              </h2>
              <div className="space-y-8">
                {listing.hosts.map((host, i) => (
                  <div
                    key={i}
                    className="flex gap-6 pb-8 border-b last:border-0"
                  >
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src={host.avatar}
                        alt={host.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{host.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {host.role}
                        </span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {host.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">{host.bio}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Languages:</span>
                        <span>{host.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="h-96 rounded-xl overflow-hidden border">
                <MapSection
                  lat={listing.latitude}
                  lng={listing.longitude}
                  title={listing.title}
                />
              </div>
            </section>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
