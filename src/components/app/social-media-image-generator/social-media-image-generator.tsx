
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2, AlignLeft, AlignCenter, AlignRight, Sparkles, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';


const TEMPLATES = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'YouTube Banner', width: 2560, height: 1440 },
    { name: 'Facebook Cover', width: 820, height: 312 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Twitter/X Post', width: 1600, height: 900 },
];

const fontFamilies: { [key: string]: string } = {
  sans: 'Inter, sans-serif',
  serif: 'Georgia, serif',
  mono: 'monospace',
};

const FILTERS = [
  { name: 'None', style: 'none' },
  { name: 'Grayscale', style: 'grayscale(100%)' },
  { name: 'Sepia', style: 'sepia(100%)' },
  { name: 'Vintage', style: 'sepia(80%) contrast(90%) brightness(110%)' },
  { name: 'Lomo', style: 'contrast(150%) saturate(110%)' },
  { name: 'Clarity', style: 'contrast(130%) saturate(110%)' },
];

interface TextShadow {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
}

interface TextConfig {
    text: string;
    size: number;
    color: string;
    align: CanvasTextAlign;
    shadow: TextShadow;
    x: number;
    y: number;
}

interface OverlayConfig {
    id: number;
    file: File;
    src: string;
    size: number;
    x: number;
    y: number;
    opacity: number;
}


