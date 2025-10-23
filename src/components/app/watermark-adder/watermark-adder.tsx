'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Layers, Image as ImageIcon, Type as TypeIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type WatermarkType = 'text' | 'image';
type Position = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export function WatermarkAdder() {
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [watermarkImageFile, setWatermarkImageFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('Your Watermark');
  const [watermarkType, setWatermarkType] = useState<WatermarkType>('text');
  
  const [opacity, setOpacity] = useState(0.5);
  const [size, setSize] = useState(10); // Percentage of main image width
  const [color, setColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(48);
  const [position, setPosition] = useState<Position>('bottom-right');

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const drawWatermark = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mainImageFile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mainImg = new Image();
    mainImg.src = URL.createObjectURL(mainImageFile);
    mainImg.onload = () => {
      canvas.width = mainImg.width;
      canvas.height = mainImg.height;
      ctx.drawImage(mainImg, 0, 0);

      ctx.globalAlpha = opacity;

      const addTextWatermark = () => {
        const calculatedFontSize = mainImg.width * (fontSize / 800);
        ctx.font = `bold ${calculatedFontSize}px Arial`;
        ctx.fillStyle = color;
        const textMetrics = ctx.measureText(watermarkText);
        const { x, y } = getCoordinates(mainImg.width, mainImg.height, textMetrics.width, calculatedFontSize);
        ctx.fillText(watermarkText, x, y);
      };

      const addImageWatermark = () => {
        if (!watermarkImageFile) return;
        const watermarkImg = new Image();
        watermarkImg.src = URL.createObjectURL(watermarkImageFile);
        watermarkImg.onload = () => {
          const watermarkWidth = mainImg.width * (size / 100);
          const watermarkHeight = (watermarkImg.height / watermarkImg.width) * watermarkWidth;
          const { x, y } = getCoordinates(mainImg.width, mainImg.height, watermarkWidth, watermarkHeight);
          ctx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
        };
      };
      
      if (watermarkType === 'text') {
        addTextWatermark();
      } else if (watermarkType === 'image' && watermarkImageFile) {
        addImageWatermark();
      }
    };
  }, [mainImageFile, watermarkType, watermarkText, watermarkImageFile, opacity, size, color, fontSize, position]);

  useEffect(() => {
    drawWatermark();
  }, [drawWatermark]);


  const getCoordinates = (canvasWidth: number, canvasHeight: number, itemWidth: number, itemHeight: number) => {
    const padding = canvasWidth * 0.02; // 2% padding
    let x = 0, y = 0;
    switch (position) {
      case 'top-left': x = padding; y = padding; break;
      case 'top-center': x = (canvasWidth - itemWidth) / 2; y = padding; break;
      case 'top-right': x = canvasWidth - itemWidth - padding; y = padding; break;
      case 'center-left': x = padding; y = (canvasHeight - itemHeight) / 2; break;
      case 'center': x = (canvasWidth - itemWidth) / 2; y = (canvasHeight - itemHeight) / 2; break;
      case 'center-right': x = canvasWidth - itemWidth - padding; y = (canvasHeight - itemHeight) / 2; break;
      case 'bottom-left': x = padding; y = canvasHeight - itemHeight - padding; break;
      case 'bottom-center': x = (canvasWidth - itemWidth) / 2; y = canvasHeight - itemHeight - padding; break;
      case 'bottom-right': x = canvasWidth - itemWidth - padding; y = canvasHeight - itemHeight - padding; break;
    }
    // Adjust Y for text baseline
    if (watermarkType === 'text') {
        y += itemHeight;
    }
    return { x, y };
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('image/')) {
        setter(selectedFile);
      } else {
        toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image file.' });
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !mainImageFile) {
        toast({ variant: 'destructive', title: 'No image', description: 'Please upload an image first.' });
        return;
    };
    const link = document.createElement('a');
    link.download = `watermarked_${mainImageFile.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({ title: 'Image downloaded!' });
  };
  
  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Watermark Adder</CardTitle>
        <CardDescription>
          Add a text or image watermark to your pictures.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {/* Controls */}
            <div className="space-y-2">
                <Label className="text-lg font-semibold">1. Upload Main Image</Label>
                <Button variant="outline" className="w-full h-24 border-dashed text-muted-foreground hover:border-primary hover:text-primary" onClick={() => mainImageInputRef.current?.click()}>
                    <Upload className="mr-2" /> {mainImageFile ? mainImageFile.name : 'Select Image'}
                </Button>
                <Input type="file" ref={mainImageInputRef} onChange={handleFileChange(setMainImageFile)} className="hidden" accept="image/*" />
            </div>

             <div className="space-y-4">
                <Label className="text-lg font-semibold">2. Choose Watermark Type</Label>
                <RadioGroup value={watermarkType} onValueChange={(v) => setWatermarkType(v as WatermarkType)} className="flex gap-2">
                    <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex gap-2">
                        <RadioGroupItem value="text" className="sr-only" /><TypeIcon/> Text
                    </Label>
                     <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex gap-2">
                        <RadioGroupItem value="image" className="sr-only" /><ImageIcon/> Image
                    </Label>
                </RadioGroup>
            </div>
            
            <div className='p-4 border rounded-lg space-y-4'>
                <h3 className="text-lg font-semibold">3. Customize Watermark</h3>
                {watermarkType === 'text' ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <Label htmlFor="watermarkText">Watermark Text</Label>
                            <Input id="watermarkText" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fontSize">Font Size</Label>
                            <Slider id="fontSize" value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={10} max={150} step={1} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="color">Text Color</Label>
                            <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="p-1 h-10"/>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <Label>Upload Watermark Image</Label>
                            <Button variant="outline" className="w-full" onClick={() => watermarkImageInputRef.current?.click()}>
                            <Upload className="mr-2" /> {watermarkImageFile ? watermarkImageFile.name : 'Select Logo'}
                            </Button>
                            <Input type="file" ref={watermarkImageInputRef} onChange={handleFileChange(setWatermarkImageFile)} className="hidden" accept="image/*" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="size">Size ({size}%)</Label>
                            <Slider id="size" value={[size]} onValueChange={(v) => setSize(v[0])} min={1} max={100} step={1} />
                        </div>
                    </div>
                )}
                
                <div className="space-y-4 pt-4 border-t">
                    <Label htmlFor="opacity">Opacity ({Math.round(opacity * 100)}%)</Label>
                    <Slider id="opacity" value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.05} />
                </div>

                <div className="space-y-2">
                    <Label>Position</Label>
                    <ToggleGroup type="single" value={position} onValueChange={(v: Position) => v && setPosition(v)} className="grid grid-cols-3 h-24">
                    {['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(pos => (
                        <ToggleGroupItem key={pos} value={pos} aria-label={pos} className="h-full rounded-none first:rounded-tl-md last:rounded-br-md even:border-x odd:border-none border-y data-[state=on]:bg-primary/20">
                            <div className="h-3 w-3 rounded-full bg-primary/50" />
                        </ToggleGroupItem>
                    ))}
                    </ToggleGroup>
                </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {/* Preview */}
            <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center h-[450px]">
                {mainImageFile ? (
                    <canvas ref={canvasRef} className="max-w-full max-h-full" />
                ) : (
                    <div className="text-center text-muted-foreground">
                        <Layers className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">Image Preview</p>
                        <p className="text-sm">Upload an image to begin</p>
                    </div>
                )}
            </div>
            <Button onClick={downloadImage} disabled={!mainImageFile} className="w-full text-lg py-6">
                <Download className="mr-2" />
                Download Watermarked Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
