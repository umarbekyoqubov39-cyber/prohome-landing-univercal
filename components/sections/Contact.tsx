"use client";

import {
  MapPin,
  Phone,
  Send,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/ContactForm";

const PHONE_NUMBERS = ["+998 90 008 60 70", "+998 27 771 65 51"];
const MAP_QUERY = "Farg'ona, Tadbirkorlar ko'chasi 167";

// Ijtimoiy tarmoq havolalari. O'zingizning haqiqiy akkauntlaringiz
// bilan almashtiring — struktura va ikonlarga tegish shart emas.
const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/prohome.uzb",
    icon: Instagram,
  },
  { name: "Telegram", href: "https://t.me/prohome_uz", icon: Send },
  {
    name: "Facebook",
    href: "https://www.facebook.com/zamonagency",
    icon: Facebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@prohomeuz",
    icon: Youtube,
  },
];

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <div className="rounded-3xl border border-border-subtle bg-base-800/50 p-6 md:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {PHONE_NUMBERS.map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-[16px] font-bold text-ink-primary hover:text-brand-green"
                  >
                    <Phone className="h-4 w-4 text-brand-green" />
                    {num}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white/[0.04] text-ink-secondary transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-2.5 text-[14px] text-ink-secondary">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <span>{t.contact.address}</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border-subtle">
                  <iframe
                    title="PRO HOME — manzil"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`}
                    className="h-64 w-full grayscale invert-[0.92] contrast-[1.05] md:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-border-subtle bg-base-900/50 p-6">
                <span className="text-[11px] font-bold tracking-wide text-ink-tertiary">
                  {t.contact.brand}
                </span>
                <h3 className="mt-1 text-[20px] font-extrabold text-ink-primary">
                  {t.contact.title}
                </h3>
                <div className="mt-5">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
