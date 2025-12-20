export { createOnnxSession, runOnnxSession };
import ndarray, { NdArray } from 'ndarray';
import { InferenceSession } from 'onnxruntime-web';
import { Config } from './schema';
declare function createOnnxSession(model: any, config: Config): Promise<InferenceSession>;
declare function runOnnxSession(session: any, inputs: [string, NdArray<Float32Array>][], outputs: [string], config: Config): Promise<ndarray.NdArray<Float32Array>[]>;
//# sourceMappingURL=onnx.d.ts.map