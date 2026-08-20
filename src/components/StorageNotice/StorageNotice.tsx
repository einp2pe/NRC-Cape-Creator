import { useState } from "react";

import { GhostButton } from "@/components/GhostButton/GhostButton";

import styles from "./StorageNotice.module.scss";

const DISMISSED_KEY = "nrc-cape-creator-storage-notice-dismissed";

const readDismissed = () => {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "dismissed";
  } catch {
    return true;
  }
};

export const StorageNotice = () => {
  const [dismissed, setDismissed] = useState(readDismissed);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "dismissed");
    } catch {}
  };

  return (
    <div className={styles.notice} role="status">
      <p className={styles.text}>
        Your cape and skin stay in this browser. Nothing is uploaded and no
        analytics cookies are set.
      </p>
      <GhostButton size="sm" onClick={dismiss}>
        Got it
      </GhostButton>
    </div>
  );
};
