// app/host/dashboard/update-profile-action.ts
"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { hosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "host") return;

  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const bio = formData.get("bio")?.toString().trim();
  const avatar = formData.get("avatar")?.toString();

  if (!name) return;

  await db
    .update(hosts)
    .set({
      name,
      phone: phone || undefined,
      bio: bio || null,
      avatar: avatar || null,
    })
    .where(eq(hosts.id, session.userId));

  revalidatePath("/host/dashboard");
}