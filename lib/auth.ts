import { randomBytes, createHash } from "crypto";

const ALLOWED_EMAILS = [
  "matt@gtrocha.com",
  "colt@gtrocha.com",
  "rochamatthewt@gmail.com",
];

export const AUTH_COOKIE = "cohere-auth";
export const TOKEN_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function isAllowedEmail(email: string): boolean {
  return ALLOWED_EMAILS.includes(email.toLowerCase().trim());
}

export function generateMagicToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function generateSessionToken(): string {
  return randomBytes(48).toString("hex");
}

// In-memory token store — works for serverless with short TTL
interface PendingToken {
  hashedToken: string;
  email: string;
  expiresAt: number;
}

const pendingTokens = new Map<string, PendingToken>();

export function storeMagicToken(email: string, token: string): void {
  const now = Date.now();
  for (const [key, val] of pendingTokens) {
    if (val.expiresAt < now) pendingTokens.delete(key);
  }

  const hashed = hashToken(token);
  pendingTokens.set(hashed, {
    hashedToken: hashed,
    email: email.toLowerCase().trim(),
    expiresAt: now + TOKEN_EXPIRY_MS,
  });
}

export function verifyMagicToken(token: string): string | null {
  const hashed = hashToken(token);
  const entry = pendingTokens.get(hashed);

  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    pendingTokens.delete(hashed);
    return null;
  }

  pendingTokens.delete(hashed);
  return entry.email;
}
