import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class'larni xavfsiz birlashtiradi: shartli class'larni qo'shadi
 * va bir-biriga zid utility'larni (masalan ikkita padding) to'g'ri hal qiladi.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
