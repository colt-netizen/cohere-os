import { isAllowedEmail, generateMagicToken, storeMagicToken } from "@/lib/auth";
import { sendMagicLink } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.toLowerCase()?.trim();

  if (!email || !isAllowedEmail(email)) {
    // Don't reveal whether the email exists — always say "sent"
    // for security, but only actually send if allowed
    return Response.json({ success: true });
  }

  const token = generateMagicToken();
  storeMagicToken(email, token);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

  try {
    await sendMagicLink(email, token, baseUrl);
  } catch (err) {
    console.error("Failed to send magic link:", err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ success: true });
}
