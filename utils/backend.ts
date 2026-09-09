import "server-only";

interface NewCustomerLead {
  name: string;
  /** +998XXXXXXXXX ko'rinishida normalizatsiya qilingan raqam. */
  phone: string;
  email: string;
  company: string;
}

export interface BackendResult {
  ok: boolean;
  status: number;
  endpoint: string;
}

const DEFAULT_ENDPOINT = "https://backend.prohome.uz/api/v1/new-customers";

/**
 * Yangi lidni PRO HOME backend CRM'iga yuboradi.
 * Endpoint manzilini .env orqali (BACKEND_NEW_CUSTOMERS_URL) o'zgartirsa bo'ladi.
 * Muvaffaqiyatsiz javob (non-2xx) yoki tarmoq xatosida throw qiladi.
 */
export async function sendLeadToBackend(
  lead: NewCustomerLead,
): Promise<BackendResult> {
  const endpoint =
    process.env.BACKEND_NEW_CUSTOMERS_URL?.trim() || DEFAULT_ENDPOINT;

  const payload = {
    fullname: lead.name,
    phone: lead.phone,
    email: lead.email,
    company_name: lead.company,
  };

  console.info(
    `[backend] So'rov yuborilmoqda -> ${endpoint} | ${JSON.stringify(payload)}`,
  );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const bodyText = await response.text().catch(() => "");

    console.info(
      `[backend] Javob: ${response.status} ${response.ok ? "OK" : "XATO"} | ${bodyText.slice(0, 500)}`,
    );

    if (!response.ok) {
      throw new Error(`Backend API xatosi: ${response.status} ${bodyText}`);
    }

    return { ok: true, status: response.status, endpoint };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`[backend] So'rov timeout bo'ldi (8s) -> ${endpoint}`);
      throw new Error("Backend API timeout (8s)");
    }
    console.error("[backend] So'rov xatosi:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
