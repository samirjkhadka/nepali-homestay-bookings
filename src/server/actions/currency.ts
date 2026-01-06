'use server';
import { cookies } from "next/headers";

const SUPPORTED_CURRENCIES = ["NPR", "USD", "EUR", "GBP", "INR"] as const;
type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const DEFAULT_CURRENCY: SupportedCurrency = "NPR";

export async function getCurrencyFromCookies(): Promise<SupportedCurrency> {
  try {
    const cookieStore = cookies();
    const currency = (await cookieStore).get("currency")?.value;

    if (
      currency &&
      SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency)
    ) {
      return currency as SupportedCurrency;
    }

    return DEFAULT_CURRENCY;
  } catch {
    // Safety for edge SSR cases
    return DEFAULT_CURRENCY;
  }
}
