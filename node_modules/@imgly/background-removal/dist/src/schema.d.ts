export { Config, ConfigSchema, validateConfig };
import { z } from 'zod';
declare const ConfigSchema: z.ZodEffects<z.ZodDefault<z.ZodObject<{
    publicPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string, string>;
    debug: z.ZodDefault<z.ZodBoolean>;
    rescale: z.ZodDefault<z.ZodBoolean>;
    device: z.ZodDefault<z.ZodEnum<["cpu", "gpu"]>>;
    proxyToWorker: z.ZodDefault<z.ZodBoolean>;
    fetchArgs: z.ZodDefault<z.ZodAny>;
    progress: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodString, z.ZodNumber, z.ZodNumber], z.ZodUnknown>, z.ZodVoid>>;
    model: z.ZodDefault<z.ZodEffects<z.ZodEnum<["isnet", "isnet_fp16", "isnet_quint8"]>, "isnet" | "isnet_fp16" | "isnet_quint8", unknown>>;
    output: z.ZodDefault<z.ZodObject<{
        format: z.ZodDefault<z.ZodEnum<["image/png", "image/jpeg", "image/webp", "image/x-rgba8", "image/x-alpha8"]>>;
        quality: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    }, {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    }>>;
}, "strip", z.ZodTypeAny, {
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    output?: {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    };
    debug?: boolean;
    publicPath?: string;
    rescale?: boolean;
    device?: "cpu" | "gpu";
    proxyToWorker?: boolean;
    fetchArgs?: any;
    model?: "isnet" | "isnet_fp16" | "isnet_quint8";
}, {
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    output?: {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    };
    debug?: boolean;
    publicPath?: string;
    rescale?: boolean;
    device?: "cpu" | "gpu";
    proxyToWorker?: boolean;
    fetchArgs?: any;
    model?: unknown;
}>>, {
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    output?: {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    };
    debug?: boolean;
    publicPath?: string;
    rescale?: boolean;
    device?: "cpu" | "gpu";
    proxyToWorker?: boolean;
    fetchArgs?: any;
    model?: "isnet" | "isnet_fp16" | "isnet_quint8";
}, {
    progress?: (args_0: string, args_1: number, args_2: number, ...args_3: unknown[]) => void;
    output?: {
        quality?: number;
        format?: "image/png" | "image/jpeg" | "image/webp" | "image/x-rgba8" | "image/x-alpha8";
    };
    debug?: boolean;
    publicPath?: string;
    rescale?: boolean;
    device?: "cpu" | "gpu";
    proxyToWorker?: boolean;
    fetchArgs?: any;
    model?: unknown;
}>;
type Config = z.infer<typeof ConfigSchema>;
declare function validateConfig(configuration?: Config): Config;
//# sourceMappingURL=schema.d.ts.map