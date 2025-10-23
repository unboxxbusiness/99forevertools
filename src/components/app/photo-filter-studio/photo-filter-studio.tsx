
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Wand2, Camera, CheckCircle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const FILTERS = [
  { name: 'None', style: 'none' },
  { name: 'Grayscale', style: 'grayscale(100%)' },
  { name: 'Sepia', style: 'sepia(100%)' },
  { name: 'Invert', style: 'invert(100%)' },
  { name: 'Vintage', style: 'sepia(80%) contrast(90%) brightness(110%)' },
  { name: 'Lomo', style: 'contrast(150%) saturate(110%)' },
  { name: 'Clarity', style: 'contrast(130%) saturate(110%)' },
  { name: 'Sin City', style: 'contrast(200%) grayscale(100%)' },
  { name: 'Sunrise', style: 'contrast(110%) saturate(130%) sepia(30%)' },
  { name: 'Cross Process', style: 'sepia(50%) contrast(120%) brightness(110%) saturate(120%)' },
  { name: 'Nostalgia', style: 'sepia(70%) saturate(120%) contrast(90%)' },
];

export function PhotoFilterStudio() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
    }
  };

  const drawImageWithFilter = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas!.width = img.width;
      canvas!.height = img.height;
      ctx.filter = selectedFilter;
      ctx.drawImage(img, 0, 0);
    };
  }, [imageSrc, selectedFilter]);

  useEffect(() => {
    drawImageWithFilter();
  }, [drawImageWithFilter]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageFile) {
        toast({ variant: 'destructive', title: 'No image loaded', description: 'Please upload and filter an image first.' });
        return;
    }
    const link = document.createElement('a');
    link.download = `filtered-${imageFile.name}`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({ title: 'Image downloaded successfully!' });
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Photo Filter Studio</CardTitle>
        <CardDescription>
          Transform your photos with professional filters and effects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upload and Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div
              className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors flex flex-col justify-center items-center h-40"
              onClick={() => fileInputRef.current?.click()}
            >
              <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              {imageFile ? (
                 <div className="flex flex-col items-center gap-2 text-green-500">
                  <CheckCircle className="h-10 w-10" />
                  <p className="font-semibold">{imageFile.name}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-10 w-10" />
                  <p className="font-semibold">Upload Your Photo</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <ScrollArea className="h-72 w-full">
                    <div className="grid grid-cols-2 gap-2 pr-4">
                    {FILTERS.map(filter => (
                        <Button
                        key={filter.name}
                        variant={selectedFilter === filter.style ? 'default' : 'secondary'}
                        onClick={() => setSelectedFilter(filter.style)}
                        className="flex-col h-20"
                        >
                        {imageSrc && <img src={imageSrc} alt={filter.name} className="w-12 h-12 object-cover rounded-md mb-1" style={{filter: filter.style}} />}
                        <span className="text-xs">{filter.name}</span>
                        </Button>
                    ))}
                    </div>
                </ScrollArea>
            </div>
            
            <Button onClick={downloadImage} disabled={!imageFile} className="w-full text-lg py-6">
              <Download className="mr-2" /> Download Image
            </Button>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center h-[500px]">
              {imageFile ? (
                <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Camera className="mx-auto h-24 w-24" />
                  <p className="mt-4 font-semibold text-lg">Image Preview</p>
                  <p className="text-sm">Upload an image to see it here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
