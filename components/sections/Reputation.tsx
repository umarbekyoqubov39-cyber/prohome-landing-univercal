"use client";

import { Minus, Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Reputation() {
  const { t } = useTranslation();

  return (
    <section id="trust" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <SectionHeading title={t.reputation.title} />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatedSection>
            <div className="h-full rounded-2xl border border-border-subtle bg-base-800/60 p-6 md:p-7">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink-primary">
                <Minus className="h-4 w-4 text-brand-red" />
                {t.reputation.without.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {t.reputation.without.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="h-full rounded-2xl border border-brand-green/25 bg-brand-green/[0.06] p-6 md:p-7">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink-primary">
                <Plus className="h-4 w-4 text-brand-green" />
                {t.reputation.with.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {t.reputation.with.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
