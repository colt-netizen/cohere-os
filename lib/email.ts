import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

export async function sendMagicLink(email: string, token: string, baseUrl: string) {
  const magicUrl = `${baseUrl}/api/auth/verify?token=${token}`;

  const resend = getResend();
  await resend.emails.send({
    from: "Cohere OS <login@cohere-os.com>",
    to: email,
    subject: "Sign in to Cohere OS",
    html: `
      <div style="font-family: -apple-system, system-ui, 'Segoe UI', sans-serif; max-width: 460px; margin: 0 auto; padding: 40px 0;">
        <div style="margin-bottom: 32px;">
          <div style="display: inline-flex; align-items: center; gap: 10px;">
            <div style="width: 28px; height: 28px; background: #5e6ad2; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: 600; font-size: 14px;">C</span>
            </div>
            <span style="font-size: 15px; font-weight: 500; color: #1a1a1a;">Cohere OS</span>
          </div>
        </div>

        <h1 style="font-size: 22px; font-weight: 500; color: #1a1a1a; margin-bottom: 12px; letter-spacing: -0.3px;">
          Sign in to your dashboard
        </h1>
        <p style="font-size: 15px; color: #666; line-height: 1.6; margin-bottom: 28px;">
          Click the button below to sign in. This link expires in 10 minutes.
        </p>

        <a href="${magicUrl}" style="display: inline-block; background: #5e6ad2; color: white; font-size: 14px; font-weight: 500; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
          Sign in to Cohere OS
        </a>

        <p style="font-size: 13px; color: #999; margin-top: 28px; line-height: 1.5;">
          If you didn't request this, you can safely ignore this email.<br>
          This link can only be used once.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 28px 0;" />
        <p style="font-size: 12px; color: #bbb;">
          Cohere OS · cohere-os.com
        </p>
      </div>
    `,
  });
}
