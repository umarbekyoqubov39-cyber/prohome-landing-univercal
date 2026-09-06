/**
 * Oddiy xotiradagi (in-memory) rate limiter.
 *
 * Eslatma: serverless muhitda (masalan Vercel) har bir instance o'z
 * xotirasiga ega bo'lgani uchun bu limit "best-effort" hisoblanadi.
 * Yuqori trafikli production loyihada Upstash Redis kabi tashqi
 * saqlashdan foydalanish tavsiya etiladi.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = hits.get(identifier);

  if (!entry || now > entry.resetAt) {
    hits.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}

// Xotira sizib ketmasligi uchun eskirgan yozuvlarni vaqti-vaqti bilan tozalaymiz.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits.entries()) {
    if (now > entry.resetAt) hits.delete(key);
  }
}, WINDOW_MS).unref?.();
