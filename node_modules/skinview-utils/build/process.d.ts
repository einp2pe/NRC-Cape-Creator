import { TextureCanvas, TextureSource, ModelType } from "./types.js";
export declare function loadSkinToCanvas(canvas: TextureCanvas, image: TextureSource): void;
export declare function loadCapeToCanvas(canvas: TextureCanvas, image: TextureSource): void;
export declare function inferModelType(canvas: TextureCanvas): ModelType;
export declare function loadEarsToCanvas(canvas: TextureCanvas, image: TextureSource): void;
export declare function loadEarsToCanvasFromSkin(canvas: TextureCanvas, image: TextureSource): void;
