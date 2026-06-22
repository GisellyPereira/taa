import type { ButtonHTMLAttributes } from "react";

type Variant = "vinho" | "rosa" | "rosaSolido";

// Formato comum a todos os botões — muda só a cor (variant) e o conteúdo.
const base =
  "inline-flex cursor-pointer items-center justify-center rounded-md px-7 py-2.5 font-sans text-sm italic transition disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  vinho: "bg-[#6E1313] text-white enabled:hover:bg-[#561010]",
  rosa: "bg-rosa-200 text-primary enabled:hover:opacity-90",
  rosaSolido: "bg-rosa-200 text-white enabled:hover:bg-rosa-400",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "vinho",
  type = "button",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
