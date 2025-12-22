// src/server/actions/currency.ts
"use server";

import type { SupportedCurrency } from "@/types/currency";

// Exchange rates (NPR as base) - update monthly or pull from API later
const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  NPR: 1,           // Base currency
  USD: 0.0075,      // ~1 USD ≈ 133 NPR (Dec 2025 average)
  EUR: 0.0069,      // ~1 EUR ≈ 145 NPR
  GBP: 0.0059,      // ~1 GBP ≈ 170 NPR
  INR: 0.625,       // ~1 INR ≈ 1.6 NPR
};

export async function convertPrice(
  priceNPR: number,
  targetCurrency: SupportedCurrency
): Promise<number> {
  if (priceNPR < 0) return 0;

  const rate = EXCHANGE_RATES[targetCurrency];
  const converted = priceNPR * rate;

  // Round to appropriate decimals
  if (targetCurrency === "NPR" || targetCurrency === "INR") {
    return Math.round(converted); // No decimals for NPR/INR
  }

  return Math.round(converted * 100) / 100; // 2 decimals for others
}