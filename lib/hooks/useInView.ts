"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** true bo'lsa, elementga bir marta kirgandan so'ng kuzatuv to'xtatiladi. */
  once?: boolean;
}

/**
 * Element ekranga kirganda true qaytaradigan yengil IntersectionObserver hook.
 * Scroll-reveal animatsiyalari uchun ishlatiladi.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -80px 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion afzal ko'rilganda darhol ko'rsatamiz.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
