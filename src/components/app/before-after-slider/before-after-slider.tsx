'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Copy, Check, Code } from 'lucide-react';
import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

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

export function BeforeAfterSliderGenerator() {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);
  const [afterImageUrl, setAfterImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSetBeforeImage = (file: File) => {
    setBeforeImage(file);
    setBeforeImageUrl(URL.createObjectURL(file));
  };
  const handleSetAfterImage = (file: File) => {
    setAfterImage(file);
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
            <div className="w-full max-w-lg mx-auto aspect-square">
              <BeforeAfterSlider
                beforeImage={{ imageUrl: beforeImageUrl }}
                afterImage={{ imageUrl: afterImageUrl }}
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
