
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Loader2, Image as ImageIcon, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function ImageToPngConverter() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSourceFile(file);
      setPngUrl(null);
      handleConversion(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload a valid image file.',
      });
      setSourceFile(null);
    }
  };

  const handleConversion = useCallback((file: File) => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected' });
      return;
    }
    setIsLoading(true);
    setPngUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        ctx.drawImage(img, 0, 0);
        
        try {
          const dataUrl = canvas.toDataURL('image/png');
          setPngUrl(dataUrl);
          toast({ title: 'Conversion successful!', description: 'Your PNG file is ready.' });
        } catch (error) {
          console.error('Canvas toDataURL error:', error);
          toast({ variant: 'destructive', title: 'Conversion Failed', description: 'Could not convert image to PNG.' });
        } finally {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        setIsLoading(false);
        toast({ variant: 'destructive', title: 'Image Load Error', description: 'Could not load the selected image file.' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast({ variant: 'destructive', title: 'File Read Error', description: 'Could not read the selected file.' });
    }
    reader.readAsDataURL(file);
  }, [toast]);

  const downloadImage = () => {
    if (!pngUrl || !sourceFile) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    const newFileName = sourceFile.name.replace(/\.[^/.]+$/, "") + ".png";
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Image to PNG Converter</CardTitle>
        <CardDescription>
          Convert JPG, WebP, GIF, SVG, and other formats to PNG right in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div
            className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors flex flex-col justify-center items-center h-48"
            onClick={() => fileInputRef.current?.click()}
            >
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/jpeg,image/jpg,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
            />
            {sourceFile ? (
                <div className="flex flex-col items-center gap-2 text-green-500">
                <CheckCircle className="h-10 w-10" />
                <p className="font-semibold">{sourceFile.name}</p>
                <p className="text-xs text-muted-foreground">Original size: {formatBytes(sourceFile.size)}</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-10 w-10" />
                <p className="font-semibold">Click to upload an image</p>
                <p className="text-xs">JPG, WebP, GIF, SVG, BMP, TIFF</p>
                </div>
            )}
        </div>

        {(isLoading || pngUrl) && (
            <div className="border-t pt-8 text-center space-y-4">
                <h3 className="text-xl font-semibold">Result</h3>
                {isLoading ? (
                     <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="animate-spin" />
                        <span>Converting your image...</span>
                    </div>
                ) : pngUrl && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center">
                           <img src={pngUrl} alt="Converted PNG preview" className="max-w-full max-h-64 rounded border-2 border-border"/>
                        </div>
                        <Button onClick={downloadImage}>
                            <Download className="mr-2 h-5 w-5" />
                            Download PNG
                        </Button>
                    </div>
                )}
            </div>
        )}

      </CardContent>
    </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Click the upload area to select an image file (e.g., a JPG, WebP, or GIF) from your computer.</li>
                        <li>The tool instantly converts the image to the PNG format using your browser. Your files are not uploaded to any server.</li>
                        <li>A preview of the converted PNG image will appear.</li>
                        <li>Click the "Download PNG" button to save the new image file to your device.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Preserve Transparency:</strong> Convert images with transparent backgrounds (like logos in GIF or WebP format) to PNG to maintain transparency for use on your website.</li>
                        <li><strong>Standardize Formats:</strong> Ensure all images on your e-commerce store or blog are in a consistent, high-quality format.</li>
                        <li><strong>Prepare Graphics for Print:</strong> PNG is a lossless format, making it ideal for high-quality graphics for flyers or brochures.</li>
                        <li><strong>Website Logos:</strong> Convert your logo from JPG to PNG to ensure it looks sharp and has a transparent background.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