export function SocialMediaImageGenerator() {
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [bgType, setBgType] = useState<'color' | 'gradient'>('color');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [gradient, setGradient] = useState({ from: '#1a1a1a', to: '#333333' });
  const [bgImage, setBgImage] = useState<File | null>(null);
  const [bgImageFilter, setBgImageFilter] = useState('none');
  const [overlays, setOverlays] = useState<OverlayConfig[]>([]);
  const [font, setFont] = useState('sans');

  const [headline, setHeadline] = useState<TextConfig>({
      text: 'Your Headline Here',
      size: 80,
      color: '#FFFFFF',
      align: 'center',
      x: 50,
      y: 40,
      shadow: {
        enabled: true,
        color: '#000000',
        blur: 5,
        offsetX: 2,
        offsetY: 2,
      }
    });
  const [bodyText, setBodyText] = useState<TextConfig>({
      text: 'This is a great place for a short, descriptive paragraph.',
      size: 40,
      color: '#DDDDDD',
      align: 'center',
      x: 50,
      y: 60,
      shadow: {
        enabled: false,
        color: '#000000',
        blur: 3,
        offsetX: 1,
        offsetY: 1,
      }
    });

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
                ctx.filter = bgImageFilter;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.filter = 'none'; // Reset filter
                resolve();
            };
            img.onerror = () => resolve();
        });
    };

    const drawOverlays = () => {
        const overlayPromises = overlays.map(overlay => {
            return new Promise<void>(resolve => {
                const img = new Image();
                img.src = overlay.src;
                img.onload = () => {
                    const overlayWidth = canvas.width * (overlay.size / 100);
                    const overlayHeight = (img.height / img.width) * overlayWidth;
                    const xPos = (canvas.width - overlayWidth) * (overlay.x / 100);
                    const yPos = (canvas.height - overlayHeight) * (overlay.y / 100);
                    ctx.globalAlpha = overlay.opacity;
                    ctx.drawImage(img, xPos, yPos, overlayWidth, overlayHeight);
                    resolve();
                };
                img.onerror = () => resolve();
            });
        });
        return Promise.all(overlayPromises).then(() => {
            ctx.globalAlpha = 1; // Reset global alpha
        });
    };

    const drawText = () => {
        const fontFamily = fontFamilies[font] || fontFamilies.sans;
        
        const renderText = (config: TextConfig) => {
            const size = canvas.width * (config.size / 2000);
            ctx.font = `bold ${size}px ${fontFamily}`;
            ctx.fillStyle = config.color;
            ctx.textAlign = config.align;

            if (config.shadow.enabled) {
                ctx.shadowColor = config.shadow.color;
                ctx.shadowBlur = config.shadow.blur;
                ctx.shadowOffsetX = config.shadow.offsetX;
                ctx.shadowOffsetY = config.shadow.offsetY;
            }

            const xPos = (canvas.width / 100) * config.x;

            wrapText(ctx, config.text, xPos, (canvas.height / 100) * config.y, canvas.width - (canvas.width * 0.1), size * 1.2);
            
            // Reset shadow for next element
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }

        renderText(headline);
        renderText(bodyText);
    };

    const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0 && context.textAlign !== 'center') {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        const totalHeight = lines.length * lineHeight;
        let startY = y;

        if (context.textAlign === 'center') {
             startY = y - totalHeight / 2 + lineHeight / 2;
        }

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i].trim(), x, startY + i * lineHeight);
        }
    }

    drawBgImage().then(drawOverlays).then(drawText);
  }, [bgColor, bgImage, bgImageFilter, overlays, headline, bodyText, template, font, bgType, gradient]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        setBgImage(file);
    } else if (file) {
        toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image.' });
    }
  };

  const handleAddOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const newOverlay: OverlayConfig = {
            id: Date.now(),
            file: file,
            src: URL.createObjectURL(file),
            size: 20,
            x: 50,
            y: 25,
            opacity: 1,
        };
        setOverlays([...overlays, newOverlay]);
    } else if (file) {
        toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image for the overlay.' });
    }
  };
  
  const handleOverlayChange = (id: number, newConfig: Partial<OverlayConfig>) => {
    setOverlays(overlays.map(o => o.id === id ? {...o, ...newConfig} : o));
  }

  const removeOverlay = (id: number) => {
    setOverlays(overlays.filter(o => o.id !== id));
  }

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${template.name.toLowerCase().replace(/ /g, '-')}-post.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({ title: 'Image downloaded!' });
  };

  const TextControls = ({
    label,
    config,
    setConfig
  }: {
    label: string,
    config: TextConfig,
    setConfig: React.Dispatch<React.SetStateAction<TextConfig>>
  }) => (
    <div className="space-y-4">
        <h4 className="font-medium">{label}</h4>
        <div className="space-y-2">
            <Label>Text</Label>
            <Input value={config.text} onChange={(e) => setConfig({...config, text: e.target.value})} />
        </div>
        <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider value={[config.size]} onValueChange={(v) => setConfig({...config, size: v[0]})} min={20} max={200} step={1} />
        </div>
        <div className="space-y-2">
            <Label>Color</Label>
            <Input type="color" value={config.color} onChange={(e) => setConfig({...config, color: e.target.value})} className="p-1 h-10 w-full" />
        </div>
        <div className="space-y-2">
            <Label>Alignment</Label>
            <RadioGroup value={config.align} onValueChange={(v) => setConfig({...config, align: v as CanvasTextAlign})} className="flex gap-2">
                <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                    <RadioGroupItem value="left" className="sr-only" /><AlignLeft/>
                </Label>
                <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                    <RadioGroupItem value="center" className="sr-only" /><AlignCenter/>
                </Label>
                <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                    <RadioGroupItem value="right" className="sr-only" /><AlignRight/>
                </Label>
            </RadioGroup>
        </div>
        <Accordion type="single" collapsible>
            <AccordionItem value="position">
                <AccordionTrigger>Position</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                     <div className="space-y-2">
                        <Label>Horizontal Position ({config.x}%)</Label>
                        <Slider value={[config.x]} onValueChange={(v) => setConfig({...config, x: v[0]})} min={0} max={100} step={1} />
                    </div>
                     <div className="space-y-2">
                        <Label>Vertical Position ({config.y}%)</Label>
                        <Slider value={[config.y]} onValueChange={(v) => setConfig({...config, y: v[0]})} min={0} max={100} step={1} />
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shadow">
                <AccordionTrigger>Shadow</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                     <div className="flex items-center space-x-2">
                        <Checkbox id={`shadow-enable-${label}`} checked={config.shadow.enabled} onCheckedChange={c => setConfig({...config, shadow: {...config.shadow, enabled: !!c}})} />
                        <Label htmlFor={`shadow-enable-${label}`}>Enable Shadow</Label>
                     </div>
                     <div className="space-y-2">
                        <Label>Shadow Color</Label>
                        <Input type="color" value={config.shadow.color} onChange={e => setConfig({...config, shadow: {...config.shadow, color: e.target.value}})} className="p-1 h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label>Shadow Blur ({config.shadow.blur}px)</Label>
                        <Slider value={[config.shadow.blur]} onValueChange={v => setConfig({...config, shadow: {...config.shadow, blur: v[0]}})} min={0} max={50} step={1} />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Offset X ({config.shadow.offsetX}px)</Label>
                           <Input type="number" value={config.shadow.offsetX} onChange={e => setConfig({...config, shadow: {...config.shadow, offsetX: parseInt(e.target.value)}})} />
                        </div>
                        <div className="space-y-2">
                           <Label>Offset Y ({config.shadow.offsetY}px)</Label>
                           <Input type="number" value={config.shadow.offsetY} onChange={e => setConfig({...config, shadow: {...config.shadow, offsetY: parseInt(e.target.value)}})} />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Social Media Image Generator</CardTitle>
        <CardDescription>Create professional graphics for your social media platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Accordion type="multiple" defaultValue={['template', 'background', 'text']} className="w-full">
                <AccordionItem value="template">
                    <AccordionTrigger className="text-lg font-semibold">1. Template</AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <RadioGroup value={template.name} onValueChange={(val) => setTemplate(TEMPLATES.find(t => t.name === val) || TEMPLATES[0])} className="space-y-2">
                            {TEMPLATES.map(t => (
                                <Label key={t.name} className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                                    <RadioGroupItem value={t.name} />
                                    {t.name} <span className='text-xs text-muted-foreground'>({t.width}x{t.height})</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="background">
                    <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><Palette/>2. Background</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
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
                            <Input type="file" ref={bgImageInputRef} onChange={handleBgFileChange} className="hidden" accept="image/*" />
                            {bgImage && (
                                <div className="space-y-2 pt-2 animate-fade-in">
                                    <Button variant="ghost" size="sm" className="text-destructive w-full" onClick={() => setBgImage(null)}><Trash2 className="mr-2"/>Remove Image</Button>
                                    <Label htmlFor="bgFilter">Background Filter</Label>
                                    <Select value={bgImageFilter} onValueChange={setBgImageFilter}>
                                        <SelectTrigger id="bgFilter"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {FILTERS.map(f => <SelectItem key={f.name} value={f.style}>{f.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="overlay">
                     <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><ImageIcon/>3. Overlays</AccordionTrigger>
                     <AccordionContent className="pt-4 space-y-4">
                         {overlays.map((overlay, index) => (
                             <div key={overlay.id} className="p-4 border rounded-lg space-y-4 animate-fade-in">
                                 <div className="flex justify-between items-center">
                                    <Label className="font-medium">Overlay {index + 1}</Label>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeOverlay(overlay.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <Label>Size ({overlay.size}%)</Label>
                                    <Slider value={[overlay.size]} onValueChange={(v) => handleOverlayChange(overlay.id, {size: v[0]})} min={5} max={100} step={1} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Opacity ({Math.round(overlay.opacity * 100)}%)</Label>
                                    <Slider value={[overlay.opacity]} onValueChange={(v) => handleOverlayChange(overlay.id, {opacity: v[0]})} min={0} max={1} step={0.05} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Horizontal Position ({overlay.x}%)</Label>
                                    <Slider value={[overlay.x]} onValueChange={(v) => handleOverlayChange(overlay.id, {x: v[0]})} min={0} max={100} step={1} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Vertical Position ({overlay.y}%)</Label>
                                    <Slider value={[overlay.y]} onValueChange={(v) => handleOverlayChange(overlay.id, {y: v[0]})} min={0} max={100} step={1} />
                                </div>
                             </div>
                         ))}
                         <Button variant="outline" className="w-full" onClick={() => overlayImageInputRef.current?.click()}><PlusCircle className="mr-2"/> Add Overlay Image</Button>
                        <Input type="file" ref={overlayImageInputRef} onChange={handleAddOverlay} className="hidden" accept="image/*" />
                     </AccordionContent>
                </AccordionItem>
                <AccordionItem value="text">
                    <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><Text/>4. Text</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
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
                            <TextControls label="Headline" config={headline} setConfig={setHeadline} />
                        </div>
                        <div className="space-y-2 pt-4 border-t">
                            <TextControls label="Body Text" config={bodyText} setConfig={setBodyText} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
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
