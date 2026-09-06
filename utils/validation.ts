/**
 * Kontakt formasi uchun validatsiya funksiyalari.
 * Hujum vektorlarini (XSS, juda uzun matn, bo'sh spam) kamaytirish uchun
 * server tomonida ham, client tomonida ham ishlatiladi.
 */

const NAME_MAX = 80;
const COMPANY_MAX = 120;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<"name" | "phone" | "company", string>>;
}

const messages = {
  uz: {
    nameRequired: "Ismingizni kiriting",
    nameTooLong: "Ism juda uzun",
    phoneRequired: "Telefon raqamingizni kiriting",
    phoneInvalid: "Telefon raqami noto'g'ri formatda",
    companyTooLong: "Kompaniya nomi juda uzun",
  },
  ru: {
    nameRequired: "Введите ваше имя",
    nameTooLong: "Имя слишком длинное",
    phoneRequired: "Введите номер телефона",
    phoneInvalid: "Неверный формат номера телефона",
    companyTooLong: "Название компании слишком длинное",
  },
  en: {
    nameRequired: "Please enter your name",
    nameTooLong: "Name is too long",
    phoneRequired: "Please enter your phone number",
    phoneInvalid: "Invalid phone number format",
    companyTooLong: "Company name is too long",
  },
} as const;

export function sanitizeText(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 500);
}

export function validateContactForm(
  data: { name: string; phone: string; company: string },
  locale: "uz" | "ru" | "en" = "uz"
): ValidationResult {
  const t = messages[locale];
  const errors: ValidationResult["errors"] = {};

  const name = sanitizeText(data.name);
  const phone = sanitizeText(data.phone);
  const company = sanitizeText(data.company);

  if (!name) errors.name = t.nameRequired;
  else if (name.length > NAME_MAX) errors.name = t.nameTooLong;

  if (!phone) errors.phone = t.phoneRequired;
  else if (!PHONE_REGEX.test(phone)) errors.phone = t.phoneInvalid;

  if (company.length > COMPANY_MAX) errors.company = t.companyTooLong;

  return { valid: Object.keys(errors).length === 0, errors };
}
