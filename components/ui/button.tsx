import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "sm" | "default" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:bg-primary/90 border-transparent",
  outline:
    "border border-neutral-200 bg-transparent text-foreground hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900",
  secondary:
    "bg-neutral-100 text-foreground hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800",
  ghost:
    "bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-900",
  link: "bg-transparent text-primary underline-offset-4 hover:underline border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 border-2 border-transparent rounded-none font-medium transition-all duration-200 magnetic-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild && "href" in props) {
    const { href, children, ...anchorProps } =
      props as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        children?: ReactNode;
      };
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
