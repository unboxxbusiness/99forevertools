
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const TEMPLATES = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'YouTube Banner', width: 2560, height: 1440 },
    { name: 'Facebook Cover', width: 820, height: 312 },
];

const fontFamilies: { [key: string]: string } = {
  sans: 'Inter, sans-serif',
  serif: 'Georgia, serif',
  mono: 'monospace',
};

export function SocialMediaImageGenerator() {
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [bgType, setBgType] = useState<'color' | 'gradient'>('color');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [gradient, setGradient] = useState({ from: '#1a1a1a', to: '#333333' });
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [overlayImage, setOverlayImage] = useState<File | null>(null);
  const [overlayImageConfig, setOverlayImageConfig] = useState({ size: 20, x: 50, y: 25 });
  const [font, setFont] = useState('sans');

  const [headline, setHeadline] = useState({ text: 'Your Headline Here', size: 80, color: '#FFFFFF', align: 'center' as CanvasTextAlign });
  const [bodyText, setBodyText] = useState({ text: 'This is a great place for a short, descriptive paragraph.', size: 40, color: '#DDDDDD', align: 'center' as CanvasTextAlign });

  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const overlayImageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = template.width;
    canvas.height = template.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bgType === 'gradient') {
        const linearGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        linearGradient.addColorStop(0, gradient.from);
        linearGradient.addColorStop(1, gradient.to);
        ctx.fillStyle = linearGradient;
    } else {
        ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawBgImage = () => {
        if (!bgImage) return Promise.resolve();
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(bgImage);
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve();
            };
            img.onerror = () => resolve();
        });
    };

    const drawOverlay = () => {
        if (!overlayImage) return Promise.resolve();
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(overlayImage);
            img.onload = () => {
                const overlayWidth = canvas.width * (overlayImageConfig.size / 100);
                const overlayHeight = (img.height / img.width) * overlayWidth;
                const xPos = (canvas.width - overlayWidth) * (overlayImageConfig.x / 100);
                const yPos = (canvas.height - overlayHeight) * (overlayImageConfig.y / 100);
                ctx.drawImage(img, xPos, yPos, overlayWidth, overlayHeight);
                resolve();
            };
            img.onerror = () => resolve();
        });
    };
    
    const drawText = () => {
        const fontFamily = fontFamilies[font] || fontFamilies.sans;
        const headlineSize = canvas.width * (headline.size / 2000);
        ctx.fillStyle = headline.color;
        ctx.font = `bold ${headlineSize}px ${fontFamily}`;
        ctx.textAlign = headline.align;
        ctx.textBaseline = 'middle';
        const headlineX = headline.align === 'center' ? canvas.width / 2 : (headline.align === 'left' ? canvas.width * 0.05 : canvas.width * 0.95);
        wrapText(ctx, headline.text, headlineX, canvas.height / 2 - headlineSize, canvas.width - (canvas.width * 0.1), headlineSize * 1.2);

        const bodySize = canvas.width * (bodyText.size / 2000);
        ctx.fillStyle = bodyText.color;
        ctx.font = `${bodySize}px ${fontFamily}`;
        ctx.textAlign = bodyText.align;
        const bodyX = bodyText.align === 'center' ? canvas.width / 2 : (bodyText.align === 'left' ? canvas.width * 0.1 : canvas.width * 0.95);
        wrapText(ctx, bodyText.text, bodyX, canvas.height / 2 + (headlineSize), canvas.width - (canvas.width * 0.2), bodySize * 1.2);
    };

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
    
    drawBgImage().then(drawOverlay).then(drawText);
  }, [bgColor, bgImage, overlayImage, headline, bodyText, template, overlayImageConfig, font, bgType, gradient]);

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
    link.download = `${template.name.toLowerCase().replace(/ /g, '-')}-post.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({ title: 'Image downloaded!' });
  };

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Social Media Image Generator</CardTitle>
        <CardDescription>Create professional graphics for your social media platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">1. Template</h3>
                <RadioGroup value={template.name} onValueChange={(val) => setTemplate(TEMPLATES.find(t => t.name === val) || TEMPLATES[0])} className="space-y-2">
                    {TEMPLATES.map(t => (
                        <Label key={t.name} className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                            <RadioGroupItem value={t.name} />
                            {t.name} <span className='text-xs text-muted-foreground'>({t.width}x{t.height})</span>
                        </Label>
                    ))}
                </RadioGroup>
            </div>
            
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Palette/>2. Background</h3>
                <div className="space-y-2">
                    <Label>Type</Label>
                     <RadioGroup value={bgType} onValueChange={(v) => setBgType(v as 'color' | 'gradient')} className="flex gap-2">
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="color" className="sr-only" /> Solid
                        </Label>
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="gradient" className="sr-only" /> Gradient
                        </Label>
                    </RadioGroup>
                </div>
                {bgType === 'color' ? (
                    <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="bgColor">Color</Label>
                        <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10 w-full" />
                    </div>
                ) : (
                    <div className="space-y-2 animate-fade-in">
                        <Label>Gradient Colors</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input type="color" value={gradient.from} onChange={e => setGradient({...gradient, from: e.target.value})} className="p-1 h-10 w-full"/>
                            <Input type="color" value={gradient.to} onChange={e => setGradient({...gradient, to: e.target.value})} className="p-1 h-10 w-full"/>
                        </div>
                    </div>
                )}
                 <div className="space-y-2 pt-4 border-t">
                    <Label>Image</Label>
                    <Button variant="outline" className="w-full" onClick={() => bgImageInputRef.current?.click()}><Upload className="mr-2"/> Upload Background Image</Button>
                    <Input type="file" ref={bgImageInputRef} onChange={handleFileChange(setBgImage)} className="hidden" accept="image/*" />
                     {bgImage && <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setBgImage(null)}><Trash2 className="mr-2"/>Remove Image</Button>}
                </div>
            </div>
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><ImageIcon/>3. Overlay/Logo</h3>
                 <Button variant="outline" className="w-full" onClick={() => overlayImageInputRef.current?.click()}><Upload className="mr-2"/> Upload Logo</Button>
                <Input type="file" ref={overlayImageInputRef} onChange={handleFileChange(setOverlayImage)} className="hidden" accept="image/*" />
                 {overlayImage && <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setOverlayImage(null)}><Trash2 className="mr-2"/>Remove Logo</Button>}
                {overlayImage && (
                    <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                            <Label>Size ({overlayImageConfig.size}%)</Label>
                            <Slider value={[overlayImageConfig.size]} onValueChange={(v) => setOverlayImageConfig({...overlayImageConfig, size: v[0]})} min={5} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                            <Label>Horizontal Position ({overlayImageConfig.x}%)</Label>
                            <Slider value={[overlayImageConfig.x]} onValueChange={(v) => setOverlayImageConfig({...overlayImageConfig, x: v[0]})} min={0} max={100} step={1} />
                        </div>
                         <div className="space-y-2">
                            <Label>Vertical Position ({overlayImageConfig.y}%)</Label>
                            <Slider value={[overlayImageConfig.y]} onValueChange={(v) => setOverlayImageConfig({...overlayImageConfig, y: v[0]})} min={0} max={100} step={1} />
                        </div>
                    </div>
                )}
            </div>
             <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Text/>4. Text</h3>
                 <div className="space-y-2">
                    <Label htmlFor="font">Font Family</Label>
                    <Select value={font} onValueChange={setFont}>
                        <SelectTrigger id="font"><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" value={headline.text} onChange={(e) => setHeadline({...headline, text: e.target.value})} />
                    <Label>Font Size: {headline.size}px</Label>
                    <Slider value={[headline.size]} onValueChange={(v) => setHeadline({...headline, size: v[0]})} min={30} max={200} step={1} />
                    <Label>Color</Label>
                    <Input type="color" value={headline.color} onChange={(e) => setHeadline({...headline, color: e.target.value})} className="p-1 h-10 w-full" />
                    <Label>Alignment</Label>
                    <ToggleGroup type="single" value={headline.align} onValueChange={(v: CanvasTextAlign) => v && setHeadline({...headline, align: v})} className="w-full">
                        <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft/></ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter/></ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Align right"><AlignRight/></ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="bodyText">Body Text</Label>
                    <Input id="bodyText" value={bodyText.text} onChange={(e) => setBodyText({...bodyText, text: e.target.value})} />
                     <Label>Font Size: {bodyText.size}px</Label>
                    <Slider value={[bodyText.size]} onValueChange={(v) => setBodyText({...bodyText, size: v[0]})} min={20} max={100} step={1} />
                    <Label>Color</Label>
                    <Input type="color" value={bodyText.color} onChange={(e) => setBodyText({...bodyText, color: e.target.value})} className="p-1 h-10 w-full" />
                    <Label>Alignment</Label>
                    <ToggleGroup type="single" value={bodyText.align} onValueChange={(v: CanvasTextAlign) => v && setBodyText({...bodyText, align: v})} className="w-full">
                        <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft/></ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter/></ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Align right"><AlignRight/></ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
          </div>
          {/* Preview & Download */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-center">Live Preview</h3>
            <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center">
              <canvas ref={canvasRef} width={template.width} height={template.height} className="w-full h-auto max-w-full rounded-md shadow-lg" />
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
