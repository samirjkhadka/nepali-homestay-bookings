"use server";

import { cookies } from "next/headers";

export async function setCurrency(currency: string) {
  (await cookies()).set("currency", currency, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}
