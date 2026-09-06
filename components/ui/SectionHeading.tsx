import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left ml-0",
        className
      )}
    >
      <h2 className="text-[28px] font-extrabold leading-tight text-ink-primary sm:text-[34px] md:text-[40px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
