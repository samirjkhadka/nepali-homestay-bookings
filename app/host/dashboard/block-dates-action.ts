// app/host/dashboard/block-dates-action.ts
"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { blockedDates, listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function blockDatesAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "host") return;

  const selectedDates = formData.getAll("dates") as string[];

  const hostListings = await db
    .select({ id: listings.id })
    .from(listings)
    .where(eq(listings.primary_host_id, session.userId));

  if (hostListings.length === 0) return;

  const listingId = hostListings[0].id;

  await db.delete(blockedDates).where(eq(blockedDates.listingId, listingId));

  if (selectedDates.length > 0) {
    await db.insert(blockedDates).values(
      selectedDates.map((date) => ({
        listingId,
        date,
      }))
    );
  }

  revalidatePath("/host/dashboard");
}
