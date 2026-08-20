import { useCallback, useEffect, useRef, useState } from "react";

import { CapePreview3D } from "@/components/CapePreview3D/CapePreview3D";
import { GradientPanel } from "@/components/GradientPanel/GradientPanel";
import { ImagePanel } from "@/components/ImagePanel/ImagePanel";
import { StorageNotice } from "@/components/StorageNotice/StorageNotice";
import { TemplateGallery } from "@/components/TemplateGallery/TemplateGallery";
import type { CapeTemplate } from "@/data/templates";
import { useCapeState, type TemplateScope } from "@/hooks/useCapeState";
import { CanvasRenderer } from "@/utils/CanvasRenderer";

import styles from "./App.module.scss";

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 256;

const isPixelArt = (image: HTMLImageElement | null) => {
  if (!image) return true;

  const source = image.currentSrc || image.src || "";
  if (source.startsWith("data:image/svg+xml") || source.endsWith(".svg")) {
    return false;
  }

  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) return true;

  return width <= 256 && height <= 256;
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRef(new CanvasRenderer()).current;

  const [capeTexture, setCapeTexture] = useState<string | null>(null);
  const [templateScope, setTemplateScope] = useState<TemplateScope | null>(
    null
  );
  const [templateReady, setTemplateReady] = useState(renderer.isTemplateReady);

  const {
    images,
    setImage,
    gradientColors,
    setGradientColors,
    gradDirection,
    setGradDirection,
    separateElytraGradient,
    setSeparateElytraGradient,
    elytraGradientColors,
    setElytraGradientColors,
    elytraGradDirection,
    setElytraGradDirection,
    reset,
    loadTemplate,
  } = useCapeState();

  useEffect(
    () => renderer.onTemplateReady(() => setTemplateReady(true)),
    [renderer]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderer.drawCape(canvas, {
      images,
      gradientColors,
      gradDirection,
      separateElytraGradient,
      elytraGradientColors,
      elytraGradDirection,
    });

    setCapeTexture(canvas.toDataURL("image/png"));
  }, [
    renderer,
    templateReady,
    images,
    gradientColors,
    gradDirection,
    separateElytraGradient,
    elytraGradientColors,
    elytraGradDirection,
  ]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "custom_cape.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleSelectTemplate = useCallback(
    (template: CapeTemplate, scope: TemplateScope) => {
      loadTemplate(template, scope);
      setTemplateScope(null);
    },
    [loadTemplate]
  );

  const pixelated = Object.values(images).every(isPixelArt);

  return (
    <div className={styles.app}>
      {templateScope && (
        <TemplateGallery
          scope={templateScope}
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setTemplateScope(null)}
        />
      )}

      <header className={styles.header}>
        <h1 className={styles.title}>
          <img
            className={styles.logo}
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="NRC Cape Creator"
          />
        </h1>
      </header>

      <main className={styles.main}>
        <StorageNotice />

        <div className={styles.row}>
          <figure className={styles.texture}>
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{ imageRendering: pixelated ? "pixelated" : "auto" }}
              aria-label="Cape texture"
            />
            <figcaption className={styles.textureLabel}>
              Texture layout
            </figcaption>
          </figure>

          <CapePreview3D capeTexture={capeTexture} />
        </div>

        <div className={styles.row}>
          <GradientPanel
            gradientColors={gradientColors}
            gradDirection={gradDirection}
            onGradientColorsChange={setGradientColors}
            onGradDirectionChange={setGradDirection}
            separateElytraGradient={separateElytraGradient}
            onSeparateElytraGradientChange={(separate) => {
              setSeparateElytraGradient(separate);
              if (separate && elytraGradientColors === null) {
                setElytraGradientColors([...gradientColors]);
              }
            }}
            elytraGradientColors={elytraGradientColors}
            onElytraGradientColorsChange={setElytraGradientColors}
            elytraGradDirection={elytraGradDirection}
            onElytraGradDirectionChange={setElytraGradDirection}
            onBrowseTemplates={setTemplateScope}
          />

          <ImagePanel
            images={images}
            onImageChange={setImage}
            onDownload={handleDownload}
            onReset={reset}
            onShowTemplates={() => setTemplateScope("both")}
          />
        </div>
      </main>
    </div>
  );
}
