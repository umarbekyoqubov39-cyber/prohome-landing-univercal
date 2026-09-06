import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, sanitizeText } from "@/utils/validation";
import { isRateLimited } from "@/utils/rateLimit";
import { sendLeadToTelegram } from "@/utils/telegram";
import type { Locale } from "@/types";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, phone, company, website, locale } = body as Record<string, unknown>;

    // Honeypot: agar bu maydon to'ldirilgan bo'lsa, so'rov bot tomonidan
    // yuborilgan deb hisoblanadi va jim ravishda "muvaffaqiyatli" javob beriladi.
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json({ success: true, message: "OK" });
    }

    const safeLocale: Locale = ["uz", "ru", "en"].includes(locale as string)
      ? (locale as Locale)
      : "uz";

    const result = validateContactForm(
      {
        name: typeof name === "string" ? name : "",
        phone: typeof phone === "string" ? phone : "",
        company: typeof company === "string" ? company : "",
      },
      safeLocale
    );

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.errors },
        { status: 422 }
      );
    }

    await sendLeadToTelegram({
      name: sanitizeText(name as string),
      phone: sanitizeText(phone as string),
      company: sanitizeText((company as string) ?? ""),
    });

    return NextResponse.json({ success: true, message: "OK" });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
