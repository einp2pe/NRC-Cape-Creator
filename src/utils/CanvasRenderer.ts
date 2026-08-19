import type { GradientDirection } from "@/data/templates";
import type { CapeImages } from "@/hooks/useCapeState";

const BASE_WIDTH = 512;
const BASE_HEIGHT = 256;

const FALLBACK_COLOR = "#002aff";

const ZONES = {
  front: { x: 8, y: 8, width: 80, height: 128 },
  back: { x: 96, y: 8, width: 80, height: 128 },
  elytra: { x: 288, y: 16, width: 80, height: 160 },
} as const;

const CAPE_FILL = { x: 0, y: 0, width: 176, height: 136 };
const CAPE_GRADIENT = { x: 8, y: 8, width: 168, height: 128 };

const ELYTRA_FILL = { x: 176, y: 0, width: 192, height: 176 };
const ELYTRA_GRADIENT = { x: 272, y: 16, width: 96, height: 160 };

const CAPE_BOTTOM_STRIP = { x: 88, y: 0, width: 80, height: 8 };
const ELYTRA_BOTTOM_STRIP = { x: 272, y: 0, width: 48, height: 8 };

type Box = { x: number; y: number; width: number; height: number };

export type DrawOptions = {
  images: CapeImages;
  gradientColors: string[];
  gradDirection: GradientDirection;
  separateElytraGradient: boolean;
  elytraGradientColors: string[] | null;
  elytraGradDirection: GradientDirection;
};

export class CanvasRenderer {
  private templateImage: HTMLImageElement | null = null;
  private templateReady = false;
  private readyListeners = new Set<() => void>();

  private maskCanvas: HTMLCanvasElement | null = null;
  private elytraCanvas: HTMLCanvasElement | null = null;

  constructor() {
    this.loadTemplate();
  }

  get isTemplateReady() {
    return this.templateReady;
  }

  onTemplateReady(listener: () => void): () => void {
    if (this.templateReady) {
      listener();
      return () => undefined;
    }

    this.readyListeners.add(listener);
    return () => this.readyListeners.delete(listener);
  }

  private loadTemplate() {
    const image = new Image();

    image.onload = () => {
      this.templateReady = true;
      this.readyListeners.forEach((listener) => listener());
      this.readyListeners.clear();
    };
    image.onerror = () => {
      console.error("Cape template failed to load");
      this.readyListeners.clear();
    };

    image.src = `${import.meta.env.BASE_URL}nrc_cape_template.png`;
    this.templateImage = image;
  }

  drawCape(canvas: HTMLCanvasElement, options: DrawOptions): void {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      images,
      gradientColors,
      gradDirection,
      separateElytraGradient,
      elytraGradientColors,
      elytraGradDirection,
    } = options;

