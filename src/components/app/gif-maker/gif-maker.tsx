'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Clapperboard, FileVideo, Image as ImageIcon } from 'lucide-react';
import gifshot from 'gifshot';
import { Slider } from '@/components/ui/slider';

type SourceType = 'images' | 'video';

export function GifMaker() {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [sourceType, setSourceType] = useState<SourceType | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [gifWidth, setGifWidth] = useState(500);
  const [gifHeight, setGifHeight] = useState(500);
  const [numFrames, setNumFrames] = useState(10);
  const [interval, setInterval] = useState(0.1);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('16px');


  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const firstFile = files[0];
        const type: SourceType = firstFile.type.startsWith('video/') ? 'video' : 'images';
        
        const validFiles = Array.from(files).filter(file => 
            type === 'video' ? file.type.startsWith('video/') : file.type.startsWith('image/')
        );

        if (validFiles.length === 0) {
             toast({
                variant: 'destructive',
                title: 'No valid files selected',
                description: type === 'video' ? 'Please select a video file.' : 'Please select one or more image files.'
            });
            return;
        }

        if (type === 'video' && validFiles.length > 1) {
            toast({
                variant: 'destructive',
                title: 'Multiple videos selected',
                description: 'You can only convert one video at a time.',
            });
            setSourceFiles([validFiles[0]]);
        } else {
            setSourceFiles(validFiles);
        }

        setSourceType(type);
        setGifUrl(null);
        setProgress(0);
    }
  };

  const generateGif = useCallback(() => {
    if (sourceFiles.length === 0) {
      toast({ variant: 'destructive', title: 'No source selected', description: 'Please upload images or a video.' });
      return;
    }
    setIsLoading(true);
    setGifUrl(null);
    setProgress(0);
    
    const options: gifshot.GifshotOptions = {
      gifWidth,
      gifHeight,
      numFrames,
      frameDuration: interval * 10,
      text,
      fontSize,
    };
    
    const callback = (obj: gifshot.GifshotResult) => {
        setIsLoading(false);
        if(!obj.error) {
            setGifUrl(obj.image);
            toast({ title: 'GIF generated successfully!' });
        } else {
            console.error(obj);
            toast({ variant: 'destructive', title: 'Error generating GIF', description: obj.error_msg });
        }
    }

    if (sourceType === 'video') {
        gifshot.createGIF({ ...options, video: [sourceFiles[0]] }, callback);
    } else {
        const imageUrls = sourceFiles.map(file => URL.createObjectURL(file));
        gifshot.createGIF({ ...options, images: imageUrls }, callback);
    }

  }, [sourceFiles, sourceType, gifWidth, gifHeight, numFrames, interval, text, fontSize, toast]);

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
          Convert images or a video into a simple animated GIF.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">1. Upload Source</h3>
                <Button variant="outline" className="w-full h-24 border-dashed" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2" /> 
                     {sourceFiles.length > 0 ? `${sourceFiles.length} file(s) selected` : 'Add Images or Video'}
                </Button>
                <Input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" accept="image/*,video/*" />
                 {sourceType && <p className="text-sm text-center text-muted-foreground">Source type: <span className="font-bold">{sourceType}</span></p>}
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">2. GIF Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="width">Width (px)</Label>
                        <Input id="width" type="number" value={gifWidth} onChange={(e) => setGifWidth(parseInt(e.target.value) || 0)} />
                    </div>
                     <div>
                        <Label htmlFor="height">Height (px)</Label>
                        <Input id="height" type="number" value={gifHeight} onChange={(e) => setGifHeight(parseInt(e.target.value) || 0)} />
                    </div>
                </div>
                 {sourceType === 'video' && (
                    <div className="space-y-2">
                        <Label>Number of Frames: {numFrames}</Label>
                        <Slider value={[numFrames]} onValueChange={(v) => setNumFrames(v[0])} min={5} max={100} step={5} />
                    </div>
                 )}
                 <div className="space-y-2">
                    <Label>Frame Interval: {interval.toFixed(1)}s</Label>
                    <Slider value={[interval]} onValueChange={(v) => setInterval(v[0])} min={0.1} max={1} step={0.1} />
                </div>
                <div className="space-y-2">
                    <Label>Overlay Text (optional)</Label>
                    <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. My Awesome GIF" />
                </div>
            </div>

            <Button onClick={generateGif} disabled={isLoading || sourceFiles.length === 0} className="w-full text-lg py-6">
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

          {/* Right Column: Preview */}
          <div className="lg:col-span-2 space-y-6">
             <div className="p-4 border rounded-lg space-y-4 bg-muted/30 flex items-center justify-center h-full">
                {gifUrl ? (
                     <div className='text-center space-y-4 animate-fade-in'>
                         <img src={gifUrl} alt="Generated GIF" className="max-w-full max-h-[400px] rounded border-2 border-border" />
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
      </CardContent>
    </Card>
  );
}
