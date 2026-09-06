import type { Locale } from "@/types";
import uz from "./uz";
import ru from "./ru";
import en from "./en";

export const dictionaries = { uz, ru, en } satisfies Record<Locale, typeof uz>;

export type Dictionary = typeof uz;

export const locales: Locale[] = ["uz", "ru", "en"];

export const localeLabels: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
