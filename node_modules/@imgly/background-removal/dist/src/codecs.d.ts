export { imageEncode, imageDecode, MimeType };
import { MimeType } from './MimeType';
import { NdArray } from 'ndarray';
declare function imageDecode(blob: Blob): Promise<NdArray<Uint8Array>>;
declare function imageEncode(imageTensor: NdArray<Uint8Array>, quality?: number, format?: string): Promise<Blob>;
//# sourceMappingURL=codecs.d.ts.map