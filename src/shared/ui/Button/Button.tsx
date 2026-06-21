import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`} {...rest}>
      {rest.children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
    </Link>
  );
}
