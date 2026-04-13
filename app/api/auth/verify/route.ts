import { verifyMagicToken, generateSessionToken, AUTH_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/login?error=missing_token");
  }

  const email = verifyMagicToken(token);

  if (!email) {
    return redirect("/login?error=invalid_token");
  }

  // Token verified — create session
  const sessionToken = generateSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, `${email}:${sessionToken}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return redirect("/dashboard");
}
