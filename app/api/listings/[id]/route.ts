// app/api/listings/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { listings, hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ← params is Promise
) {
  const { id } = await params; // ← MUST await
  const listingId = Number(id);

  if (isNaN(listingId)) {
    return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
  }

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
    status = "approved",
  } = body;

  try {
    // Update listing
    await db
      .update(listings)
      .set({
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
        status,
      })
      .where(eq(listings.id, listingId));

    // Delete old hosts
    await db.delete(hosts).where(eq(hosts.listingId, listingId));

    // Insert new hosts
    if (hostData && Array.isArray(hostData) && hostData.length > 0) {
      await db.insert(hosts).values(
        hostData.map((host: any) => ({
          listingId,
          name: host.name || "Host",
          avatar: host.avatar || null,
          role: host.role || "Co-Host",
          bio: host.bio || "",
          languages: host.languages || [],
          badges: host.badges || [],
        }))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}
