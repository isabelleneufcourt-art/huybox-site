import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "call";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:brightness-95",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
  call: "bg-secondary text-white hover:brightness-95 shadow-lg shadow-secondary/30",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ClickButtonProps extends CommonProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button(props: LinkButtonProps | ClickButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (props.href) {
    const isExternal = props.href.startsWith("http") || props.href.startsWith("tel:") || props.href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={props.href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
