"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const IMAGE_COUNT = 6;

const galleryItems = [
  {
    src: "/images/building-1.jpg",
    objectPosition: "center",
    flex: "0 0 17%",
    minWidth: "170px",
  },
  {
    src: "/images/building-2.jpg",
    objectPosition: "center center",
    flex: "0 0 14%",
    minWidth: "150px",
  },
  {
    src: "/images/building-3.jpg",
    objectPosition: "center",
    flex: "0 0 18%",
    minWidth: "180px",
  },
  {
    src: "/images/building-4.jpg",
    objectPosition: "center",
    flex: "0 0 20%",
    minWidth: "195px",
  },
  {
    src: "/images/building-5.jpg",
    objectPosition: "center",
    flex: "0 0 15%",
    minWidth: "160px",
  },
  {
    src: "/images/building-6.jpg",
    objectPosition: "center",
    flex: "0 0 16%",
    minWidth: "170px",
  },
] as const;

export function Hero() {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [titleLine1, titleLine2] = t.hero.title.split("\n");

  useEffect(() => {
    const galleryCards = galleryRef.current?.querySelectorAll(".gallery-card");

    if (!galleryCards || galleryCards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    galleryCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-grid pb-16 pt-16 md:pb-24 md:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-brand-blue/25 blur-[90px] md:h-96 md:w-96" />
        <div className="absolute -top-10 right-[10%] h-64 w-64 rounded-full bg-brand-green/20 blur-[100px] md:h-[26rem] md:w-[26rem]" />
        <div className="absolute top-[38%] left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-[110px] md:h-72 md:w-72" />

        <div className="absolute left-1/2 top-[46%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] md:h-[620px] md:w-[620px]" />
        <div className="absolute left-1/2 top-[46%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] md:h-[440px] md:w-[440px]" />
      </div>

      <div className="relative mx-auto max-w-content px-5 text-center md:px-8">
        <AnimatedSection>
          <span className="inline-flex items-center rounded-full border border-border-medium bg-white/[0.04] px-4 py-1.5 text-[13px] font-semibold text-brand-teal">
            {t.hero.eyebrow}
          </span>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <h1 className="mx-auto mt-6 max-w-3xl text-[30px] font-extrabold leading-[1.15] text-ink-primary sm:text-[40px] md:text-[52px]">
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-secondary md:text-lg">
            {t.hero.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <Button
            variant="green"
            size="lg"
            className="mt-8"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() =>
              document
                .getElementById("offer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t.hero.cta}
          </Button>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={320} className="relative mt-14">
        <div
          ref={galleryRef}
          className="mx-auto flex w-full max-w-[1400px] items-end gap-3 overflow-x-auto px-[30px] pb-2 sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-card relative h-[250px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#111827] shadow-[0_20px_45px_rgba(2,6,23,0.5)] sm:h-[300px] md:h-[340px] lg:h-[360px]"
              style={{
                flex: item.flex,
                minWidth: item.minWidth,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt="Qurilish loyihasi"
                className="gallery-image h-full w-full object-cover object-center"
                style={{ objectPosition: item.objectPosition }}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
