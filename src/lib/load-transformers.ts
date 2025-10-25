type OnnxBackendConfig = {
  wasm?: {
    proxy?: boolean;
  };
};

type TransformersEnv = {
  allowLocalModels: boolean;
  useBrowserCache: boolean;
  backends?: {
    onnx?: OnnxBackendConfig;
  };
  [key: string]: unknown;
};

type AutoLoader = {
  from_pretrained: (modelId: string, options?: Record<string, unknown>) => Promise<any>;
};

type RawImageCtor = {
  fromURL: (url: string) => Promise<any>;
  fromTensor: (tensor: any) => any;
};

export type TransformersModule = {
  env: TransformersEnv;
  AutoModel: AutoLoader;
  AutoProcessor: AutoLoader;
  RawImage: RawImageCtor;
  [key: string]: unknown;
};

export async function loadTransformers(): Promise<TransformersModule> {
  // Use dynamic import with proper error handling
  try {
    const transformers = await import('@xenova/transformers');
    return transformers as unknown as TransformersModule;
  } catch (error) {
    console.error('Failed to load Transformers.js:', error);
    throw new Error('Failed to load Transformers.js. Please check your internet connection and try again.');
  }
}
