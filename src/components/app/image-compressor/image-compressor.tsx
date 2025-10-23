
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Loader2, Image as ImageIcon } from 'lucide-react';
import pica from 'pica';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setOriginalSize(selectedFile.size);
        setCompressedImage(null);
        setCompressedSize(0);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: 'Please upload an image file.',
        });
        setFile(null);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const compressImage = useCallback(async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected' });
      return;
    }
    setIsLoading(true);

    try {
      const picaInstance = pica();
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise(resolve => { img.onload = resolve });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const result = await picaInstance.resize(img, canvas);
      const blob = await picaInstance.toBlob(result, file.type, quality);
      
      setCompressedImage(blob);
      setCompressedSize(blob.size);
      
      toast({ title: "Compression complete!" });
    } catch(err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Compression failed', description: 'There was an error processing your image.' });
    } finally {
      setIsLoading(false);
    }
  }, [file, quality, toast]);

  const downloadImage = () => {
    if (!compressedImage) return;
    const url = URL.createObjectURL(compressedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sizeReduction = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Image Compressor</CardTitle>
        <CardDescription>
          Reduce image file sizes for faster web loading and sharing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Upload and Settings */}
            <div className='space-y-6'>
                <div
                    className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors h-48 flex flex-col justify-center items-center"
                    onClick={handleUploadClick}
                    >
                    <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    {file ? (
                        <div className="flex flex-col items-center gap-2 text-green-500">
                        <CheckCircle className="h-10 w-10" />
                        <p className="font-semibold">{file.name}</p>
                        <p className="text-xs text-muted-foreground">Original size: {formatBytes(originalSize)}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="h-10 w-10" />
                        <p className="font-semibold">Click to upload an image</p>
                        <p className="text-xs">or drag and drop</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <Label htmlFor="quality">Compression Quality: <span className="font-bold text-primary">{Math.round(quality * 100)}%</span></Label>
                    <Slider id="quality" value={[quality]} onValueChange={(v) => setQuality(v[0])} min={0.1} max={1} step={0.05} />
                </div>
                
                <Button onClick={compressImage} disabled={!file || isLoading} className="w-full text-lg py-6">
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Compress Image
                        </>
                    )}
                </Button>
            </div>

            {/* Right Column: Results */}
            <div className='space-y-6'>
                <Card className="bg-muted/30 h-full flex flex-col justify-center items-center p-4 text-center">
                    {compressedImage ? (
                        <div className='space-y-4 animate-fade-in'>
                             <h3 className="text-xl font-semibold">Compression Result</h3>
                             <div className='flex justify-around w-full'>
                                <div className='text-center'>
                                    <p className='text-sm text-muted-foreground'>Original Size</p>
                                    <p className='text-lg font-mono font-bold'>{formatBytes(originalSize)}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-sm text-muted-foreground'>Compressed Size</p>
                                    <p className='text-lg font-mono font-bold'>{formatBytes(compressedSize)}</p>
                                </div>
                             </div>
                             <p className='text-2xl font-bold text-green-400'>
                                -{sizeReduction.toFixed(1)}%
                             </p>
                             <p className='text-sm text-muted-foreground'>File size reduction</p>
                             <Button onClick={downloadImage} className="w-full">
                                <Download className="mr-2 h-5 w-5" />
                                Download Compressed Image
                            </Button>
                        </div>
                    ) : (
                        <div className='text-muted-foreground'>
                            <p className='font-semibold'>Your compressed image will appear here.</p>
                            <p className='text-sm mt-1'>Upload an image and click compress.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
