export type RemoteImage = string | {
    src: string;
    /** @defaultvalue "anonymous" */
    crossOrigin?: string | null;
    referrerPolicy?: string;
};
export declare function loadImage(source: RemoteImage): Promise<HTMLImageElement>;
