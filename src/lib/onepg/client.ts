// src/lib/payments/onepg/client.ts
import { buildSignature } from "@/lib/utils"; // We'll move your utils there
import { basicAuthHeader } from "@/lib/utils"; // Same file

const ONEPG_API_BASE = "https://api.onepg.com.np"; // Or your exact endpoint
const MERCHANT_ID = process.env.ONEPG_MERCHANT_ID!;
const SECRET_KEY = process.env.ONEPG_SECRET_KEY!;

export async function checkTransactionStatus(merchantTxnId: string) {
  const payload = {
    MerchantId: MERCHANT_ID,
    MerchantTxnId: merchantTxnId,
    // Add any other required fields (e.g., TxnDate if needed)
  };

  // Generate signature using your exact function
  const signature = buildSignature(payload, SECRET_KEY);

  const response = await fetch(`${ONEPG_API_BASE}/transaction/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuthHeader(MERCHANT_ID, SECRET_KEY), // Or merchantId:secret if that's the format
      Signature: signature,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`OnePG status check failed: ${response.statusText}`);
  }

  const data = await response.json();

  // OnePG typically returns { code: "0" for success, data: { Status, GatewayReferenceNo, ... } }
  return {
    code: data.code || "1",
    data: data.data || {},
  };
}
