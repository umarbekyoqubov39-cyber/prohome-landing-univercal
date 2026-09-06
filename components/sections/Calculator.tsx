"use client";

import { Calculator as CalculatorIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function Calculator() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <h2 className="mx-auto max-w-2xl text-center text-[26px] font-extrabold leading-tight text-ink-primary sm:text-[32px] md:text-[38px]">
            {t.calculator.title}
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border-subtle bg-base-800/60 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <CalculatorIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" />
              <p className="text-[14px] leading-relaxed text-ink-secondary">
                {t.calculator.example}
              </p>
            </div>

            <ul className="mt-5 space-y-3 border-t border-border-subtle pt-5">
              <li className="flex gap-3 text-[15px] font-medium text-ink-primary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                {t.calculator.point1}
              </li>
              <li className="flex gap-3 text-[15px] font-medium text-ink-primary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                {t.calculator.point2}
              </li>
            </ul>

            <div className="mt-6 flex flex-col items-center gap-4 border-t border-border-subtle pt-6 text-center">
              <p className="text-[15px] font-semibold text-ink-primary">
                {t.calculator.question}
              </p>
              <Button
                variant="green"
                onClick={() =>
                  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.calculator.cta}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
