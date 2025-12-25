// lib/onepg-utils.ts
import * as crypto from "crypto";

// --- Secure Environment Variables ---
const API_USER = process.env.ONEPG_API_USER!;
const API_PASS = process.env.ONEPG_API_PASS!;
const SECRET_KEY = process.env.ONEPG_SECRET_KEY!;
const API_BASE_URL = process.env.ONEPG_API_BASE_URL!;

/**
 * Generates the Basic Authentication header.
 * Format: Authorization: Basic <Base64(apiusername:password)>
 */
export function getBasicAuthHeader(): string {
  if (!API_USER || !API_PASS) {
    throw new Error(
      "OnePG API credentials are not set in environment variables."
    );
  }
  const credentials = `${API_USER}:${API_PASS}`;
  const base64Auth = Buffer.from(credentials).toString("base64");
  return `Basic ${base64Auth}`;
}

/**
 * Generates the HMAC-SHA512 signature required for API integrity.
 * Steps: 1. Sort keys alphabetically. 2. Concatenate values. 3. Hash with SecretKey.
 * @param payload - The JSON payload object.
 * @returns The lowercase hexadecimal HMAC-SHA512 signature string.
 */
export function generateSignature(payload: Record<string, any>): string {
  // 1. Alphabetically order keys and ensure required fields are present
  const requiredKeys = Object.keys(payload).sort();

  // 2. Concatenate values
  const value = requiredKeys.map((key) => payload[key]).join("");

  // 3. Apply HMAC-SHA512 using the secret key
  const hmac = crypto.createHmac("sha512", SECRET_KEY);
  hmac.update(value, "utf8");

  // 4. Convert to lowercase hexadecimal string
  return hmac.digest("hex");
}

/**
 * Generic function to handle secure POST requests to the OnePG API.
 * Handles Auth and Signature generation internally.
 */
export async function onePGPost(
  endpoint: string,
  payload: Record<string, any>
) {
  // Generate signature using the payload
  const signature = generateSignature(payload);

  // Add signature to the payload for the request
  const requestBody = { ...payload, Signature: signature };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBasicAuthHeader(), // Secure Basic Auth header
    },
    body: JSON.stringify(requestBody),
    // Important for Next.js 14: Ensure dynamic rendering for API calls
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `OnePG API call failed: HTTP status ${response.status} on ${endpoint}`
    );
  }

  return response.json();
}
