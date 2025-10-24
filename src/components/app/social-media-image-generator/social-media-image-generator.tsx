
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Text, Image as ImageIcon, Palette, Trash2, AlignLeft, AlignCenter, AlignRight, Shapes, Square, Circle, Triangle, Layers, ChevronsUp, ChevronsDown, ChevronUp, ChevronDown, ZoomIn, Save, FolderOpen } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

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
  const [canvasObjects, setCanvasObjects] = useState<fabric.Object[]>([]);
  const [zoom, setZoom] = useState(1);

  const { toast } = useToast();
  
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  const updateCanvasObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      setCanvasObjects(canvas.getObjects());
    }
  };

  const initCanvas = useCallback(() => {
    if (canvasRef.current) {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: template.width,
            height: template.height,
            backgroundColor: bgColor,
            selection: true,
            fireRightClick: true, // Enable right-click
            stopContextMenu: true, // Prevent default browser context menu
        });
        fabricCanvasRef.current = canvas;

        const updateActiveObject = () => {
          setActiveObject(canvas.getActiveObject());
          updateCanvasObjects();
        };

        canvas.on('selection:created', updateActiveObject);
        canvas.on('selection:updated', updateActiveObject);
        canvas.on('selection:cleared', () => setActiveObject(null));
        canvas.on('object:modified', updateActiveObject);
        canvas.on('object:added', updateCanvasObjects);
        canvas.on('object:removed', updateCanvasObjects);
        
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
        updateCanvasObjects();
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
        if (e.altKey && canvas) {
            canvas.isGrabMode = true;
            canvas.selection = false;
            canvas.defaultCursor = 'grab';
            canvas.renderAll();
        }
        if ((e.key === 'Delete' || e.key === 'Backspace') && canvas?.getActiveObject()) {
            canvas.remove(canvas.getActiveObject()!);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
        if (!e.altKey && canvas) {
            canvas.isGrabMode = false;
            canvas.selection = true;
            canvas.defaultCursor = 'default';
            canvas.renderAll();
        }
    };
    
    const handleMouseWheel = (opt: fabric.IEvent<WheelEvent>) => {
        const delta = opt.e.deltaY;
        const canvas = fabricCanvasRef.current;
        if (!canvas || !opt.e.ctrlKey) return;
        
        let newZoom = canvas.getZoom();
        newZoom *= 0.999 ** delta;
        if (newZoom > 4) newZoom = 4;
        if (newZoom < 0.25) newZoom = 0.25;

        canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), newZoom);
        setZoom(newZoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    };

    const handleMouseDown = (opt: fabric.IEvent<MouseEvent>) => {
        const canvas = fabricCanvasRef.current;
        if (canvas && canvas.isGrabMode) {
            const evt = opt.e;
            canvas.isDragging = true;
            canvas.selection = false;
            canvas.lastPosX = evt.clientX;
            canvas.lastPosY = evt.clientY;
        }
    };
    
    const handleMouseMove = (opt: fabric.IEvent<MouseEvent>) => {
        const canvas = fabricCanvasRef.current;
         if (canvas && canvas.isDragging) {
            const e = opt.e;
            const vpt = canvas.viewportTransform;
            if (vpt) {
                vpt[4] += e.clientX - (canvas.lastPosX ?? 0);
                vpt[5] += e.clientY - (canvas.lastPosY ?? 0);
                canvas.requestRenderAll();
            }
            canvas.lastPosX = e.clientX;
            canvas.lastPosY = e.clientY;
        }
    }
    
    const handleMouseUp = () => {
        const canvas = fabricCanvasRef.current;
        if (canvas) {
            canvas.isDragging = false;
            canvas.selection = true;
        }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas?.on('mouse:wheel', handleMouseWheel);
    canvas?.on('mouse:down', handleMouseDown);
    canvas?.on('mouse:move', handleMouseMove);
    canvas?.on('mouse:up', handleMouseUp);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        canvas?.off('mouse:wheel', handleMouseWheel);
        canvas?.off('mouse:down', handleMouseDown);
        canvas?.off('mouse:move', handleMouseMove);
        canvas?.off('mouse:up', handleMouseUp);
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

  const handleZoomChange = (value: number) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
        const center = canvas.getCenter();
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), value);
        setZoom(value);
    }
  }

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

    const addShape = (shapeType: 'rect' | 'circle' | 'triangle') => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        let shape: fabric.Object | null = null;
        const commonProps = {
            fill: '#E0E0E0',
            width: 150,
            height: 150,
        };

        if (shapeType === 'rect') {
            shape = new fabric.Rect(commonProps);
        } else if (shapeType === 'circle') {
            shape = new fabric.Circle({ ...commonProps, radius: 75 });
        } else if (shapeType === 'triangle') {
            shape = new fabric.Triangle(commonProps);
        }
        
        if (shape) {
            canvas.add(shape);
            canvas.centerObject(shape);
            canvas.setActiveObject(shape);
            canvas.renderAll();
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

  const bringForward = () => {
    const canvas = fabricCanvasRef.current;
    if(canvas && activeObject) {
        canvas.bringForward(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        updateCanvasObjects();
    }
  }

  const sendBackward = () => {
    const canvas = fabricCanvasRef.current;
    if(canvas && activeObject) {
        canvas.sendBackwards(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        updateCanvasObjects();
    }
  }

  const bringToFront = () => {
    const canvas = fabricCanvasRef.current;
    if(canvas && activeObject) {
        canvas.bringToFront(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        updateCanvasObjects();
    }
  }

  const sendToBack = () => {
    const canvas = fabricCanvasRef.current;
    if(canvas && activeObject) {
        canvas.sendToBack(activeObject);
        canvas.discardActiveObject();
        canvas.renderAll();
        updateCanvasObjects();
    }
  }

  const saveProject = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const json = canvas.toJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'design-project.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Project saved!' });
  }

  const loadProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const json = e.target?.result as string;
        const canvas = fabricCanvasRef.current;
        if (canvas) {
            canvas.loadFromJSON(json, () => {
                canvas.renderAll();
                updateCanvasObjects();
                toast({ title: 'Project loaded!' });
            });
        }
    };
    reader.readAsText(file);
  }

  const PropertiesPanel = () => {
    if (!activeObject) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p>Select an object on the canvas to see its properties.</p>
        </div>
      );
    }

    const type = activeObject.type;
    const isShape = ['rect', 'circle', 'triangle'].includes(type || '');

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg capitalize">{type} Properties</h3>
                 <Button variant="destructive" size="sm" onClick={deleteActiveObject}><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
            </div>

            <div className="space-y-2">
                <Label>Layer Order</Label>
                <div className="grid grid-cols-4 gap-1">
                    <Button variant="outline" size="icon" onClick={sendToBack}><ChevronsDown title="Send to Back"/></Button>
                    <Button variant="outline" size="icon" onClick={sendBackward}><ChevronDown title="Send Backward"/></Button>
                    <Button variant="outline" size="icon" onClick={bringForward}><ChevronUp title="Bring Forward"/></Button>
                    <Button variant="outline" size="icon" onClick={bringToFront}><ChevronsUp title="Bring to Front"/></Button>
                </div>
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
                        <Label>Line Height ({(activeObject as fabric.Textbox).lineHeight?.toFixed(1)})</Label>
                        <Slider value={[(activeObject as fabric.Textbox).lineHeight || 1]} onValueChange={(v) => updateActiveObject({ lineHeight: v[0] })} min={0.5} max={3} step={0.1} />
                    </div>
                     <div>
                        <Label>Letter Spacing ({(activeObject as fabric.Textbox).charSpacing})</Label>
                        <Slider value={[(activeObject as fabric.Textbox).charSpacing || 0]} onValueChange={(v) => updateActiveObject({ charSpacing: v[0] })} min={-200} max={800} step={10} />
                    </div>
                </div>
            )}
            
            {(activeObject instanceof fabric.Image || isShape) && (
                 <div className="space-y-4">
                    {isShape && (
                         <div>
                            <Label>Color</Label>
                            <Input type="color" value={activeObject.fill as string} onChange={(e) => updateActiveObject({ fill: e.target.value })} className="p-1 h-10 w-full"/>
                        </div>
                    )}
                    <div>
                        <Label>Opacity</Label>
                        <Slider value={[activeObject.opacity || 1]} onValueChange={(v) => updateActiveObject({ opacity: v[0] })} min={0} max={1} step={0.05} />
                    </div>
                </div>
            )}
        </div>
    )
  }

  const LayersPanel = () => (
    <div className="space-y-2">
        {canvasObjects.slice().reverse().map((obj, index) => {
            const isActive = activeObject === obj;
            const getLabel = () => {
                if (obj.type === 'textbox') return (obj as fabric.Textbox).text?.substring(0, 20) + '...';
                if (obj.type === 'image') return 'Image Overlay';
                return obj.type || 'Object';
            }
            return (
                <Button 
                    key={index}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start h-10"
                    onClick={() => {
                        fabricCanvasRef.current?.setActiveObject(obj);
                        fabricCanvasRef.current?.renderAll();
                        setActiveObject(obj);
                    }}
                >
                    {obj.type === 'textbox' && <Text className="mr-2 h-4 w-4"/>}
                    {obj.type === 'image' && <ImageIcon className="mr-2 h-4 w-4"/>}
                    {['rect', 'circle', 'triangle'].includes(obj.type || '') && <Shapes className="mr-2 h-4 w-4"/>}
                    <span className="truncate">{getLabel()}</span>
                </Button>
            )
        })}
    </div>
  )

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Social Media Image Generator</CardTitle>
        <CardDescription>Create professional graphics for your social media platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Accordion type="multiple" defaultValue={['project', 'template', 'background', 'layers']} className="w-full">
                <AccordionItem value="project">
                    <AccordionTrigger className="text-lg font-semibold">Project</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-2">
                         <Button variant="outline" className="w-full" onClick={saveProject}><Save className="mr-2"/> Save Project</Button>
                         <Button variant="outline" className="w-full" onClick={() => projectFileInputRef.current?.click()}><FolderOpen className="mr-2"/> Load Project</Button>
                         <Input type="file" ref={projectFileInputRef} onChange={loadProject} className="hidden" accept=".json"/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="template">
                    <AccordionTrigger className="text-lg font-semibold">Template</AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <RadioGroup value={template.name} onValueChange={(val) => setTemplate(TEMPLATES.find(t => t.name === val) || TEMPLATES[0])} className="space-y-2">
                            {TEMPLATES.map(t => (
                                <Label key={t.name} className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                                    <RadioGroupItem value={t.name} />
                                    <span className="text-sm">{t.name} <span className='text-xs text-muted-foreground'>({t.width}x{t.height})</span></span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="canvas">
                    <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><ZoomIn/>Canvas</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Zoom ({Math.round(zoom * 100)}%)</Label>
                            <Slider value={[zoom]} onValueChange={(v) => handleZoomChange(v[0])} min={0.25} max={4} step={0.05} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                            <p>Hold <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Alt</kbd> to drag/pan the canvas.</p>
                            <p className="mt-1">Hold <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + Scroll to zoom.</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="background">
                    <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><Palette/>Background</AccordionTrigger>
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
                     <AccordionTrigger className="text-lg font-semibold">Add Elements</AccordionTrigger>
                     <AccordionContent className="pt-4 space-y-4">
                         <Button variant="outline" className="w-full" onClick={() => overlayImageInputRef.current?.click()}><ImageIcon className="mr-2"/> Add Image/Logo</Button>
                         <Input type="file" ref={overlayImageInputRef} onChange={addImageOverlay} className="hidden" accept="image/*" />
                         <Button variant="outline" className="w-full" onClick={() => addText('New Text', { top: 50, fontSize: 60, fill: '#FFFFFF', fontFamily: fontFamilies.sans, textAlign: 'center' })}>
                            <Text className="mr-2"/> Add Text
                        </Button>
                        <div className="space-y-2 pt-4 border-t">
                             <Label>Add Shape</Label>
                             <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" onClick={() => addShape('rect')}><Square/></Button>
                                <Button variant="outline" onClick={() => addShape('circle')}><Circle/></Button>
                                <Button variant="outline" onClick={() => addShape('triangle')}><Triangle/></Button>
                             </div>
                        </div>
                     </AccordionContent>
                </AccordionItem>
                <AccordionItem value="layers">
                    <AccordionTrigger className="text-lg font-semibold flex items-center gap-2"><Layers/>Layers</AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <LayersPanel/>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="properties">
                     <AccordionTrigger className="text-lg font-semibold">Properties</AccordionTrigger>
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
            <div className="bg-muted/30 p-4 rounded-lg flex justify-center items-center overflow-auto h-[700px]">
              <canvas ref={canvasRef} className="rounded-md shadow-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
