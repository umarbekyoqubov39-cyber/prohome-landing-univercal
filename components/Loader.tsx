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
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setIsFadingOut(true), LOADER_DURATION_MS);
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
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-base-950 transition-opacity duration-500 ease-out",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
      role="status"
      aria-live="polite"
      aria-label="Sahifa yuklanmoqda"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-brand-green to-brand-greenDark text-lg font-bold text-white">
          P
        </span>
        <span className="text-2xl font-extrabold tracking-tight text-ink-primary">
          PRO HOME
        </span>
      </div>

      <div className="flex items-end gap-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full bg-brand-green"
            style={{
              animation: "zigzag 0.9s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
