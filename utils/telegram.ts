import "server-only";

interface TelegramLead {
  name: string;
  phone: string;
  company: string;
}

/**
 * MarkdownV2 uchun maxsus belgilarni escape qiladi, aks holda Telegram
 * xabarni rad etadi yoki formatlash buziladi.
 */
function escapeMarkdownV2(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (match) => `\\${match}`);
}

/**
 * Yangi lidni Telegram botga yuboradi. Token va chat ID faqat server
 * muhitida (.env) saqlanadi va clientga hech qachon chiqarilmaydi.
 */
export async function sendLeadToTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
  }

  const text = [
    "🏠 *Yangi ariza — PRO HOME*",
    "",
    `👤 *Ism:* ${escapeMarkdownV2(lead.name)}`,
    `📞 *Telefon:* ${escapeMarkdownV2(lead.phone)}`,
    lead.company ? `🏢 *Kompaniya:* ${escapeMarkdownV2(lead.company)}` : null,
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
      }
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Telegram API xatosi: ${response.status} ${body}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
