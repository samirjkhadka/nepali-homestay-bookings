// app/api/bookings/callback/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get("bookingId");
  const status = searchParams.get("status"); // "success" or "failed" from OnePG
  const transactionId = searchParams.get("transaction_id");

  if (!bookingId) {
    return NextResponse.redirect(new URL("/book/cancel", request.url));
  }

  try {
    const updateData: any = {
      paymentStatus: status === "success" ? "paid" : "failed",
      status: status === "success" ? "confirmed" : "cancelled",
    };

    if (transactionId) {
      updateData.gatewayRef = transactionId;
    }

    await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, Number(bookingId)));

    const redirectUrl =
      status === "success"
        ? `/book/success?bookingId=${bookingId}`
        : "/book/cancel";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.redirect(new URL("/book/cancel", request.url));
  }
}
