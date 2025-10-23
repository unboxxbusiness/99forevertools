
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Copy, Check, Code } from 'lucide-react';

const ImageUploader = ({
  image,
  setImage,
  title,
}: {
  image: string | null;
  setImage: (file: File) => void;
  title: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
    }
  };

  return (
    <div
      className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors flex flex-col justify-center items-center h-48"
      onClick={() => inputRef.current?.click()}
    >
      <Input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      {image ? (
        <div className="flex flex-col items-center gap-2 text-green-500">
          <CheckCircle className="h-10 w-10" />
          <p className="font-semibold text-sm">Image Loaded</p>
          <img src={image} alt={title} className="max-h-20 rounded-md mt-2" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Upload className="h-10 w-10" />
          <p className="font-semibold">{title}</p>
        </div>
      )}
    </div>
  );
};

const CustomBeforeAfterSlider = ({ beforeImageUrl, afterImageUrl }: { beforeImageUrl: string, afterImageUrl: string }) => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
  
    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = containerRef.current.offsetWidth;
      const newPos = (x / width) * 100;
      if (newPos > 0 && newPos < 100) {
        setSliderPos(newPos);
      }
    };
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleMove(e.clientX);
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleMove(e.touches[0].clientX);
  
    return (
      <div
        ref={containerRef}
        className="relative w-full aspect-square overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <img src={afterImageUrl} alt="After" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img src={beforeImageUrl} alt="Before" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 border-2 border-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
            </div>
        </div>
      </div>
    );
  };

export function BeforeAfterSliderGenerator() {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);
  const [afterImageUrl, setAfterImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSetBeforeImage = (file: File) => {
    setBeforeImage(file);
    if (beforeImageUrl) URL.revokeObjectURL(beforeImageUrl);
    setBeforeImageUrl(URL.createObjectURL(file));
  };
  const handleSetAfterImage = (file: File) => {
    setAfterImage(file);
    if (afterImageUrl) URL.revokeObjectURL(afterImageUrl);
    setAfterImageUrl(URL.createObjectURL(file));
  };

  const embedCode =
    beforeImageUrl && afterImageUrl
      ? `<style>.container{width:500px;height:500px;position:relative;overflow:hidden}.slider{position:absolute;top:0;left:0;width:50%;height:100%;overflow:hidden;border-right:4px solid #fff;z-index:1;pointer-events:none}.slider img{height:100%;width:auto;max-width:none;object-fit:cover;object-position:left}.range{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-appearance:none;background:transparent;z-index:2;cursor:ew-resize}.range::-webkit-slider-thumb{width:4px;height:100%;background:#fff;cursor:ew-resize;-webkit-appearance:none}.range::-moz-range-thumb{width:4px;height:100%;background:#fff;cursor:ew-resize;border:0;border-radius:0}</style><div class="container"><img src="${afterImageUrl}" alt="After"><div class="slider"><img src="${beforeImageUrl}" alt="Before"></div><input type="range" min="0" max="100" value="50" class="range" oninput="document.querySelector('.slider').style.width=this.value+'%'"></div>`
      : '';

  const handleCopyCode = () => {
    if (!embedCode) return;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({ title: 'Embed code copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          'Before and After' Image Slider Generator
        </CardTitle>
        <CardDescription>
          Create a simple embeddable slider, great for service businesses.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageUploader image={beforeImageUrl} setImage={handleSetBeforeImage} title="Upload 'Before' Image" />
          <ImageUploader image={afterImageUrl} setImage={handleSetAfterImage} title="Upload 'After' Image" />
        </div>

        {beforeImageUrl && afterImageUrl && (
          <div className="border-t pt-8 space-y-6">
            <h3 className="text-xl font-semibold text-center">Live Preview</h3>
            <div className="w-full max-w-lg mx-auto">
              <CustomBeforeAfterSlider
                beforeImageUrl={beforeImageUrl}
                afterImageUrl={afterImageUrl}
              />
            </div>
          </div>
        )}
        
        {embedCode && (
           <div className="border-t pt-8 space-y-4">
            <div className="flex justify-between items-center">
                 <h3 className="text-xl font-semibold flex items-center gap-2"><Code /> Embed Code</h3>
                 <Button variant="secondary" onClick={handleCopyCode}>
                    {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy Code'}
                </Button>
            </div>
            <CardDescription>
              Paste this code into your website's HTML where you want the slider to appear.
            </CardDescription>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{embedCode}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
