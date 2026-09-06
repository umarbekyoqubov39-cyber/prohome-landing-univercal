"use client";

import { useLocaleStore } from "@/lib/store/useLocaleStore";
import { getDictionary } from "@/lib/i18n/index";

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale);
  const setLocale = useLocaleStore((state) => state.setLocale);
  const t = getDictionary(locale);

  return { t, locale, setLocale };
}
