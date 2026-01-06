// src/lib/sms.ts
export async function sendSMSOTP(to: string, code: string) {
  const response = await fetch("https://api.sparrowsms.com/v2/sms/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SPARROW_SMS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [to.replace("+977", "0")], // Nepal format
      text: `Your Nepali Homestays verification code: ${code}. Valid 2 minutes.`,
      from: "NepaliHS",
    }),
  });

  if (!response.ok) {
    console.error("SMS failed:", await response.text());
  }
}
