/**
 * Kontakt formasi uchun validatsiya funksiyalari.
 * Hujum vektorlarini (XSS, juda uzun matn, bo'sh spam) kamaytirish uchun
 * server tomonida ham, client tomonida ham ishlatiladi.
 */

const NAME_MAX = 80;
const COMPANY_MAX = 120;
const EMAIL_MAX = 254;
/** Faqat O'zbekiston raqami: +998 dan keyin aynan 9 ta raqam. */
const UZ_PHONE_REGEX = /^\+998\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<"name" | "phone" | "email" | "company", string>>;
}

const messages = {
  uz: {
    nameRequired: "Ismingizni kiriting",
    nameTooLong: "Ism juda uzun",
    phoneRequired: "Telefon raqamingizni kiriting",
    phoneInvalid: "Faqat O'zbekiston raqamini kiriting (+998 dan keyin 9 ta raqam)",
    emailRequired: "Email manzilingizni kiriting",
    emailInvalid: "Email manzili noto'g'ri formatda",
    companyRequired: "Kompaniya nomini kiriting",
    companyTooLong: "Kompaniya nomi juda uzun",
  },
  ru: {
    nameRequired: "Введите ваше имя",
    nameTooLong: "Имя слишком длинное",
    phoneRequired: "Введите номер телефона",
    phoneInvalid: "Введите только узбекский номер (9 цифр после +998)",
    emailRequired: "Введите ваш email",
    emailInvalid: "Неверный формат email",
    companyRequired: "Введите название компании",
    companyTooLong: "Название компании слишком длинное",
  },
  en: {
    nameRequired: "Please enter your name",
    nameTooLong: "Name is too long",
    phoneRequired: "Please enter your phone number",
    phoneInvalid: "Enter an Uzbek number only (9 digits after +998)",
    emailRequired: "Please enter your email",
    emailInvalid: "Invalid email format",
    companyRequired: "Please enter your company name",
    companyTooLong: "Company name is too long",
  },
} as const;

export function sanitizeText(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 500);
}

/** Kiritilgan har qanday ko'rinishdagi raqamni +998XXXXXXXXX ko'rinishiga keltiradi. */
export function normalizeUzPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  return digits ? `+998${digits}` : "";
}

export function validateContactForm(
  data: { name: string; phone: string; email: string; company: string },
  locale: "uz" | "ru" | "en" = "uz"
): ValidationResult {
  const t = messages[locale];
  const errors: ValidationResult["errors"] = {};

  const name = sanitizeText(data.name);
  const phone = normalizeUzPhone(data.phone);
  const email = sanitizeText(data.email);
  const company = sanitizeText(data.company);

  if (!name) errors.name = t.nameRequired;
  else if (name.length > NAME_MAX) errors.name = t.nameTooLong;

  if (!phone) errors.phone = t.phoneRequired;
  else if (!UZ_PHONE_REGEX.test(phone)) errors.phone = t.phoneInvalid;

  if (!email) errors.email = t.emailRequired;
  else if (email.length > EMAIL_MAX || !EMAIL_REGEX.test(email))
    errors.email = t.emailInvalid;

  if (!company) errors.company = t.companyRequired;
  else if (company.length > COMPANY_MAX) errors.company = t.companyTooLong;

  return { valid: Object.keys(errors).length === 0, errors };
}
