// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { bookings } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { listingId, checkIn, checkOut, guests, totalPriceNPR } = body;

  if (!listingId || !checkIn || !checkOut || !guests || !totalPriceNPR) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const [newBooking] = await db
      .insert(bookings)
      .values({
        listingId: Number(listingId),
        guestId: 1, // TODO: map from Clerk userId
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: Number(guests),
        totalPriceNPR: Number(totalPriceNPR),
        status: "pending",
        paymentStatus: "pending",
      })
      .returning();

    // Generate OnePG checkout URL
    const onepgUrl = generateOnePGUrl({
      amount: totalPriceNPR,
      bookingId: newBooking.id,
      description: `Booking for listing ${listingId}`,
    });

    return NextResponse.json({
      bookingId: newBooking.id,
      onepgUrl,
    });
  } catch (error) {
    console.error("Booking creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

function generateOnePGUrl({
  amount,
  bookingId,
  description,
}: {
  amount: number;
  bookingId: number;
  description: string;
}) {
  const merchantId = process.env.ONEPG_MERCHANT_ID!;
  const secret = process.env.ONEPG_SECRET_KEY!;
  const returnUrl = `https://your-staging-url.com/api/bookings/callback?bookingId=${bookingId}`;

  const params = new URLSearchParams({
    merchant_id: merchantId,
    amount: amount.toString(),
    currency: "NPR",
    description,
    return_url: returnUrl,
    // Add other required OnePG params
  });

  return `https://sandbox.onepg.com.np/checkout?${params.toString()}`;
}
