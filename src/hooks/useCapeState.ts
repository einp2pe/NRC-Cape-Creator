import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { CapeTemplate, GradientDirection } from "@/data/templates";
import {
  clearStoredImages,
  readStoredImages,
  writeStoredImages,
} from "@/utils/imageStore";

const SETTINGS_KEY = "nrc-cape-creator-state";

export type ImageZone = "front" | "back" | "elytra";
export type TemplateScope = "both" | "elytra" | "main";

export type CapeImages = Record<ImageZone, HTMLImageElement | null>;

const EMPTY_IMAGES: CapeImages = { front: null, back: null, elytra: null };
const ZONES: ImageZone[] = ["front", "back", "elytra"];

type PersistedSettings = {
  gradientColors: string[];
  gradDirection: GradientDirection;
  separateElytraGradient: boolean;
  elytraGradientColors: string[] | null;
  elytraGradDirection: GradientDirection;
};

const DEFAULT_SETTINGS: PersistedSettings = {
  gradientColors: ["#ffffff"],
  gradDirection: "vertical",
  separateElytraGradient: false,
  elytraGradientColors: null,
  elytraGradDirection: "vertical",
};

const asDirection = (value: unknown): GradientDirection =>
  value === "horizontal" ? "horizontal" : "vertical";

const asColors = (value: unknown): string[] | null => {
  if (!Array.isArray(value)) return null;
  const colors = value.filter(
    (item): item is string => typeof item === "string"
  );
  return colors.length > 0 ? colors : null;
};

function readPersistedSettings(): PersistedSettings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      gradientColors:
        asColors(parsed.gradientColors) ?? DEFAULT_SETTINGS.gradientColors,
      gradDirection: asDirection(parsed.gradDirection),
      separateElytraGradient: Boolean(parsed.separateElytraGradient),
      elytraGradientColors: asColors(parsed.elytraGradientColors),
      elytraGradDirection: asDirection(parsed.elytraGradDirection),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export function useCapeState() {
  const initialSettings = useMemo(readPersistedSettings, []);

  const [images, setImages] = useState<CapeImages>(EMPTY_IMAGES);
  const [gradientColors, setGradientColors] = useState(
    initialSettings.gradientColors
  );
  const [gradDirection, setGradDirection] = useState(
    initialSettings.gradDirection
  );
  const [separateElytraGradient, setSeparateElytraGradient] = useState(
    initialSettings.separateElytraGradient
  );
  const [elytraGradientColors, setElytraGradientColors] = useState(
    initialSettings.elytraGradientColors
  );
  const [elytraGradDirection, setElytraGradDirection] = useState(
    initialSettings.elytraGradDirection
  );

  const imagesRestored = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      const stored = await readStoredImages();
      const entries = await Promise.all(
        ZONES.map(async (zone) => {
          const src = stored[zone];
          return [zone, src ? await loadImage(src) : null] as const;
        })
      );

      if (cancelled) return;
      setImages(Object.fromEntries(entries) as CapeImages);
      imagesRestored.current = true;
    };

    void restore();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!imagesRestored.current) return;

    const sources: Record<string, string> = {};
    ZONES.forEach((zone) => {
      const src = images[zone]?.src;
      if (src) sources[zone] = src;
    });

    void writeStoredImages(sources);
  }, [images]);

  useEffect(() => {
    const payload: PersistedSettings = {
      gradientColors,
      gradDirection,
      separateElytraGradient,
      elytraGradientColors,
      elytraGradDirection,
    };

    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    gradientColors,
    gradDirection,
    separateElytraGradient,
    elytraGradientColors,
    elytraGradDirection,
  ]);

  const setImage = useCallback(
    (zone: ImageZone, image: HTMLImageElement | null) => {
      setImages((current) => ({ ...current, [zone]: image }));
    },
    []
  );

  const reset = useCallback(() => {
    setImages(EMPTY_IMAGES);
    setGradientColors(DEFAULT_SETTINGS.gradientColors);
    setGradDirection(DEFAULT_SETTINGS.gradDirection);
    setSeparateElytraGradient(DEFAULT_SETTINGS.separateElytraGradient);
    setElytraGradientColors(DEFAULT_SETTINGS.elytraGradientColors);
    setElytraGradDirection(DEFAULT_SETTINGS.elytraGradDirection);

    try {
      window.localStorage.removeItem(SETTINGS_KEY);
    } catch {}
    void clearStoredImages();
  }, []);

  const loadTemplate = useCallback(
    (template: CapeTemplate, scope: TemplateScope) => {
      const { settings } = template;

      if (scope === "both" || scope === "main") {
        setGradientColors(settings.gradientColors);
        setGradDirection(settings.gradDirection);
      }

      if (scope === "both" || scope === "elytra") {
        setElytraGradientColors(
          settings.elytraGradientColors ?? settings.gradientColors
        );
        setElytraGradDirection(
          settings.elytraGradDirection ?? settings.gradDirection
        );
      }

      if (scope === "elytra") setSeparateElytraGradient(true);
    },
    []
  );

  return {
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
  };
}
