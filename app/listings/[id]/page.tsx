// app/listings/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  Verified,
  Zap,
  Calendar,
} from "lucide-react";
import BookingWidget from "./BookingWidget";

import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import MapSection from "../../(sections)/MapSection";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = parseInt(id);

  const [listingData] = await db
    .select()
    .from(listings)
    .where(and(eq(listings.id, listingId), eq(listings.status, "approved")))
    .limit(1);

  if (!listingData) {
    notFound();
  }

  const listingHosts = await db
    .select()
    .from(hosts)
    .where(eq(hosts.listingId, listingId));

  const images = listingData.images as string[];

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
          <span className="text-muted-foreground">{listingData.title}</span>
        </nav>

        {/* Title + Badges */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{listingData.title}</h1>
            <div className="flex gap-3">
              {listingData.is_verified && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Verified className="w-4 h-4" />
                  Verified
                </span>
              )}
              {listingData.instant_book && (
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
              {listingData.location}, {listingData.province}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              Up to {listingData.max_guests} guests
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="w-5 h-5" />
              {listingData.bedrooms} bedrooms
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-5 h-5" />
              {listingData.bathrooms} bathrooms
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {images.slice(0, 4).map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={img}
                alt={`${listingData.title} - photo ${i + 1}`}
                width={i === 0 ? 800 : 400}
                height={i === 0 ? 800 : 400}
                className="object-cover w-full h-full"
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
                {listingData.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {(listingData.amenities as string[]).map((amenity) => (
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
                Meet your hosts ({listingHosts.length})
              </h2>
              <div className="space-y-8">
                {listingHosts.map((host) => (
                  <div
                    key={host.id}
                    className="flex gap-6 pb-8 border-b last:border-0"
                  >
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src={host.avatar || "/default-avatar.jpg"}
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
                        {(host.badges as string[]).map((badge) => (
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
                        <span>{(host.languages as string[]).join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            {listingData.latitude && listingData.longitude && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="h-96 rounded-xl overflow-hidden border">
                  <MapSection
                    lat={Number(listingData.latitude)}
                    lng={Number(listingData.longitude)}
                    title={listingData.title}
                  />
                </div>
              </section>
            )}
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingWidget listing={listingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
