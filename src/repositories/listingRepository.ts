// src/repositories/listingRepository.ts

import { db } from "../lib/db/db"
import { listings } from "../lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export const listingRepository = {
  async getFeatured(limit = 6) {
    const result = await db
      .select()
      .from(listings)
      .where(eq(listings.status, "approved"));

    console.log(result);
    return result;
  },

  async getByProvince(province: string) {
    return await db
      .select()
      .from(listings)
      .where(
        and(eq(listings.province, province), eq(listings.status, "approved"))
      );
  },

  async getApproved() {
    return await db
      .select()
      .from(listings)
      .where(eq(listings.status, "approved"))
      .orderBy(desc(listings.id));
  },

  async getById(id: number) {
    const [listing] = await db
      .select()
      .from(listings)
      .where(eq(listings.id, id));
    return listing || null;
  },
};
