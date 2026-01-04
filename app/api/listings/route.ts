// app/api/listings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { InferInsertModel } from "drizzle-orm";

type NewListing = InferInsertModel<typeof listings>;

export async function POST(request: Request) {
  const body = await request.json();

  const {
    title,
    description,
    location,
    province,
    price_npr,
    max_guests,
    bedrooms,
    bathrooms,
    amenities,
    images,
    hosts: hostData,
    homestayType,
    numberOfHouses,
    wardNo,
    street,
    wayToGetThere,
  } = body;

  console.log(body);

  if (
    !title ||
    !description ||
    !location ||
    !province ||
    !price_npr ||
    !max_guests ||
    !images ||
    !Array.isArray(images) ||
    images.length === 0
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const insertData: NewListing = {
      title,
      description,
      location,
      province,
      price_npr: Number(price_npr),
      max_guests: Number(max_guests),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      images,
      homestay_type: homestayType,
      number_of_houses: homestayType === "community" ? Number(numberOfHouses) : null,
      ward_no: wardNo || null,
      street: street || null,
      way_to_get_there: wayToGetThere || [],
      latitude: "27.7172",
      longitude: "85.324",
      is_verified: true,
      instant_book: false,
      status: "approved",
      host_id: 1,
      district: "",
      type: ""
    };

    const [newListing] = await db
      .insert(listings)
      .values(insertData)
      .returning();

    // Save hosts
    if (hostData && Array.isArray(hostData) && hostData.length > 0) {
      await db.insert(hosts).values(
        hostData.map((host: any) => ({
          listingId: newListing.id,
          name: host.name || "Host",
          avatar: host.avatar || null,
          role: host.role || "Owner",
          bio: host.bio || "",
          languages: host.languages || [],
          badges: host.badges || [],
        }))
      );
    }

    return NextResponse.json({ success: true, listingId: newListing.id });
  } catch (error) {
    console.error("Failed to create listing:", error);
    return NextResponse.json(
      { error: "Failed to save listing" },
      { status: 500 }
    );
  }
}
