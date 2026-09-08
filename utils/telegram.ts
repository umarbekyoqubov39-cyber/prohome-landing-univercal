import "server-only";

interface TelegramLead {
  name: string;
  phone: string;
  company: string;
  ip?: string;
  userAgent?: string;
  locale?: string;
  source?: string;
}

/**
 * MarkdownV2 uchun maxsus belgilarni escape qiladi, aks holda Telegram
 * xabarni rad etadi yoki formatlash buziladi.
 */
function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, (match) => `\\${match}`);
}

function normalizeChatTarget(rawValue?: string): string {
  const value = rawValue?.trim();

  if (!value) {
    return "";
  }

  const lower = value.toLowerCase();
  if (
    lower.includes("t.me/+") ||
    lower.includes("telegram.me/+") ||
    value.includes("/+")
  ) {
    throw new Error(
      "Telegram invite link is not valid as TELEGRAM_CHAT_ID. Use the numeric chat ID or @username instead. You can get it from @RawDataBot in the target chat.",
    );
  }

  if (
    lower.startsWith("https://t.me/") ||
    lower.startsWith("http://t.me/") ||
    lower.startsWith("t.me/")
  ) {
    const slug = value.split("/").filter(Boolean).pop();
    if (!slug) {
      return "";
    }

    return slug.startsWith("@") ? slug : `@${slug}`;
  }

  if (value.startsWith("@")) {
    return value;
  }

  return value;
}

/**
 * Yangi lidni Telegram botga yuboradi. Token va chat ID faqat server
 * muhitida (.env) saqlanadi va clientga hech qachon chiqarilmaydi.
 */
export async function sendLeadToTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatTarget =
    process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_LINK;
  const chatId = normalizeChatTarget(chatTarget);

  if (!token || !chatId) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID/TELEGRAM_CHAT_LINK sozlanmagan",
    );
  }

  const text = [
    "🏠 *Yangi ariza — PRO HOME*",
    "",
    `👤 *Ism:* ${escapeMarkdownV2(lead.name)}`,
    `📞 *Telefon:* ${escapeMarkdownV2(lead.phone)}`,
    lead.company ? `🏢 *Kompaniya:* ${escapeMarkdownV2(lead.company)}` : null,
    lead.ip ? `🌐 *IP:* ${escapeMarkdownV2(lead.ip)}` : null,
    lead.locale ? `🌍 *Locale:* ${escapeMarkdownV2(lead.locale)}` : null,
    lead.userAgent ? `🖥️ *Browser:* ${escapeMarkdownV2(lead.userAgent)}` : null,
    lead.source ? `🔗 *Source:* ${escapeMarkdownV2(lead.source)}` : null,
    "",
    `🕐 ${escapeMarkdownV2(new Date().toLocaleString("uz-UZ"))}`,
  ]
    .filter(Boolean)
    .join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Telegram API xatosi: ${response.status} ${body}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
