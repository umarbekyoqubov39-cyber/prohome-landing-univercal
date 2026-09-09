"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/Button";
import { validateContactForm, sanitizeText } from "@/utils/validation";
import type { ContactFormValues } from "@/types";

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/** Faqat raqamlarni qoldiradi va O'zbekiston raqamining 9 ta xonasi bilan cheklaydi. */
function toPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

/** "901234567" -> "90 123 45 67" ko'rinishida chiroyli ko'rsatadi. */
function formatUzPhone(digits: string): string {
  const p = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  return p.join(" ");
}

export function ContactForm() {
  const { t, locale } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "email" | "company", string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = toPhoneDigits(e.target.value);
    setValues((prev) => ({ ...prev, phone: digits }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(values, locale);
    setErrors(validation.errors);
    if (!validation.valid) return;

    setStatus("submitting");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeText(values.name),
          phone: `+998${values.phone}`,
          email: sanitizeText(values.email),
          company: sanitizeText(values.company),
          website: values.website, // honeypot
          locale,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || "request failed");
      }

      console.info("[contact] Yuborildi:", data?.delivery ?? data);
      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      console.error("Contact submit failed:", error);
      setServerError(error instanceof Error ? error.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot maydoni: haqiqiy foydalanuvchilarga ko'rinmaydi */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={handleChange("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-[13px] font-medium text-ink-secondary"
        >
          {t.contact.form.name}
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          placeholder={t.contact.form.namePlaceholder}
          maxLength={80}
          className="w-full rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:border-brand-blue"
        />
        {errors.name && (
          <p className="mt-1 text-[12px] text-brand-red">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-[13px] font-medium text-ink-secondary"
        >
          {t.contact.form.phone}
        </label>
        <div className="flex items-stretch rounded-xl border border-border-medium bg-white/[0.04] focus-within:border-brand-blue">
          <span className="flex select-none items-center gap-1.5 border-r border-border-medium px-3 text-[14px] font-medium text-ink-secondary">
            <span aria-hidden="true">🇺🇿</span>
            +998
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={formatUzPhone(values.phone)}
            onChange={handlePhoneChange}
            placeholder={t.contact.form.phonePlaceholder}
            className="w-full rounded-r-xl bg-transparent px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:outline-none"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-[12px] text-brand-red">{errors.phone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[13px] font-medium text-ink-secondary"
        >
          {t.contact.form.email}
        </label>
        <input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange("email")}
          placeholder={t.contact.form.emailPlaceholder}
          maxLength={254}
          className="w-full rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:border-brand-blue"
        />
        {errors.email && (
          <p className="mt-1 text-[12px] text-brand-red">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-[13px] font-medium text-ink-secondary"
        >
          {t.contact.form.company}
        </label>
        <input
          id="company"
          type="text"
          required
          value={values.company}
          onChange={handleChange("company")}
          placeholder={t.contact.form.companyPlaceholder}
          maxLength={120}
          className="w-full rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:border-brand-blue"
        />
        {errors.company && (
          <p className="mt-1 text-[12px] text-brand-red">{errors.company}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="blue"
        className="w-full"
        isLoading={status === "submitting"}
        icon={<Send className="h-4 w-4" />}
      >
        {status === "submitting"
          ? t.contact.form.submitting
          : t.contact.form.submit}
      </Button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-[13px] font-medium text-brand-green">
          <CheckCircle2 className="h-4 w-4" />
          {t.contact.form.success}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-[13px] font-medium text-brand-red">
          <AlertCircle className="h-4 w-4" />
          {serverError || t.contact.form.error}
        </p>
      )}
    </form>
  );
}
