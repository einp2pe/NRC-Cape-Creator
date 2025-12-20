export { loadAsBlob, loadAsUrl, loadAsArrayBuffer, preload, resolveChunkUrls };
import { Config } from './schema';
declare function preload(config: Config): Promise<void>;
declare function loadAsUrl(url: string, config: Config): Promise<string>;
declare function loadAsArrayBuffer(url: string, config: Config): Promise<ArrayBuffer>;
declare function loadAsBlob(key: string, config: Config): Promise<Blob>;
declare function resolveChunkUrls(key: string, config: Config): Promise<any[]>;
//# sourceMappingURL=resource.d.ts.map