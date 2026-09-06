"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function Audit() {
  const { t } = useTranslation();

  return (
    <section id="offer" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <h2 className="mx-auto max-w-3xl text-center text-[26px] font-extrabold leading-tight text-ink-primary sm:text-[32px] md:text-[38px]">
            {t.audit.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] text-ink-secondary">
            {t.audit.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {t.audit.points.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-border-subtle bg-base-800/60 px-4 py-3 text-center text-[13px] font-medium text-ink-secondary"
              >
                {point}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-brand-green/25 bg-gradient-to-br from-brand-green/[0.08] to-brand-blue/[0.06] p-6 md:p-8">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {t.audit.included.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-primary/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-teal/25 bg-brand-teal/[0.08] p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
            <p className="text-[13.5px] leading-relaxed text-ink-primary/90">
              {t.audit.guarantee}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300} className="mt-10 flex justify-center">
          <Button variant="green" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            {t.audit.cta}
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
