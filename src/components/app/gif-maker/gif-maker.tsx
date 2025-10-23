'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Clapperboard, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import GIF from 'gif.js.optimized';

interface Frame {
  id: number;
  file: File;
  preview: string;
}

export function GifMaker() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextId, setNextId] = useState(0);

  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [delay, setDelay] = useState(200); // in ms

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFrames: Frame[] = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map((file, index) => ({
          id: nextId + index,
          file,
          preview: URL.createObjectURL(file),
        }));

      if (newFrames.length > 0) {
        setFrames(prev => [...prev, ...newFrames]);
        setNextId(prev => prev + newFrames.length);
      }
      
      if (newFrames.length !== files.length) {
        toast({
          variant: 'destructive',
          title: 'Some files were not images',
          description: 'Only image files can be added as frames.',
        });
      }
    }
  };

  const removeFrame = (id: number) => {
    const frameToRemove = frames.find(f => f.id === id);
    if(frameToRemove) {
        URL.revokeObjectURL(frameToRemove.preview);
    }
    setFrames(frames.filter(f => f.id !== id));
  };
  
  const handleSort = () => {
    if(dragItem.current === null || dragOverItem.current === null) return;
    
    let _frames = [...frames];
    const draggedItemContent = _frames.splice(dragItem.current, 1)[0];
    _frames.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFrames(_frames);
  }

  const generateGif = useCallback(async () => {
    if (frames.length < 2) {
      toast({ variant: 'destructive', title: 'Not enough frames', description: 'Please upload at least 2 images.' });
      return;
    }
    setIsLoading(true);
    setGifUrl(null);
    
    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: width,
        height: height
    });

    const loadImage = (frame: Frame) => new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = frame.preview;
    });

    try {
        for (const frame of frames) {
            const img = await loadImage(frame);
            gif.addFrame(img, { copy: true, delay });
        }
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error loading images' });
        setIsLoading(false);
        return;
    }

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      setIsLoading(false);
      toast({ title: 'GIF generated successfully!' });
    });

    gif.render();
  }, [frames, width, height, delay, toast]);

  const downloadGif = () => {
    if (!gifUrl) return;
    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = 'animated.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Animated GIF Maker</CardTitle>
        <CardDescription>
          Convert a series of images into a simple animated GIF.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">1. GIF Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="width">Width (px)</Label>
                        <Input id="width" type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)} />
                    </div>
                     <div>
                        <Label htmlFor="height">Height (px)</Label>
                        <Input id="height" type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="delay">Frame Delay (ms)</Label>
                    <Input id="delay" type="number" value={delay} onChange={(e) => setDelay(parseInt(e.target.value) || 0)} />
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">2. Upload Frames</h3>
                <Button variant="outline" className="w-full h-16 border-dashed" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2" /> Add Images
                </Button>
                <Input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" accept="image/*" />
            </div>

            <Button onClick={generateGif} disabled={isLoading || frames.length < 2} className="w-full text-lg py-6">
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                    <Clapperboard className="mr-2 h-5 w-5" />
                    Generate GIF
                    </>
                )}
            </Button>
          </div>

          {/* Right Column: Frames & Preview */}
          <div className="lg:col-span-2 space-y-6">
             <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Frames</h3>
                {frames.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {frames.map((frame, index) => (
                           <div 
                                key={frame.id} 
                                className="relative group aspect-square bg-muted rounded-md overflow-hidden cursor-grab"
                                draggable
                                onDragStart={() => dragItem.current = index}
                                onDragEnter={() => dragOverItem.current = index}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <img src={frame.preview} alt={`Frame ${index + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeFrame(frame.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <GripVertical className="absolute top-1 right-1 h-4 w-4 text-white/50" />
                                </div>
                                <div className="absolute bottom-0 left-0 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-tr-md">{index + 1}</div>
                           </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>Your uploaded frames will appear here.</p>
                    </div>
                )}
             </div>
             
             <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Preview</h3>
                <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-center h-[300px]">
                    {gifUrl ? (
                         <div className='text-center space-y-4 animate-fade-in'>
                             <img src={gifUrl} alt="Generated GIF" className="max-w-full max-h-56 rounded border-2 border-border" />
                              <Button onClick={downloadGif} className="">
                                <Download className="mr-2" />
                                Download GIF
                            </Button>
                         </div>
                    ) : (
                         <div className="text-center text-muted-foreground">
                            <ImageIcon className="mx-auto h-12 w-12" />
                            <p className="mt-4 font-semibold">GIF Preview</p>
                            <p className="text-sm">Your generated GIF will appear here</p>
                        </div>
                    )}
                </div>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
