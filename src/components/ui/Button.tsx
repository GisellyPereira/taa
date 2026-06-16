import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius-md)] text-base font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white enabled:hover:bg-primary-hover",
  ghost: "bg-transparent text-text border border-border enabled:hover:bg-surface-2",
  danger: "bg-danger text-white",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
