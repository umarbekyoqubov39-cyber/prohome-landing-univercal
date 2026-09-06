import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/types";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/**
 * Tanlangan til global state sifatida saqlanadi va localStorage'da
 * persist qilinadi, shunda foydalanuvchi qayta kirganda tanlovi eslab qolinadi.
 */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "uz",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "prohome-locale",
    }
  )
);
