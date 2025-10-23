
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2 } from 'lucide-react';

export function SocialMediaImageGenerator() {
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [overlayImage, setOverlayImage] = useState<File | null>(null);
  const [headline, setHeadline] = useState({ text: 'Your Headline Here', size: 80, color: '#FFFFFF' });
  const [bodyText, setBodyText] = useState({ text: 'This is a great place for a short, descriptive paragraph.', size: 40, color: '#DDDDDD' });

  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const overlayImageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawBgImage = () => {
        if (!bgImage) return;
        const img = new Image();
        img.src = URL.createObjectURL(bgImage);
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            drawOverlay(); // Redraw overlay after bg image loads
        };
    };

    const drawOverlay = () => {
        // Draw overlay image
        if (overlayImage) {
            const img = new Image();
            img.src = URL.createObjectURL(overlayImage);
            img.onload = () => {
                const overlaySize = canvas.width * 0.3;
                ctx.drawImage(img, (canvas.width - overlaySize) / 2, 100, overlaySize, overlaySize);
                drawText(); // Redraw text after overlay image loads
            };
        } else {
            drawText();
        }
    };
    
    const drawText = () => {
        // Draw headline
        ctx.fillStyle = headline.color;
        ctx.font = `bold ${headline.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        wrapText(ctx, headline.text, canvas.width / 2, canvas.height / 2 - 50, canvas.width - 100, headline.size * 1.2);

        // Draw body text
        ctx.fillStyle = bodyText.color;
        ctx.font = `${bodyText.size}px sans-serif`;
        wrapText(ctx, bodyText.text, canvas.width / 2, canvas.height / 2 + 100, canvas.width - 150, bodyText.size * 1.2);
    };

    // Helper to wrap text
    const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }
    
    drawBgImage(); // This will trigger the chain
    if (!bgImage) { // If no bg image, start with overlay
        drawOverlay();
    }
  }, [bgColor, bgImage, overlayImage, headline, bodyText]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        setter(file);
    } else if (file) {
        toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image.' });
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'social-media-post.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({ title: 'Image downloaded!' });
  };

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Social Media Image Generator</CardTitle>
        <CardDescription>Create a professional square post for Instagram and other platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Palette/> Background</h3>
                <div className="space-y-2">
                    <Label htmlFor="bgColor">Background Color</Label>
                    <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Label>Background Image</Label>
                    <Button variant="outline" className="w-full" onClick={() => bgImageInputRef.current?.click()}><Upload className="mr-2"/> Upload</Button>
                    <Input type="file" ref={bgImageInputRef} onChange={handleFileChange(setBgImage)} className="hidden" accept="image/*" />
                     {bgImage && <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setBgImage(null)}><Trash2 className="mr-2"/>Remove Image</Button>}
                </div>
            </div>
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><ImageIcon/> Overlay Image / Logo</h3>
                 <Button variant="outline" className="w-full" onClick={() => overlayImageInputRef.current?.click()}><Upload className="mr-2"/> Upload Logo</Button>
                <Input type="file" ref={overlayImageInputRef} onChange={handleFileChange(setOverlayImage)} className="hidden" accept="image/*" />
                 {overlayImage && <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setOverlayImage(null)}><Trash2 className="mr-2"/>Remove Logo</Button>}
            </div>
             <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Text/> Text Content</h3>
                <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" value={headline.text} onChange={(e) => setHeadline({...headline, text: e.target.value})} />
                    <Label>Font Size: {headline.size}px</Label>
                    <Slider value={[headline.size]} onValueChange={(v) => setHeadline({...headline, size: v[0]})} min={30} max={150} step={1} />
                    <Label>Color</Label>
                    <Input type="color" value={headline.color} onChange={(e) => setHeadline({...headline, color: e.target.value})} className="p-1 h-10 w-full" />
                </div>
                <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="bodyText">Body Text</Label>
                    <Input id="bodyText" value={bodyText.text} onChange={(e) => setBodyText({...bodyText, text: e.target.value})} />
                     <Label>Font Size: {bodyText.size}px</Label>
                    <Slider value={[bodyText.size]} onValueChange={(v) => setBodyText({...bodyText, size: v[0]})} min={20} max={80} step={1} />
                    <Label>Color</Label>
                    <Input type="color" value={bodyText.color} onChange={(e) => setBodyText({...bodyText, color: e.target.value})} className="p-1 h-10 w-full" />
                </div>
            </div>
          </div>
          {/* Preview & Download */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-center">Live Preview</h3>
            <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center">
              <canvas ref={canvasRef} width={1080} height={1080} className="w-full h-auto max-w-full aspect-square rounded-md shadow-lg" />
            </div>
            <Button onClick={downloadImage} className="w-full text-lg py-6">
                <Download className="mr-2" /> Download as PNG
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
