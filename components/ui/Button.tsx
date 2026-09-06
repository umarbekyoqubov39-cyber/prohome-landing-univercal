import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "green" | "blue" | "outline";
  size?: "md" | "lg";
  icon?: ReactNode;
  isLoading?: boolean;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  green:
    "bg-gradient-to-b from-brand-green to-brand-greenDark text-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.55)] hover:brightness-110",
  blue: "bg-gradient-to-b from-brand-blue to-brand-blueDark text-white shadow-[0_8px_24px_-8px_rgba(59,130,246,0.55)] hover:brightness-110",
  outline:
    "bg-white/[0.04] text-ink-primary border border-border-medium hover:bg-white/[0.08]",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export function Button({
  variant = "green",
  size = "md",
  icon,
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}
