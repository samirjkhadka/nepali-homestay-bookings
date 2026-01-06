// app/api/listings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { listings, hosts, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
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
      amenities = [],
      images = [],
      hosts: hostData = [],
      homestay_type,
      number_of_houses,
      ward_no,
      street,
      way_to_get_there = [],
      primary_host_index = 0, // default to first host
    } = body;

    // Validation
    if (
      !title ||
      !description ||
      !location ||
      !province ||
      !price_npr ||
      !max_guests ||
      images.length === 0 ||
      hostData.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const session = await getSession(); // from request or cookie
    if (session && session.role === "guest") {
      await db
        .update(users)
        .set({ role: "host" })
        .where(eq(users.id, session.userId));
    }
    // Insert listing
    const [newListing] = await db
      .insert(listings)
      .values({
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
        homestay_type,
        number_of_houses:
          homestay_type === "community" ? Number(number_of_houses) : null,
        ward_no: ward_no || null,
        street: street || null,
        way_to_get_there,
        latitude: "27.7172",
        longitude: "85.3240",
        is_verified: true,
        instant_book: false,
        status: "approved",
        district: "",
        // type: homestay_type,
      })
      .returning();

    // Insert hosts
    const insertedHosts = await db
      .insert(hosts)
      .values(
        hostData.map((host: any) => ({
          listingId: newListing.id,
          name: host.name || "Host",
          avatar: host.avatar || null,
          role: host.role || "Owner",
          bio: host.bio || "",
          languages: host.languages || [],
          badges: host.badges || [],
          email: host.email || null,
          phone: host.phone || null,
        }))
      )
      .returning();

    // Set primary host in listings table
    const primaryHostIndexNum = Number(primary_host_index);
    const primaryHost = insertedHosts[primaryHostIndexNum];

    if (primaryHost) {
      await db
        .update(listings)
        .set({ primary_host_id: primaryHost.id })
        .where(eq(listings.id, newListing.id));

      // GENERATE PASSWORD SETUP TOKEN FOR PRIMARY HOST
      if (primaryHost.email) {
        const crypto = require("crypto");
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await db
          .update(hosts)
          .set({
            password_reset_token: token,
            token_expiry: tokenExpiry,
          })
          .where(eq(hosts.id, primaryHost.id));

        console.log(`Password setup link for ${primaryHost.email}:`);
        console.log(
          `https://nepalihomestays.com/host/set-password?token=${token}`
        );
        // TODO: Send via SMS/Email (Twilio/Nodemailer) — tomorrow
      }
    }

    // Set primary host
    const primaryHostId = insertedHosts[Number(primary_host_index)]?.id;
    if (primaryHostId) {
      await db
        .update(listings)
        .set({ primary_host_id: primaryHostId })
        .where(eq(listings.id, newListing.id));
    }

    return NextResponse.json({
      success: true,
      listingId: newListing.id,
      primaryHostId,
    });
  } catch (error: any) {
    console.error("Failed to create listing:", error);
    return NextResponse.json(
      {
        error: "Failed to save listing",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
