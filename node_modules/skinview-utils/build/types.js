export function isTextureSource(value) {
    return value instanceof HTMLImageElement ||
        value instanceof HTMLVideoElement ||
        value instanceof HTMLCanvasElement ||
        (typeof ImageBitmap !== "undefined" && value instanceof ImageBitmap) ||
        (typeof OffscreenCanvas !== "undefined" && value instanceof OffscreenCanvas);
}
//# sourceMappingURL=types.js.map