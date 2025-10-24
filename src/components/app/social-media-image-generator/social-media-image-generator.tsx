
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

export function SocialMediaImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  const { toast } = useToast();

  const initCanvas = useCallback(() => {
    if (canvasRef.current) {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: template.width,
            height: template.height,
            backgroundColor: bgColor,
            selection: true,
        });
        fabricCanvasRef.current = canvas;

        const updateActiveObject = (e: fabric.IEvent) => {
          setActiveObject(canvas.getActiveObject());
        };

        canvas.on('selection:created', updateActiveObject);
        canvas.on('selection:updated', updateActiveObject);
        canvas.on('selection:cleared', () => setActiveObject(null));
        canvas.on('object:modified', updateActiveObject);
        
        // Add initial text elements
        addText('Your Headline Here', {
            fontSize: 80,
            fill: '#FFFFFF',
            textAlign: 'center',
            fontFamily: fontFamilies.sans,
            top: canvas.getHeight() / 3,
            fontWeight: 'bold',
            shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.5)', blur: 5, offsetX: 2, offsetY: 2 }),
        });
        addText('This is a great place for a short, descriptive paragraph.', {
            fontSize: 40,
            fill: '#DDDDDD',
            textAlign: 'center',
            fontFamily: fontFamilies.sans,
            top: canvas.getHeight() / 2,
        });

        return canvas;
    }
    return null;
  }, [template.width, template.height, bgColor]);

   useEffect(() => {
    let canvas = fabricCanvasRef.current;
    if (!canvas) {
      canvas = initCanvas();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && canvas?.getActiveObject()) {
            canvas.remove(canvas.getActiveObject()!);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initCanvas]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.setWidth(template.width);
      canvas.setHeight(template.height);
      canvas.setBackgroundColor(bgColor, canvas.renderAll.bind(canvas));
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

  const addText = (text: string, options: fabric.ITextboxOptions) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      const textbox = new fabric.Textbox(text, {
        width: canvas.width! * 0.8,
        ...options
      });
      canvas.add(textbox);
      canvas.centerObject(textbox);
      canvas.renderAll();
  }
  
  const addImageOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                canvas.setActiveObject(img);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    }
  };

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
  
  const updateActiveObject = (props: any) => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
        active.set(props);
        canvas?.renderAll();
        // Force re-render of properties panel
        setActiveObject(null);
        setActiveObject(active);
    }
  }

  const deleteActiveObject = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas && activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const PropertiesPanel = () => {
    if (!activeObject) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p>Select an object on the canvas to see its properties.</p>
        </div>
      );
    }

    const type = activeObject.type;

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg capitalize">{type} Properties</h3>
                 <Button variant="destructive" size="sm" onClick={deleteActiveObject}><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
            </div>
            
            {activeObject instanceof fabric.Textbox && (
                <div className="space-y-4">
                    <div>
                        <Label>Text Content</Label>
                        <Textarea value={(activeObject as fabric.Textbox).text} onChange={(e) => updateActiveObject({ text: e.target.value })}/>
                    </div>
                     <div>
                        <Label>Font Size</Label>
                        <Input type="number" value={(activeObject as fabric.Textbox).fontSize} onChange={(e) => updateActiveObject({ fontSize: parseInt(e.target.value, 10) })}/>
                    </div>
                     <div>
                        <Label>Font Color</Label>
                        <Input type="color" value={(activeObject as fabric.Textbox).fill as string} onChange={(e) => updateActiveObject({ fill: e.target.value })} className="p-1 h-10 w-full"/>
                    </div>
                    <div>
                        <Label>Font Family</Label>
                        <Select value={Object.keys(fontFamilies).find(key => fontFamilies[key] === (activeObject as fabric.Textbox).fontFamily)} onValueChange={(v) => updateActiveObject({ fontFamily: fontFamilies[v] })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sans">Sans Serif</SelectItem>
                            <SelectItem value="serif">Serif</SelectItem>
                            <SelectItem value="mono">Monospace</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Alignment</Label>
                        <div className="flex gap-2">
                           <Button variant={(activeObject as fabric.Textbox).textAlign === 'left' ? 'default' : 'outline'} size="icon" onClick={() => updateActiveObject({ textAlign: 'left' })}><AlignLeft/></Button>
                           <Button variant={(activeObject as fabric.Textbox).textAlign === 'center' ? 'default' : 'outline'} size="icon" onClick={() => updateActiveObject({ textAlign: 'center' })}><AlignCenter/></Button>
                           <Button variant={(activeObject as fabric.Textbox).textAlign === 'right' ? 'default' : 'outline'} size="icon" onClick={() => updateActiveObject({ textAlign: 'right' })}><AlignRight/></Button>
                        </div>
                    </div>
                     <div>
                        <Label>Line Height ({(activeObject as fabric.Textbox).lineHeight})</Label>
                        <Slider value={[(activeObject as fabric.Textbox).lineHeight || 1]} onValueChange={(v) => updateActiveObject({ lineHeight: v[0] })} min={0.5} max={3} step={0.1} />
                    </div>
                     <div>
                        <Label>Letter Spacing ({(activeObject as fabric.Textbox).charSpacing})</Label>
                        <Slider value={[(activeObject as fabric.Textbox).charSpacing || 0]} onValueChange={(v) => updateActiveObject({ charSpacing: v[0] })} min={-200} max={800} step={10} />
                    </div>
                </div>
            )}
            
            {activeObject instanceof fabric.Image && (
                 <div className="space-y-4">
                    <div>
                        <Label>Opacity</Label>
                        <Slider value={[activeObject.opacity || 1]} onValueChange={(v) => updateActiveObject({ opacity: v[0] })} min={0} max={1} step={0.05} />
                    </div>
                </div>
            )}
        </div>
    )
  }

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Social Media Image Generator</CardTitle>
        <CardDescription>Create professional graphics for your social media platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Accordion type="multiple" defaultValue={['template', 'background']} className="w-full">
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
                            <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10 w-full" />
                        </div>
                        <div className="space-y-2 pt-4 border-t">
                            <Label>Background Image</Label>
                            <Button variant="outline" className="w-full" onClick={() => bgImageInputRef.current?.click()}><Upload className="mr-2"/> Upload Background</Button>
                            <Input type="file" ref={bgImageInputRef} onChange={handleBgFileChange} className="hidden" accept="image/*" />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="elements">
                     <AccordionTrigger className="text-lg font-semibold">3. Add Elements</AccordionTrigger>
                     <AccordionContent className="pt-4 space-y-4">
                         <Button variant="outline" className="w-full" onClick={() => overlayImageInputRef.current?.click()}><ImageIcon className="mr-2"/> Add Image/Logo</Button>
                         <Input type="file" ref={overlayImageInputRef} onChange={addImageOverlay} className="hidden" accept="image/*" />
                         <Button variant="outline" className="w-full" onClick={() => addText('New Text', { top: 50, fontSize: 60, fill: '#FFFFFF', fontFamily: fontFamilies.sans, textAlign: 'center' })}>
                            <Text className="mr-2"/> Add Text
                        </Button>
                     </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="properties">
                     <AccordionTrigger className="text-lg font-semibold">4. Properties</AccordionTrigger>
                     <AccordionContent>
                         <PropertiesPanel />
                     </AccordionContent>
                </AccordionItem>
            </Accordion>
             <Button onClick={downloadImage} className="w-full text-lg py-6">
                <Download className="mr-2" /> Download as PNG
            </Button>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center overflow-auto">
              <canvas ref={canvasRef} className="rounded-md shadow-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    