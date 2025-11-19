"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Download, ImageIcon, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { loadTransformers, type TransformersModule } from '@/lib/load-transformers';

interface PreviewState {
  file?: File;
  url?: string;
}

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const MODEL_ID = 'briaai/RMBG-1.4';
const SAMPLE_IMAGE_URL = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3';

type DownloadMode = 'transparent' | 'color';

export function BackgroundRemover() {
  const { toast } = useToast();
  const [original, setOriginal] = useState<PreviewState>({});
  const [result, setResult] = useState<PreviewState>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  const transformersRef = useRef<TransformersModule | null>(null);
  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);

  const revokeUrl = (url?: string) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => () => revokeUrl(original.url), [original.url]);
  useEffect(() => () => revokeUrl(result.url), [result.url]);

  const reset = () => {
    revokeUrl(original.url);
    revokeUrl(result.url);
    setOriginal({});
    setResult({});
    setStatusMessage(null);
    setProgress(null);
  };

  const ensureModelLoaded = useCallback(async () => {
    if (modelRef.current && processorRef.current && transformersRef.current) {
      return;
    }

    setStatusMessage('Loading background removal model…');
    setProgress(0);

  const transformers = await loadTransformers();
    transformersRef.current = transformers;

    const { env, AutoModel, AutoProcessor } = transformers;
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    if (env.backends?.onnx?.wasm) {
      env.backends.onnx.wasm.proxy = true;
    }

    try {
      const model = await AutoModel.from_pretrained(MODEL_ID, {
        progress_callback: (fraction: number) => {
          setProgress(Math.round(fraction * 100));
        },
      });
      const processor = await AutoProcessor.from_pretrained(MODEL_ID, {
        config: {
          do_normalize: true,
          do_resize: true,
          do_rescale: true,
          resample: 2,
          rescale_factor: 0.00392156862745098,
          image_mean: [0.5, 0.5, 0.5],
          image_std: [0.5, 0.5, 0.5],
          feature_extractor_type: 'ImageFeatureExtractor',
          size: { width: 1024, height: 1024 },
        },
      });

      modelRef.current = model;
      processorRef.current = processor;
      setStatusMessage('Model ready — drop an image to begin.');
    } catch (error) {
      console.error('Failed to load background removal model', error);
      setStatusMessage(null);
      toast({
        title: 'Model download failed',
        description: error instanceof Error ? error.message : 'Please check your connection and try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setProgress(null);
    }
  }, [toast]);

  const runBackgroundRemoval = useCallback(async (file: File) => {
    await ensureModelLoaded();

    if (!transformersRef.current || !modelRef.current || !processorRef.current) {
      throw new Error('Background removal model not available.');
    }

    const { RawImage } = transformersRef.current;
    const tempUrl = URL.createObjectURL(file);
    try {
      const rawImage = await RawImage.fromURL(tempUrl);
      const processed = await processorRef.current(rawImage);
      const { pixel_values } = processed as { pixel_values: any };
      const inference = await modelRef.current({ input: pixel_values });
      const outputTensor = inference.output[0].mul(255).to('uint8');
      const maskImage = await RawImage.fromTensor(outputTensor).resize(rawImage.width, rawImage.height);
      const maskData = maskImage.data;

      const canvas = document.createElement('canvas');
      canvas.width = rawImage.width;
      canvas.height = rawImage.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Unable to create canvas context.');
      }

      ctx.drawImage(rawImage.toCanvas(), 0, 0);
      const pixelData = ctx.getImageData(0, 0, rawImage.width, rawImage.height);
      for (let i = 0; i < maskData.length; i++) {
        pixelData.data[4 * i + 3] = maskData[i];
      }
      ctx.putImageData(pixelData, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('Failed to create image blob.'))), 'image/png');
      });

      return blob;
    } finally {
      URL.revokeObjectURL(tempUrl);
    }
  }, [ensureModelLoaded]);

  const handleFile = useCallback(async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Unsupported file', description: 'Please choose a PNG or JPEG image.', variant: 'destructive' });
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({ title: 'File too large', description: 'Please choose an image under 15MB.', variant: 'destructive' });
      return;
    }

    const originalUrl = URL.createObjectURL(file);
    setOriginal({ file, url: originalUrl });
    setResult({});
    setStatusMessage('Removing background…');
    setIsProcessing(true);

    try {
      const blob = await runBackgroundRemoval(file);
      const resultUrl = URL.createObjectURL(blob);
      setResult({ file: new File([blob], `${file.name.replace(/\.[^/.]+$/, '') || 'image'}-no-bg.png`, { type: 'image/png' }), url: resultUrl });
      setStatusMessage('Done! Download your transparent PNG or add a custom backdrop.');
    } catch (error) {
      console.error('Background removal failed', error);
      setStatusMessage(null);
      toast({ title: 'Background removal failed', description: error instanceof Error ? error.message : 'Please try again with a different image.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  }, [runBackgroundRemoval, toast]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleSampleImage = async () => {
    try {
      setIsProcessing(true);
      setStatusMessage('Fetching sample image…');
      const response = await fetch(SAMPLE_IMAGE_URL);
      const blob = await response.blob();
      const file = new File([blob], 'sample.jpg', { type: blob.type || 'image/jpeg' });
      handleFile(file);
    } catch (error) {
      console.error('Failed to fetch sample image', error);
      toast({ title: 'Sample unavailable', description: 'Could not load a sample image right now. Please upload your own.', variant: 'destructive' });
      setIsProcessing(false);
      setStatusMessage(null);
    }
  };

  const downloadResult = async (mode: DownloadMode) => {
    if (!result.file || !result.url) return;

    if (mode === 'transparent') {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = result.file.name;
      link.click();
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = result.url;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast({ title: 'Export failed', description: 'Unable to draw on canvas for download.', variant: 'destructive' });
      return;
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      toast({ title: 'Export failed', description: 'Could not encode the coloured background.', variant: 'destructive' });
      return;
    }

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = result.file.name.replace(/\.png$/, '') + `-${backgroundColor.replace('#', '')}.png`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Background Remover
          </CardTitle>
          <Badge variant="outline" className="text-xs uppercase tracking-wide">Runs locally</Badge>
        </div>
        <CardDescription>
          Remove backgrounds from your photos instantly. Everything happens in your browser - your images stay private and never leave your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="bg-upload">Upload image</Label>
            <Input id="bg-upload" type="file" accept="image/*" onChange={handleInputChange} disabled={isProcessing} />
            <p className="text-xs text-muted-foreground">
              Supported formats: PNG, JPG. Files stay on-device. Max 15MB.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Button variant="secondary" onClick={handleSampleImage} disabled={isProcessing}>
              <ImageIcon className="h-4 w-4 mr-2" /> Try sample image
            </Button>
            <Button variant="ghost" onClick={reset} disabled={isProcessing || (!original.file && !result.file)}>
              <RefreshCw className="h-4 w-4 mr-2" /> Reset
            </Button>
          </div>
        </div>

        {statusMessage && (
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-max text-xs">{statusMessage}</Badge>
            {progress !== null && <Progress value={progress} className="h-2" />}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Original</h3>
            <div className="relative aspect-[4/3] rounded-lg border bg-muted/40 overflow-hidden flex items-center justify-center">
              {original.url ? (
                <img src={original.url} alt="Original" className="h-full w-full object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                  <span className="text-sm">Upload or try the sample to get started.</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Result preview</h3>
              <div className="flex items-center gap-2">
                <Label htmlFor="bg-color" className="text-xs text-muted-foreground">Backdrop</Label>
                <input id="bg-color" type="color" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} className="h-8 w-12 rounded" />
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg border overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#e5e5e5_25%,transparent_25%),linear-gradient(-45deg,#e5e5e5_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e5e5_75%),linear-gradient(-45deg,transparent_75%,#e5e5e5_75%)] bg-[length:20px_20px]" />
              <div className="absolute inset-0" style={{ backgroundColor }} />
              <div className="absolute inset-0 flex items-center justify-center">
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-sm">Processing image…</span>
                    </div>
                  </div>
                )}
                {result.url ? (
                  <img src={result.url} alt="Transparent result" className="relative h-full w-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-10 w-10" />
                    <span className="text-sm text-center px-4">Your transparent PNG appears here once processing finishes.</span>
                  </div>
                )}
              </div>
            </div>

            {result.url && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => downloadResult('transparent')}>
                    <Download className="h-4 w-4 mr-2" /> Download transparent PNG
                  </Button>
                  <Button variant="secondary" onClick={() => downloadResult('color')}>
                    <Download className="h-4 w-4 mr-2" /> Download with backdrop
                  </Button>
                </div>
                <ScrollArea className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <p>
                    Tip: adjust the colour picker above to preview and export a solid background. Downloads stay on your device and are never uploaded.
                  </p>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-xs text-muted-foreground">
        <span>✨ All processing happens locally in your browser - fast, secure, and completely private.</span>
        <span>Perfect for product photos, profile pictures, social media content, and more.</span>
      </CardFooter>
    </Card>
  );
}
