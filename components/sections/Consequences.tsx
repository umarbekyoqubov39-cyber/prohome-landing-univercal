"use client";

import { AlertTriangle, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Consequences() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <SectionHeading title={t.consequences.title} />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatedSection>
            <div className="h-full rounded-2xl border border-border-subtle bg-base-800/60 p-6 md:p-7">
              <div className="flex items-center gap-2.5">
                <XCircle className="h-5 w-5 text-brand-red" />
                <h3 className="text-[17px] font-bold text-ink-primary">
                  {t.consequences.problemCard.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {t.consequences.problemCard.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="h-full rounded-2xl border border-border-subtle bg-base-800/60 p-6 md:p-7">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-brand-amber" />
                <h3 className="text-[17px] font-bold text-ink-primary">
                  {t.consequences.consequenceCard.title}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {t.consequences.consequenceCard.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={180}>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-amber/30 bg-brand-amber/10 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" />
            <p className="text-[14px] leading-relaxed text-ink-primary/90">
              {t.consequences.warning}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
