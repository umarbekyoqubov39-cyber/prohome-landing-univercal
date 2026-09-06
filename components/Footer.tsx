"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle py-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-5 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-brand-green to-brand-greenDark text-[13px] font-bold text-white">
            P
          </span>
          <span className="text-[14px] font-extrabold text-ink-primary">PRO HOME</span>
        </div>
        <p className="text-[13px] text-ink-tertiary">
          © {year} PRO HOME. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
