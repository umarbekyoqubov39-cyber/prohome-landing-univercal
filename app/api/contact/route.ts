import { NextRequest, NextResponse } from "next/server";
import {
  validateContactForm,
  sanitizeText,
  normalizeUzPhone,
} from "@/utils/validation";
import { isRateLimited } from "@/utils/rateLimit";
import { sendLeadToTelegram } from "@/utils/telegram";
import { sendLeadToBackend } from "@/utils/backend";
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
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const source =
      request.headers.get("referer") ??
      request.headers.get("origin") ??
      request.nextUrl.origin ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { name, phone, email, company, website, locale } = body as Record<
      string,
      unknown
    >;

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
        email: typeof email === "string" ? email : "",
        company: typeof company === "string" ? company : "",
      },
      safeLocale,
    );

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.errors },
        { status: 422 },
      );
    }

    const lead = {
      name: sanitizeText(name as string),
      phone: normalizeUzPhone(phone as string),
      email: sanitizeText(email as string),
      company: sanitizeText((company as string) ?? ""),
    };

    console.info(
      `[/api/contact] Yangi lid qabul qilindi: ${lead.name} / ${lead.phone} / ${lead.email} / ${lead.company} (ip=${ip})`,
    );

    // Asosiy manzil: PRO HOME backend CRM. Muvaffaqiyatsiz bo'lsa so'rov ham xato beradi.
    const backend = await sendLeadToBackend(lead);
    console.info(
      `[/api/contact] Backend CRM javobi: ${backend.status} ${backend.ok ? "OK" : "XATO"} (${backend.endpoint})`,
    );

    // Telegram bildirishnomasi — qo'shimcha, xato bo'lsa ham so'rovni to'xtatmaydi.
    let telegramOk = false;
    try {
      await sendLeadToTelegram({
        ...lead,
        ip,
        userAgent,
        locale: safeLocale,
        source,
      });
      telegramOk = true;
      console.info("[/api/contact] Telegram bildirishnomasi yuborildi");
    } catch (telegramError) {
      console.error(
        "[/api/contact] Telegram bildirishnomasi yuborilmadi:",
        telegramError,
      );
    }

    return NextResponse.json({
      success: true,
      message: "OK",
      delivery: {
        backend: { ok: backend.ok, status: backend.status },
        telegram: { ok: telegramOk },
      },
    });
  } catch (error) {
    console.error("[/api/contact] So'rov muvaffaqiyatsiz tugadi:", error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Internal error";

    return NextResponse.json(
      { success: false, message, delivery: { backend: { ok: false } } },
      { status: 502 },
    );
  }
}
