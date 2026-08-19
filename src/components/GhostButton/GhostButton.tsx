import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./GhostButton.module.scss";

type GhostButtonProps = {
  variant?: "gray" | "purple";
  size?: "sm" | "md";
  block?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const GhostButton = ({
  variant = "gray",
  size = "md",
  block = false,
  children,
  className,
  type = "button",
  ...rest
}: GhostButtonProps) => (
  <button
    type={type}
    className={cn(
      styles.btn,
      variant === "purple" ? styles.purple : styles.gray,
      size === "sm" && styles.sm,
      block && styles.block,
      className
    )}
    {...rest}
  >
    {children}
  </button>
);