    const elytraColors =
      separateElytraGradient && elytraGradientColors
        ? elytraGradientColors
        : gradientColors;
    const elytraDirection = separateElytraGradient
      ? elytraGradDirection
      : gradDirection;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT);
    ctx.globalCompositeOperation = "source-over";

    const template = this.templateReady ? this.templateImage : null;
    if (template) {
      ctx.drawImage(template, 0, 0, BASE_WIDTH, BASE_HEIGHT);
    }

    ctx.globalCompositeOperation = template ? "source-atop" : "source-over";

    this.fillRegion(
      ctx,
      CAPE_FILL,
      CAPE_GRADIENT,
      gradientColors,
      gradDirection
    );
    this.fillContinuation(
      ctx,
      CAPE_BOTTOM_STRIP,
      gradientColors,
      gradDirection,
      ZONES.front.height
    );

    this.fillRegion(
      ctx,
      ELYTRA_FILL,
      ELYTRA_GRADIENT,
      elytraColors,
      elytraDirection
    );
    this.fillContinuation(
      ctx,
      ELYTRA_BOTTOM_STRIP,
      elytraColors,
      elytraDirection,
      ZONES.elytra.height
    );

    ctx.globalCompositeOperation = "source-over";

    if (images.front) this.drawImage(ctx, images.front, ZONES.front);
    if (images.back) this.drawImage(ctx, images.back, ZONES.back);
    if (images.elytra && template) {
      this.drawMaskedElytra(ctx, template, images.elytra);
    }

    ctx.restore();
  }

  private fillRegion(
    ctx: CanvasRenderingContext2D,
    fill: Box,
    gradientBox: Box,
    colors: string[],
    direction: GradientDirection
  ) {
    ctx.fillStyle = this.createGradient(ctx, gradientBox, colors, direction);
    ctx.fillRect(fill.x, fill.y, fill.width, fill.height);
  }

  private createGradient(
    ctx: CanvasRenderingContext2D,
    box: Box,
    colors: string[],
    direction: GradientDirection
  ): CanvasGradient {
    const gradient =
      direction === "vertical"
        ? ctx.createLinearGradient(box.x, box.y, box.x, box.y + box.height)
        : ctx.createLinearGradient(box.x, box.y, box.x + box.width, box.y);

    if (colors.length === 0) {
      gradient.addColorStop(0, FALLBACK_COLOR);
      gradient.addColorStop(1, FALLBACK_COLOR);
    } else if (colors.length === 1) {
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[0]);
    } else {
      const lastIndex = colors.length - 1;
      colors.forEach((color, index) => {
        gradient.addColorStop(index / lastIndex, color);
      });
    }

    return gradient;
  }

  private fillContinuation(
    ctx: CanvasRenderingContext2D,
    strip: Box,
    colors: string[],
    direction: GradientDirection,
    regionHeight: number
  ) {
    if (direction === "horizontal" || colors.length < 2) {
      this.fillRegion(ctx, strip, strip, colors, direction);
      return;
    }

    const gradient = ctx.createLinearGradient(
      strip.x,
      strip.y,
      strip.x,
      strip.y + strip.height
    );

    const totalHeight = regionHeight + strip.height;
    const lastIndex = colors.length - 1;

    const colorAt = (ratio: number) => {
      const position = ratio * lastIndex;
      const lower = Math.floor(position);
      const upper = Math.min(lower + 1, lastIndex);
      return interpolateColor(colors[lower], colors[upper], position - lower);
    };

    gradient.addColorStop(0, colorAt(regionHeight / totalHeight));
    gradient.addColorStop(1, colorAt(1));

    ctx.fillStyle = gradient;
    ctx.fillRect(strip.x, strip.y, strip.width, strip.height);
  }

  private drawImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    box: Box
  ) {
    const width = image.naturalWidth || image.width || box.width;
    const height = image.naturalHeight || image.height || box.height;

    ctx.save();
    ctx.imageSmoothingEnabled = width > 256 || height > 256;
    ctx.drawImage(image, box.x, box.y, box.width, box.height);
    ctx.restore();
  }

  private drawMaskedElytra(
    ctx: CanvasRenderingContext2D,
    template: HTMLImageElement,
    image: HTMLImageElement
  ) {
    const { x, y, width, height } = ZONES.elytra;

    this.maskCanvas ??= document.createElement("canvas");
    this.elytraCanvas ??= document.createElement("canvas");

    const maskCtx = sizedContext(this.maskCanvas, width, height);
    const elytraCtx = sizedContext(this.elytraCanvas, width, height);
    if (!maskCtx || !elytraCtx) return;

    maskCtx.drawImage(template, x, y, width, height, 0, 0, width, height);

    this.drawImage(elytraCtx, image, { x: 0, y: 0, width, height });
    elytraCtx.globalCompositeOperation = "destination-in";
    elytraCtx.drawImage(this.maskCanvas, 0, 0);
    elytraCtx.globalCompositeOperation = "source-over";

    ctx.drawImage(this.elytraCanvas, x, y);
  }
}

function sizedContext(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): CanvasRenderingContext2D | null {
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx?.clearRect(0, 0, width, height);
  return ctx;
}

function interpolateColor(from: string, to: string, t: number): string {
  const parse = (hex: string) => {
    const value = hex.replace("#", "");
    return [
      parseInt(value.substring(0, 2), 16),
      parseInt(value.substring(2, 4), 16),
      parseInt(value.substring(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);

  const channel = (a: number, b: number) =>
    Math.round(a + (b - a) * t)
      .toString(16)
      .padStart(2, "0");

  return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`;
}
