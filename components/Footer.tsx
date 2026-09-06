"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle py-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-5 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2.5">
          <Image
            src="/images/Logo.jpg"
            alt="PRO HOME Logo"
            width={60}
            height={20}
            className="h-auto w-auto"
          />
          <span className="text-[14px] font-extrabold text-ink-primary">
            PRO HOME
          </span>
        </div>
        <p className="text-[13px] text-ink-tertiary">
          © {year} PRO HOME. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
