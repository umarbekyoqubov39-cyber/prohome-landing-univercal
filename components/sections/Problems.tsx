"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/utils/icons";

export function Problems() {
  const { t } = useTranslation();

  return (
    <section id="problems" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <SectionHeading title={t.problems.title} subtitle={t.problems.subtitle} />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.problems.cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <AnimatedSection key={card.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border-subtle bg-base-800/60 p-6 transition-colors hover:border-border-medium">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                    <Icon className="h-5 w-5 text-brand-red" />
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-ink-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-secondary">
                    {card.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}

          <AnimatedSection delay={t.problems.cards.length * 60}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-brand-blue/30 bg-gradient-to-br from-brand-blue/20 to-brand-blueDark/10 p-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-primary">
                  {t.problems.solutionCard.brand}
                </span>
                <h3 className="mt-4 text-[17px] font-bold leading-snug text-ink-primary">
                  {t.problems.solutionCard.title}
                </h3>
              </div>
              <Button
                variant="blue"
                size="md"
                className="mt-6 w-full"
                onClick={() =>
                  document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.problems.solutionCard.cta}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
