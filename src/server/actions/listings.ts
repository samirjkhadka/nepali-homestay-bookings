// src/server/actions/listings.ts
"use server";

import { db } from "@/lib/db/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleListingStatus(id: number, currentStatus: string) {
  const newStatus = currentStatus === "approved" ? "pending" : "approved";

  await db
    .update(listings)
    .set({ status: newStatus })
    .where(eq(listings.id, id));

  revalidatePath(`/admin/listings/${id}`);
  revalidatePath("/admin/listings");
}
