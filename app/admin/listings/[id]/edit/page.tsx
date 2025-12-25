// app/admin/listings/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ListingForm from "../../components/ListingForm";


export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = parseInt(id);

  if (isNaN(listingId)) {
    notFound();
  }

  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, listingId));

  if (!listing) {
    notFound();
  }

  const listingHosts = await db
    .select()
    .from(hosts)
    .where(eq(hosts.listingId, listingId));

  // Parse location: "Municipality, District"
  const locationParts = listing.location
    ? listing.location.split(",").map((s: string) => s.trim())
    : [];
  const municipality = locationParts[0] || "";
  const district = locationParts[1] || "";

  const formattedListing = {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    homestay_type: listing.homestay_type,
    number_of_houses: listing.number_of_houses,
    province: listing.province,
    district,
    municipality,
    price_npr: listing.price_npr,
    max_guests: listing.max_guests,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    amenities: listing.amenities as string[],
    images: listing.images as string[],
    ward_no: listing.ward_no || "",
    street: listing.street || "",
    way_to_get_there: (listing.way_to_get_there as string[]) || [],
    hosts: listingHosts.map((h) => ({
      id: h.id,
      name: h.name,
      avatar: h.avatar || "",
      role: h.role || "",
      bio: h.bio || "",
      languages: (h.languages as string[]) || [],
      badges: (h.badges as string[]) || [],
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">
        Edit Homestay: {listing.title}
      </h1>
      <ListingForm initialData={formattedListing} />
    </div>
  );
}
