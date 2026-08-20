import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./SegmentedControl.module.scss";

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export const SegmentedControl = <T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) => (
  <div className={styles.field}>
    <span className={styles.label} id={`${label}-label`}>
      {label}
    </span>
    <div
      className={styles.track}
      role="group"
      aria-labelledby={`${label}-label`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            styles.segment,
            option.value === value && styles.active
          )}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
