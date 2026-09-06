"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/utils/cn";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /** Millisekundlarda kechikish — bir nechta element ketma-ket paydo bo'lishi uchun. */
  delay?: number;
}

/**
 * Bola elementlarni ekranga kirganda pastdan yuqoriga suzib chiqadigan
 * animatsiya bilan ko'rsatadi. IntersectionObserver asosida ishlaydi,
 * shuning uchun scroll performansiga ta'sir qilmaydi.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isInView && "opacity-100 translate-y-0",
        className
      )}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
