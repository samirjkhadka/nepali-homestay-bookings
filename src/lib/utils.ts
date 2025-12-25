import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function buildSignature(
  payloadObj: Record<string, any>,
  secretKey: string
): string {
  const keys = Object.keys(payloadObj).sort();
  const concat = keys.map((k) => (payloadObj[k] ?? "") + "").join("");
  const hmac = crypto.createHmac("sha512", secretKey);
  hmac.update(concat, "utf8");
  return hmac.digest("hex").toLowerCase();
}

export function basicAuthHeader(username: string, password: string): string {
  return `Basic ${Buffer.from(`$$ {username}: $${password}`).toString(
    "base64"
  )}`;
}
