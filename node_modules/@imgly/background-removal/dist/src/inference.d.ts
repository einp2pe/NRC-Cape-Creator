export { initInference, runInference };
import { Config } from './schema';
import { NdArray } from 'ndarray';
declare function initInference(config?: Config): Promise<{
    config: Config;
    session: {
        base: unknown;
    };
}>;
declare function runInference(imageTensor: NdArray<Uint8Array>, config: Config, session: {
    base: unknown;
}): Promise<[NdArray<Uint8Array>, NdArray<Uint8Array>]>;
//# sourceMappingURL=inference.d.ts.map