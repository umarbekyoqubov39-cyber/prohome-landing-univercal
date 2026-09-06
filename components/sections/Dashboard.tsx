"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getIcon } from "@/utils/icons";

const accentClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-brand-blue/15", text: "text-brand-blue" },
  green: { bg: "bg-brand-green/15", text: "text-brand-green" },
  purple: { bg: "bg-brand-purple/15", text: "text-brand-purple" },
  teal: { bg: "bg-brand-teal/15", text: "text-brand-teal" },
};

const barHeights = [45, 58, 50, 66, 72, 60, 78, 85, 74, 90, 80, 95];

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <section id="dashboard" className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <AnimatedSection>
          <SectionHeading title={t.dashboard.title} />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border-subtle bg-base-800/70 shadow-glow">
            <div className="flex items-center gap-2 border-b border-border-subtle bg-base-900/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-green/70" />
              <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 text-[12px] text-ink-tertiary">
                {t.dashboard.browserUrl}
              </span>
            </div>

            <div className="p-5 md:p-8">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {t.dashboard.metrics.map((metric) => {
                  const Icon = getIcon(metric.icon);
                  const accent = accentClasses[metric.accent];
                  return (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border-subtle bg-base-900/60 p-4"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent?.bg}`}>
                        <Icon className={`h-4 w-4 ${accent?.text}`} />
                      </div>
                      <p className="mt-3 text-[22px] font-extrabold text-ink-primary md:text-[26px]">
                        {metric.value}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[12px] text-ink-tertiary">{metric.label}</span>
                        <span className="text-[11px] font-semibold text-brand-green">
                          {metric.delta}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-border-subtle bg-base-900/60 p-5">
                <p className="text-[13px] font-semibold text-ink-secondary">
                  {t.dashboard.chartTitle}
                </p>
                <div className="mt-5 flex h-32 items-end gap-2">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-brand-greenDark to-brand-green"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {t.dashboard.facts.map((fact) => (
                  <li key={fact} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={180}>
          <div className="mx-auto mt-6 max-w-xl rounded-full border border-brand-blue/30 bg-brand-blue/10 px-6 py-3.5 text-center text-[13.5px] font-medium text-ink-primary">
            {t.dashboard.footer}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
