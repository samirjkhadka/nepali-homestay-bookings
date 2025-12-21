// src/types/currency.ts
export type SupportedCurrency = "NPR" | "USD" | "EUR" | "GBP" | "INR";

export const SUPPORTED_CURRENCIES = ["NPR", "USD", "EUR", "GBP", "INR"] as const;

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  NPR: "₨ ",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

// Default currency for new users / fallback
export const DEFAULT_CURRENCY: SupportedCurrency = "NPR";