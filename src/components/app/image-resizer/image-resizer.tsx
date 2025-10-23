
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Loader2, Crop, Frame } from 'lucide-react';
import pica from 'pica';

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<Blob | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetDimensions, setTargetDimensions] = useState({ width: 1080, height: 1080 });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setResizedImage(null);
        
        const img = new Image();
        img.onload = () => {
            setOriginalDimensions({ width: img.width, height: img.height });
        };
        img.src = URL.createObjectURL(selectedFile);

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
  
  const resizeImage = useCallback(async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected' });
      return;
    }
    if (targetDimensions.width <= 0 || targetDimensions.height <= 0) {
      toast({ variant: 'destructive', title: 'Invalid dimensions', description: 'Width and height must be greater than 0.' });
      return;
    }

    setIsLoading(true);

    try {
      const picaInstance = pica();
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise(resolve => { img.onload = resolve });

      const canvas = document.createElement('canvas');
      canvas.width = targetDimensions.width;
      canvas.height = targetDimensions.height;
      
      const result = await picaInstance.resize(img, canvas);

      result.toBlob(file.type, 0.9).then(blob => {
        if (blob) {
            setResizedImage(blob);
            toast({ title: "Resize complete!" });
        } else {
            throw new Error("Canvas to Blob conversion failed");
        }
        setIsLoading(false);
      });
      
    } catch(err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Resize failed', description: 'There was an error processing your image.' });
      setIsLoading(false);
    }
  }, [file, targetDimensions, toast]);

  const downloadImage = () => {
    if (!resizedImage) return;
    const url = URL.createObjectURL(resizedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized_${file?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Image Resizer</CardTitle>
        <CardDescription>
          Resize images to specific dimensions (e.g., for social media posts).
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
                        <p className="text-xs text-muted-foreground">
                            Original: {originalDimensions.width} x {originalDimensions.height}px
                        </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="h-10 w-10" />
                        <p className="font-semibold">Click to upload an image</p>
                        <p className="text-xs">or drag and drop</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                            id="width"
                            type="number"
                            value={targetDimensions.width}
                            onChange={(e) => setTargetDimensions({...targetDimensions, width: parseInt(e.target.value) || 0})}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                            id="height"
                            type="number"
                            value={targetDimensions.height}
                            onChange={(e) => setTargetDimensions({...targetDimensions, height: parseInt(e.target.value) || 0})}
                        />
                    </div>
                </div>
                
                <Button onClick={resizeImage} disabled={!file || isLoading} className="w-full text-lg py-6">
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                        <Crop className="mr-2 h-5 w-5" />
                        Resize Image
                        </>
                    )}
                </Button>
            </div>

            {/* Right Column: Results */}
            <div className='space-y-6'>
                <Card className="bg-muted/30 h-full flex flex-col justify-center items-center p-4 text-center">
                    {resizedImage ? (
                        <div className='space-y-4 animate-fade-in'>
                             <h3 className="text-xl font-semibold">Resize Result</h3>
                             <div className='flex justify-around w-full'>
                                <div className='text-center'>
                                    <p className='text-sm text-muted-foreground'>Original Size</p>
                                    <p className='text-lg font-mono font-bold'>{originalDimensions.width} x {originalDimensions.height}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-sm text-muted-foreground'>New Size</p>
                                    <p className='text-lg font-mono font-bold text-primary'>{targetDimensions.width} x {targetDimensions.height}</p>
                                </div>
                             </div>
                             <img src={URL.createObjectURL(resizedImage)} alt="Resized preview" className="max-w-full max-h-48 rounded-md border-2 border-border" />
                             <Button onClick={downloadImage} className="w-full">
                                <Download className="mr-2 h-5 w-5" />
                                Download Resized Image
                            </Button>
                        </div>
                    ) : (
                        <div className='text-muted-foreground'>
                            <Frame className="h-12 w-12 mx-auto" />
                            <p className='font-semibold mt-4'>Your resized image will appear here.</p>
                            <p className='text-sm mt-1'>Upload an image and set dimensions.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

    