"use client";

import { CheckCircle2, Info } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getIcon } from "@/utils/icons";

const badgeColors: Record<string, string> = {
  SALES: "bg-brand-green/15 text-brand-green",
  CRM: "bg-brand-blue/15 text-brand-blue",
  MARKETING: "bg-brand-purple/15 text-brand-purple",
};

export function Platform() {
  const { t } = useTranslation();

  return (
    <section id="solution" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <SectionHeading
            title={t.platform.title}
            subtitle={t.platform.subtitle}
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {t.platform.modules.map((mod, i) => {
            const Icon = getIcon(mod.icon);
            return (
              <AnimatedSection key={mod.title} delay={i * 100}>
                <div
                  className="h-full rounded-2xl border border-border-subtle bg-base-800/60 p-6 cursor-pointer transition-all hover:bg-base-800/80 hover:border-border-default"
                  onClick={() => mod.url && window.open(mod.url, "_blank")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                      <Icon className="h-5 w-5 text-ink-primary" />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${badgeColors[mod.badge] ?? "bg-white/10 text-ink-secondary"}`}
                    >
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-bold text-ink-primary">
                    {mod.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {mod.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-secondary"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={120}>
          <div className="mt-8 rounded-2xl border border-border-subtle bg-base-800/40 p-6 md:p-8">
            <div className="flex items-center gap-2.5">
              <Info className="h-5 w-5 text-brand-cyan" />
              <h3 className="text-[16px] font-bold text-ink-primary">
                {t.platform.process.title}
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.platform.process.steps.map((step, i) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[12px] font-bold text-ink-primary">
                    {i + 1}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-ink-secondary">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-brand-blue/25 bg-brand-blue/10 p-4">
              <p className="text-[13.5px] leading-relaxed text-ink-primary/90">
                {t.platform.process.result}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
