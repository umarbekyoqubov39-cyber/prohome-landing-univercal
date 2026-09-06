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
  company: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { t, locale } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "company", string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(values, locale);
    setErrors(validation.errors);
    if (!validation.valid) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeText(values.name),
          phone: sanitizeText(values.phone),
          company: sanitizeText(values.company),
          website: values.website, // honeypot
          locale,
        }),
      });

      if (!response.ok) throw new Error("request failed");

      setStatus("success");
      setValues(initialValues);
    } catch {
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
        <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-ink-secondary">
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
        {errors.name && <p className="mt-1 text-[12px] text-brand-red">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-medium text-ink-secondary">
          {t.contact.form.phone}
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          placeholder={t.contact.form.phonePlaceholder}
          maxLength={20}
          className="w-full rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:border-brand-blue"
        />
        {errors.phone && <p className="mt-1 text-[12px] text-brand-red">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-[13px] font-medium text-ink-secondary">
          {t.contact.form.company}
        </label>
        <input
          id="company"
          type="text"
          value={values.company}
          onChange={handleChange("company")}
          placeholder={t.contact.form.companyPlaceholder}
          maxLength={120}
          className="w-full rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-[14px] text-ink-primary placeholder:text-ink-tertiary focus:border-brand-blue"
        />
        {errors.company && <p className="mt-1 text-[12px] text-brand-red">{errors.company}</p>}
      </div>

      <Button
        type="submit"
        variant="blue"
        className="w-full"
        isLoading={status === "submitting"}
        icon={<Send className="h-4 w-4" />}
      >
        {status === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
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
          {t.contact.form.error}
        </p>
      )}
    </form>
  );
}
