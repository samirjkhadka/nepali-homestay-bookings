// src/repositories/hostRepository.ts
import { db } from "@/lib/db/db";
import { hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const hostRepository = {
  async getByListingId(listingId: number) {
    return await db
      .select({
        id: hosts.id,
        name: hosts.name,
        avatar: hosts.avatar,
        role: hosts.role,
        bio: hosts.bio,
        languages: hosts.languages,
        badges: hosts.badges,
        email: hosts.email,
        phone: hosts.phone,
      })
      .from(hosts)
      .where(eq(hosts.listingId, listingId));
  },
};