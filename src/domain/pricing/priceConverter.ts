const rates: Record<string, number> = {
  NPR: 1,
  USD: 0.0075,
  EUR: 0.0069,
  GBP: 0.0059,
  INR: 0.625,
};

export function convertPrice(priceNPR: number, currency: string): number {
  const rate = rates[currency] ?? 1;
  return Math.round(priceNPR * rate);
}
