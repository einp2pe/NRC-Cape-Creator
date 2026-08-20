import { CheckIcon } from "@/icons/CheckIcon";

import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export const Checkbox = ({ checked, onChange, label }: CheckboxProps) => (
  <label className={styles.wrapper}>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span className={styles.box} aria-hidden="true">
      <CheckIcon width={11} height={11} />
    </span>
    <span className={styles.label}>{label}</span>
  </label>
);
