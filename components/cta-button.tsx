import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: Size;
  variant?: Variant;
};

type LinkButtonProps = SharedProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type NativeButtonProps = SharedProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function getClassNames(variant: Variant, size: Size, className?: string) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fim-orange disabled:cursor-not-allowed disabled:opacity-60";

  const sizeClasses =
    size === "lg" ? "min-h-14 px-6 text-base sm:px-7" : "min-h-11 px-5 text-sm";

  const variantClasses =
    {
      primary:
        "bg-fim-orange text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:bg-[#ff7d46]",
      secondary:
        "border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20",
      ghost:
        "border border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-slate-950 hover:bg-slate-950 hover:text-white",
      light:
        "border border-white/20 bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-fim-sand",
    }[variant] ?? "";

  return [baseClasses, sizeClasses, variantClasses, className].filter(Boolean).join(" ");
}

export function CTAButton(props: LinkButtonProps | NativeButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = getClassNames(variant, size, props.className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={className}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
