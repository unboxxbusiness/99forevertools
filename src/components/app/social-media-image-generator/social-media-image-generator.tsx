
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2, AlignLeft, AlignCenter, AlignRight, Sparkles, PlusCircle, Grid, Save, FolderOpen } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';


const TEMPLATES = [
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Instagram Story', width: 1080, height: 1920 },
    { name: 'TikTok Thumbnail', width: 1080, height: 1920 },
    { name: 'Pinterest Pin', width: 1000, height: 1500 },
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
  { name: 'None', filter: null },
  { name: 'Grayscale', filter: new fabric.Image.filters.Grayscale() },
  { name: 'Sepia', filter: new fabric.Image.filters.Sepia() },
  { name: 'Vintage', filter: new fabric.Image.filters.Vintage() },
  { name: 'Invert', filter: new fabric.Image.filters.Invert() },
  { name: 'Lomo', filter: new fabric.Image.filters.ColorMatrix({
    matrix: [
      1.1, 0, 0, 0, 0,
      0, 1.1, 0, 0, 0,
      0, 0, 1.1, 0, 0,
      0, 0, 0, 1, 0
    ]
  })},
  { name: 'Clarity', filter: new fabric.Image.filters.Convolute({
      matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
    })
  },
];

interface OverlayConfig {
    id: number;
    src: string;
    opacity: number;
    size: number;
    x: number;
    y: number;
}

export function SocialMediaImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [font, setFont] = useState('sans');
  const { toast } = useToast();

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: template.width,
            height: template.height,
            backgroundColor: bgColor,
        });
        fabricCanvasRef.current = canvas;
    } else if (fabricCanvasRef.current) {
        fabricCanvasRef.current.setWidth(template.width);
        fabricCanvasRef.current.setHeight(template.height);
        fabricCanvasRef.current.setBackgroundColor(bgColor, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
    }
  }, [template, bgColor]);
  
  const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target?.result as string;
            fabric.Image.fromURL(imgData, (img) => {
                const canvas = fabricCanvasRef.current;
                if (!canvas) return;
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width! / img.width!,
                    scaleY: canvas.height! / img.height!,
                });
            });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleAddOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target?.result as string;
            fabric.Image.fromURL(imgData, (img) => {
                const canvas = fabricCanvasRef.current;
                if (!canvas) return;
                img.scaleToWidth(canvas.width! / 4);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    }
  };
  
  const addText = (text: string, options: fabric.ITextboxOptions) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const textbox = new fabric.Textbox(text, {
        width: canvas.width! * 0.8,
        ...options
      });
      canvas.add(textbox);
      canvas.centerObjectH(textbox);
      if (options.top) textbox.set({ top: canvas.height! * (options.top / 100) });
      canvas.renderAll();
  }

  useEffect(() => {
     if(fabricCanvasRef.current) {
        addText('Your Headline Here', {
            fontSize: 80,
            fill: '#FFFFFF',
            textAlign: 'center',
            fontFamily: fontFamilies[font],
            top: 40,
            fontWeight: 'bold',
            shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.5)', blur: 5, offsetX: 2, offsetY: 2 }),
        });
        addText('This is a great place for a short, descriptive paragraph.', {
            fontSize: 40,
            fill: '#DDDDDD',
            textAlign: 'center',
            fontFamily: fontFamilies[font],
            top: 60,
        });
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fabricCanvasRef.current]);

  const downloadImage = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.download = `${template.name.toLowerCase().replace(/ /g, '-')}-post.png`;
    link.href = dataURL;
    link.click();
    toast({ title: 'Image downloaded!' });
  };
  
  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const overlayImageInputRef = useRef<HTMLInputElement>(null);

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
                            <Label htmlFor="bgColor">Solid Color</Label>
                            <Input id="bgColor" type="color" value={bgColor} onChange={(e) => {
                                setBgColor(e.target.value);
                                if (fabricCanvasRef.current) {
                                    fabricCanvasRef.current.setBackgroundColor(e.target.value, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
                                }
                            }} className="p-1 h-10 w-full" />
                        </div>
                        <div className="space-y-2 pt-4 border-t">
                            <Label>Background Image</Label>
                            <Button variant="outline" className="w-full" onClick={() => bgImageInputRef.current?.click()}><Upload className="mr-2"/> Upload Background Image</Button>
                            <Input type="file" ref={bgImageInputRef} onChange={handleBgFileChange} className="hidden" accept="image/*" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="overlay">
                     <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><ImageIcon/>3. Overlays</AccordionTrigger>
                     <AccordionContent className="pt-4 space-y-4">
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
                         <Button variant="outline" className="w-full" onClick={() => addText('New Text', { top: 50, fontSize: 60, fill: '#FFFFFF', fontFamily: fontFamilies[font], textAlign: 'center' })}>
                            <PlusCircle className="mr-2"/> Add Text
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Live Preview</h3>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center">
              <canvas ref={canvasRef} className="max-w-full h-auto rounded-md shadow-lg" />
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
