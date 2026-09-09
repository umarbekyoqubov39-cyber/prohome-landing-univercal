"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const LOADER_DURATION_MS = 3000;
const FADE_DURATION_MS = 500;

/**
 * Sahifa ochilishidan oldin 3 soniya ko'rinadigan loader.
 * "PRO HOME" yozuvi va zig-zag tarzda sakraydigan uchta nuqta bilan.
 * Vaqt tugagach yumshoq fade-out bilan yo'qoladi va asosiy kontent ochiladi.
 */
export function Loader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(
      () => setIsFadingOut(true),
      LOADER_DURATION_MS,
    );
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, LOADER_DURATION_MS + FADE_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_35%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.14),_transparent_40%),_rgba(2,6,23,0.96)] backdrop-blur-md transition-opacity duration-500 ease-out",
        isFadingOut ? "opacity-0" : "opacity-100",
      )}
      role="status"
      aria-live="polite"
      aria-label="Sahifa yuklanmoqda"
    >
      <div className="loader-shell flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-white/5 px-8 py-7 shadow-[0_30px_80px_rgba(2,6,23,0.7)]">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-brand-green to-brand-greenDark text-lg font-bold text-white shadow-[0_12px_35px_rgba(34,197,94,0.45)]">
            P
          </span>
          <span className="text-[28px] font-extrabold tracking-tight text-ink-primary">
            PRO HOME
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="loader-dot"
              style={{
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
