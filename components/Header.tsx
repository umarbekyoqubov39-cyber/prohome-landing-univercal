"use client";

import { useEffect, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { locales, localeLabels } from "@/lib/i18n/index";
import type { Locale } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const sectionIds = [
  "home",
  "problems",
  "solution",
  "dashboard",
  "trust",
  "offer",
] as const;

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "problems", label: t.nav.problems },
    { id: "solution", label: t.nav.solution },
    { id: "dashboard", label: t.nav.dashboard },
    { id: "trust", label: t.nav.trust },
    { id: "offer", label: t.nav.offer },
  ];

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocaleChange = (next: Locale) => {
    setLocale(next);
    setIsLangOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled
          ? "border-border-subtle bg-base-950/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2.5"
          aria-label="PRO HOME — bosh sahifa"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-brand-green to-brand-greenDark text-sm font-bold text-white">
            P
          </span>
          <span className="text-[15px] font-extrabold tracking-tight text-ink-primary">
            PRO HOME
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "text-[14px] font-medium text-ink-secondary transition-colors hover:text-ink-primary",
                item.id === "home" && "text-brand-blue hover:text-brand-blue"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border-medium bg-white/[0.03] px-3 py-1.5 text-[13px] font-semibold text-ink-primary transition-colors hover:bg-white/[0.07]"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
            >
              <Globe className="h-3.5 w-3.5" />
              {localeLabels[locale]}
            </button>
            {isLangOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-2 w-24 overflow-hidden rounded-xl border border-border-medium bg-base-800 shadow-glow"
              >
                {locales.map((code) => (
                  <li key={code}>
                    <button
                      onClick={() => handleLocaleChange(code)}
                      role="option"
                      aria-selected={locale === code}
                      className={cn(
                        "block w-full px-3.5 py-2 text-left text-[13px] font-medium text-ink-secondary transition-colors hover:bg-white/[0.06] hover:text-ink-primary",
                        locale === code && "text-brand-blue"
                      )}
                    >
                      {localeLabels[code]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            variant="blue"
            size="md"
            className="hidden sm:inline-flex"
            onClick={() => handleNavClick("contact")}
          >
            {t.nav.cta}
          </Button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-medium lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Menyu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border-subtle bg-base-950 px-5 pb-5 lg:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="rounded-lg px-3 py-2.5 text-left text-[14px] font-medium text-ink-secondary hover:bg-white/[0.05] hover:text-ink-primary"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2">
            {locales.map((code) => (
              <button
                key={code}
                onClick={() => handleLocaleChange(code)}
                className={cn(
                  "rounded-full border border-border-medium px-3 py-1.5 text-[12px] font-semibold",
                  locale === code
                    ? "border-brand-blue text-brand-blue"
                    : "text-ink-secondary"
                )}
              >
                {localeLabels[code]}
              </button>
            ))}
          </div>
          <Button
            variant="blue"
            className="mt-4 w-full"
            onClick={() => handleNavClick("contact")}
          >
            {t.nav.cta}
          </Button>
        </div>
      )}
    </header>
  );
}
