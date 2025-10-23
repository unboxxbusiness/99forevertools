
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, User, CheckCircle } from 'lucide-react';

const GRADIENTS = [
  { id: 'instagram', value: 'url(#instagram)' , css: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' },
  { id: 'sunset', value: 'url(#sunset)', css: 'bg-gradient-to-tr from-orange-400 to-pink-500' },
  { id: 'ocean', value: 'url(#ocean)', css: 'bg-gradient-to-tr from-cyan-400 to-blue-500' },
  { id: 'forest', value: 'url(#forest)', css: 'bg-gradient-to-tr from-green-400 to-teal-500' },
  { id: 'custom', value: 'url(#custom)', css: 'bg-gradient-to-tr from-gray-400 to-gray-600' },
];

export function InstagramProfilePhotoMaker() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(16);
  const [ringGradient, setRingGradient] = useState('url(#instagram)');
  const [customGradient, setCustomGradient] = useState({ from: '#FFC107', to: '#E91E63'});
  const [ringWidth, setRingWidth] = useState(6);
  const [hasImage, setHasImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setHasImage(true);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
    }
  };

  const downloadImage = (format: 'svg' | 'png') => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    
    if (format === 'svg') {
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profile-photo.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: 'SVG downloaded!' });
    } else { // PNG
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 512, 512);
            URL.revokeObjectURL(url);
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'profile-photo.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast({ title: 'PNG downloaded!' });
        };
        img.src = url;
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Instagram Profile Photo Maker</CardTitle>
        <CardDescription>
          Create a circular profile picture with a custom story ring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
                <Label className="text-lg font-semibold">1. Upload Photo</Label>
                <Button variant="outline" className="w-full h-24 border-dashed text-muted-foreground hover:border-primary hover:text-primary" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2" /> {hasImage ? 'Change Photo' : 'Select Photo'}
                </Button>
                <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">2. Customize Ring</Label>
              <div className="space-y-2">
                <Label>Gradient</Label>
                <div className="grid grid-cols-5 gap-2">
                    {GRADIENTS.map(grad => (
                        <button key={grad.id} onClick={() => setRingGradient(grad.value)} className={`w-full h-8 rounded-md border-2 ${ringGradient === grad.value ? 'border-primary' : 'border-transparent'} ${grad.css}`}></button>
                    ))}
                </div>
              </div>
              {ringGradient === 'url(#custom)' && (
                <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <Input type="color" value={customGradient.from} onChange={e => setCustomGradient({...customGradient, from: e.target.value})} className="p-1 h-10 w-full"/>
                    <Input type="color" value={customGradient.to} onChange={e => setCustomGradient({...customGradient, to: e.target.value})} className="p-1 h-10 w-full"/>
                </div>
              )}
              <div className="space-y-2">
                  <Label>Ring Width: {ringWidth}px</Label>
                  <Slider value={[ringWidth]} onValueChange={(v) => setRingWidth(v[0])} min={0} max={20} step={1} />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">3. Add Text (Optional)</Label>
              <Input placeholder="Your Name" value={text} onChange={e => setText(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Font Size: {fontSize}px</Label>
                    <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={8} max={48} step={1} />
                </div>
                <div className="space-y-2">
                    <Label>Text Color</Label>
                    <Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="p-1 h-10 w-full"/>
                </div>
              </div>
            </div>
            
             <div className="space-y-2 border-t pt-6">
                <h3 className="text-lg font-semibold">4. Download</h3>
                <Button onClick={() => downloadImage('png')} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG (512x512)
                </Button>
                <Button onClick={() => downloadImage('svg')} variant="secondary" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                </Button>
             </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-muted/30 p-8 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center">Live Preview</h3>
            <svg ref={svgRef} width="256" height="256" viewBox="0 0 100 100" className="rounded-full shadow-lg">
                <defs>
                    <linearGradient id="instagram" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFC107" /><stop offset="50%" stopColor="#F44336" /><stop offset="100%" stopColor="#9C27B0" /></linearGradient>
                    <linearGradient id="sunset" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF9800" /><stop offset="100%" stopColor="#E91E63" /></linearGradient>
                    <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00BCD4" /><stop offset="100%" stopColor="#2196F3" /></linearGradient>
                    <linearGradient id="forest" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8BC34A" /><stop offset="100%" stopColor="#009688" /></linearGradient>
                    <linearGradient id="custom" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={customGradient.from} /><stop offset="100%" stopColor={customGradient.to} /></linearGradient>
                    <clipPath id="circle-clip"><circle cx="50" cy="50" r={50 - ringWidth} /></clipPath>
                </defs>
                <rect width="100" height="100" fill={ringGradient} />
                {imageSrc ? (
                    <image href={imageSrc} x="0" y="0" width="100" height="100" clipPath="url(#circle-clip)" preserveAspectRatio="xMidYMid slice" />
                ) : (
                    <g clipPath="url(#circle-clip)">
                        <rect width="100" height="100" fill="#333"/>
                        <User x="25" y="25" width="50" height="50" color="#666" />
                    </g>
                )}
                <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill={textColor} fontSize={fontSize / 4} fontWeight="bold" fontFamily="sans-serif">{text}</text>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

