import Link from "next/link";
import type { ComponentProps } from "react";
import { dsPrimaryButton, dsSecondaryButton } from "@/lib/ds-theme";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: dsPrimaryButton,
  secondary: dsSecondaryButton,
  ghost: "text-ds-muted hover:bg-ds-hover hover:text-ds-text",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
};

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
