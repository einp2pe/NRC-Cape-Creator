import { useCallback, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { GhostButton } from "@/components/GhostButton/GhostButton";
import { cn } from "@/lib/utils";

import styles from "./ImageCropper.module.scss";

const CAPE_ASPECT = 80 / 128;

type Rect = { x: number; y: number; width: number; height: number };
type Point = { x: number; y: number };

type ImageCropperProps = {
  imageUrl: string;
  label: string;
  onCropComplete: (image: HTMLImageElement) => void;
  onCancel: () => void;
};

export const ImageCropper = ({
  imageUrl,
  label,
  onCropComplete,
  onCancel,
}: ImageCropperProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragOffset = useRef<Point | null>(null);

  const [aspectLocked, setAspectLocked] = useState(true);
  const [aspectBox, setAspectBox] = useState<Rect | null>(null);
  const [scalePercent, setScalePercent] = useState(60);
  const [freeStart, setFreeStart] = useState<Point | null>(null);
  const [freeEnd, setFreeEnd] = useState<Point | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDraggingBox, setIsDraggingBox] = useState(false);

  const boxForScale = useCallback(
    (
      canvas: HTMLCanvasElement,
      percent: number,
      previous: Rect | null
    ): Rect => {
      const maxWidth = Math.min(canvas.width, canvas.height * CAPE_ASPECT);
      const minWidth = Math.max(10, maxWidth * 0.05);
      const width = minWidth + (maxWidth - minWidth) * (percent / 100);
      const height = width / CAPE_ASPECT;

      const centerX = previous
        ? previous.x + previous.width / 2
        : canvas.width / 2;
      const centerY = previous
        ? previous.y + previous.height / 2
        : canvas.height / 2;

      return {
        x: Math.max(0, Math.min(centerX - width / 2, canvas.width - width)),
        y: Math.max(0, Math.min(centerY - height / 2, canvas.height - height)),
        width,
        height,
      };
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;
      imageRef.current = image;

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      canvas.getContext("2d")?.drawImage(image, 0, 0);

      setAspectBox(boxForScale(canvas, 60, null));
    };

    image.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl, boxForScale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  const selection = ((): Rect | null => {
    if (aspectLocked) return aspectBox;
    if (!freeStart || !freeEnd) return null;
    return {
      x: Math.min(freeStart.x, freeEnd.x),
      y: Math.min(freeStart.y, freeEnd.y),
      width: Math.abs(freeEnd.x - freeStart.x),
      height: Math.abs(freeEnd.y - freeStart.y),
    };
  })();

  const toCanvasPoint = (
    event: React.PointerEvent<HTMLCanvasElement>
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = toCanvasPoint(event);
    if (!point) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    if (aspectLocked) {
      if (!aspectBox) return;
      const inside =
        point.x >= aspectBox.x &&
        point.x <= aspectBox.x + aspectBox.width &&
        point.y >= aspectBox.y &&
        point.y <= aspectBox.y + aspectBox.height;

      if (!inside) return;
      setIsDraggingBox(true);
      dragOffset.current = {
        x: point.x - aspectBox.x,
        y: point.y - aspectBox.y,
      };
      return;
    }

    setFreeStart(point);
    setFreeEnd(point);
    setIsDrawing(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const point = toCanvasPoint(event);
    if (!canvas || !point) return;

    if (isDraggingBox && aspectBox && dragOffset.current) {
      setAspectBox({
        ...aspectBox,
        x: clamp(
          point.x - dragOffset.current.x,
          0,
          canvas.width - aspectBox.width
        ),
        y: clamp(
          point.y - dragOffset.current.y,
          0,
          canvas.height - aspectBox.height
        ),
      });
      return;
    }

    if (isDrawing) setFreeEnd(point);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setIsDraggingBox(false);
    dragOffset.current = null;
  };

  const handleScaleChange = (percent: number) => {
    setScalePercent(percent);
    const canvas = canvasRef.current;
    if (canvas) setAspectBox(boxForScale(canvas, percent, aspectBox));
  };

  const handleToggleAspect = () => {
    const canvas = canvasRef.current;
    if (!aspectLocked && canvas) {
      setAspectBox(boxForScale(canvas, scalePercent, aspectBox));
    }
    setAspectLocked(!aspectLocked);
  };

  const handleCrop = () => {
    const image = imageRef.current;
    if (!image || !selection || selection.width < 1 || selection.height < 1)
      return;

    const width = Math.max(1, Math.round(selection.width));
    const height = Math.max(1, Math.round(selection.height));

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = width;
    cropCanvas.height = height;

    const ctx = cropCanvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      image,
      Math.max(0, selection.x),
      Math.max(0, selection.y),
      width,
      height,
      0,
      0,
      width,
      height
    );

    const cropped = new Image();
    cropped.onload = () => onCropComplete(cropped);
    cropped.src = cropCanvas.toDataURL();
  };

  const canvas = canvasRef.current;
  const overlayStyle =
    canvas && selection && selection.width > 0 && selection.height > 0
      ? {
          left: `${(selection.x / canvas.width) * 100}%`,
          top: `${(selection.y / canvas.height) * 100}%`,
          width: `${(selection.width / canvas.width) * 100}%`,
          height: `${(selection.height / canvas.height) * 100}%`,
        }
      : undefined;

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cropper-title"
      >
        <header className={styles.header}>
          <h2 className={styles.title} id="cropper-title">
            Crop {label.toLowerCase()}
          </h2>
          <p className={styles.subtitle}>
            {aspectLocked
              ? "Drag the frame to position it. The cape ratio stays locked."
              : "Drag anywhere on the image to draw a free selection."}
          </p>
        </header>

        <div className={styles.stage}>
          <canvas
            ref={canvasRef}
            className={cn(styles.canvas, isDraggingBox && styles.grabbing)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
          {overlayStyle && (
            <div className={styles.selection} style={overlayStyle} />
          )}
        </div>

        <div className={styles.controls}>
          <GhostButton
            variant={aspectLocked ? "purple" : "gray"}
            size="sm"
            onClick={handleToggleAspect}
            aria-pressed={aspectLocked}
          >
            Lock cape ratio
          </GhostButton>

          {aspectLocked && (
            <label className={styles.scale}>
              <span className={styles.scaleLabel}>Size</span>
              <input
                type="range"
                className={styles.range}
                min={1}
                max={100}
                step={1}
                value={scalePercent}
                onChange={(event) =>
                  handleScaleChange(Number(event.currentTarget.value))
                }
              />
              <span className={styles.scaleValue}>{scalePercent}%</span>
            </label>
          )}
        </div>

        <footer className={styles.footer}>
          <GhostButton onClick={onCancel}>Cancel</GhostButton>
          <GhostButton
            onClick={() => imageRef.current && onCropComplete(imageRef.current)}
          >
            Use full image
          </GhostButton>
          <GhostButton
            variant="purple"
            onClick={handleCrop}
            disabled={!selection}
          >
            Crop
          </GhostButton>
        </footer>
      </div>
    </div>,
    document.body
  );
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
