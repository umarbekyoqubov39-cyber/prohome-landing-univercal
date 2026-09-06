"use client";

import { Phone } from "lucide-react";

/**
 * Telegram bot/kanal havolasi. O'zingizning Telegram username yoki bot
 * havolangiz bilan almashtiring (masalan: https://t.me/prohome_uz).
 */
const TELEGRAM_URL = "https://t.me/prohome_uz";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M21.05 3.35 2.9 10.4c-1.25.5-1.24 1.2-.23 1.5l4.65 1.45 1.8 5.5c.22.6.37.84.75.84.3 0 .43-.14.6-.3l1.7-1.65 4.7 3.47c.6.35 1.05.17 1.2-.55l2.9-13.7c.24-1.03-.34-1.5-1.02-1.6Zm-3.72 3.7-6.4 5.8-.27 3.7-1.3-4.05 8.7-6.2c.4-.28.78-.13.45.15Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FloatingActions() {
  const handlePhoneClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center gap-3 md:bottom-8 md:right-8">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-brand-blue to-brand-blueDark text-white shadow-[0_10px_28px_-10px_rgba(59,130,246,0.7)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <TelegramIcon />
      </a>
      <button
        type="button"
        onClick={handlePhoneClick}
        aria-label="Bog'lanish"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-brand-green to-brand-greenDark text-white shadow-[0_10px_28px_-10px_rgba(34,197,94,0.7)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Phone className="h-5 w-5" />
      </button>
    </div>
  );
}
