import { useRef, useState } from "react";

import { GhostButton } from "@/components/GhostButton/GhostButton";
import { ImageCropper } from "@/components/ImageCropper/ImageCropper";
import { CapeBackIcon } from "@/icons/CapeBackIcon";
import { CapeFrontIcon } from "@/icons/CapeFrontIcon";
import { CloseIcon } from "@/icons/CloseIcon";
import { DownloadIcon } from "@/icons/DownloadIcon";
import { ElytraIcon } from "@/icons/ElytraIcon";
import { ResetIcon } from "@/icons/ResetIcon";
import { TemplatesIcon } from "@/icons/TemplatesIcon";
import { cn } from "@/lib/utils";

import styles from "./ImagePanel.module.scss";

export type ImageZone = "front" | "back" | "elytra";

const ZONES: { id: ImageZone; label: string; icon: React.ReactNode }[] = [
  { id: "front", label: "Front", icon: <CapeFrontIcon /> },
  { id: "back", label: "Back", icon: <CapeBackIcon /> },
  { id: "elytra", label: "Elytra", icon: <ElytraIcon /> },
];

type ImagePanelProps = {
  images: Record<ImageZone, HTMLImageElement | null>;
  onImageChange: (zone: ImageZone, image: HTMLImageElement | null) => void;
  onDownload: () => void;
  onReset: () => void;
  onShowTemplates: () => void;
};

type CropperState = { imageUrl: string; zone: ImageZone } | null;

export const ImagePanel = ({
  images,
  onImageChange,
  onDownload,
  onReset,
  onShowTemplates,
}: ImagePanelProps) => {
  const [cropper, setCropper] = useState<CropperState>(null);
  const inputRefs = useRef<Partial<Record<ImageZone, HTMLInputElement | null>>>(
    {}
  );

  const clearInput = (zone: ImageZone) => {
    const input = inputRefs.current[zone];
    if (input) input.value = "";
  };

  const handleFile = (zone: ImageZone, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCropper({ imageUrl: event.target?.result as string, zone });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (zone: ImageZone) => {
    clearInput(zone);
    onImageChange(zone, null);
  };

  const handleResetAll = () => {
    ZONES.forEach((zone) => clearInput(zone.id));
    onReset();
  };

  const handleCropComplete = (image: HTMLImageElement) => {
    if (cropper) onImageChange(cropper.zone, image);
    setCropper(null);
  };

  const handleCropCancel = () => {
    if (cropper) clearInput(cropper.zone);
    setCropper(null);
  };

  return (
    <aside className={styles.panel} aria-label="Images and actions">
      {cropper && (
        <ImageCropper
          imageUrl={cropper.imageUrl}
          label={ZONES.find((zone) => zone.id === cropper.zone)?.label ?? ""}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      <section className={styles.section}>
        <h2 className={styles.title}>Images</h2>
        <div className={styles.grid}>
          {ZONES.map((zone) => {
            const hasImage = images[zone.id] !== null;
            return (
              <div key={zone.id} className={styles.slotWrapper}>
                <label
                  className={cn(styles.slot, hasImage && styles.slotFilled)}
                  htmlFor={`${zone.id}-input`}
                >
                  <span className={styles.slotIcon}>{zone.icon}</span>
                  <span className={styles.slotLabel}>{zone.label}</span>
                  <input
                    ref={(element) => {
                      inputRefs.current[zone.id] = element;
                    }}
                    id={`${zone.id}-input`}
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleFile(zone.id, event.target.files?.[0])
                    }
                  />
                </label>
                {hasImage && (
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => handleRemove(zone.id)}
                    aria-label={`Remove ${zone.label.toLowerCase()} image`}
                  >
                    <CloseIcon width={11} height={11} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Presets</h2>
        <GhostButton block onClick={onShowTemplates}>
          <TemplatesIcon />
          Browse templates
        </GhostButton>
      </section>

      <div className={styles.actions}>
        <GhostButton variant="purple" onClick={onDownload}>
          <DownloadIcon />
          Download
        </GhostButton>
        <GhostButton onClick={handleResetAll}>
          <ResetIcon />
          Reset
        </GhostButton>
      </div>
    </aside>
  );
};
