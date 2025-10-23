'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Star, Code, Copy, Check } from 'lucide-react';
import JSZip from 'jszip';

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

export function FaviconGenerator() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSourceImage(file);
      generatePreviews(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file (PNG, JPG, etc.).',
      });
    }
  };

  const generatePreviews = (file: File) => {
    const newPreviews: { [key: string]: string } = {};
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            SIZES.forEach(({ name, size }) => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, size, size);
                newPreviews[name] = canvas.toDataURL('image/png');
            });
            setPreviews(newPreviews);
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (Object.keys(previews).length === 0) {
      toast({
        variant: 'destructive',
        title: 'No image uploaded',
        description: 'Please upload an image first.',
      });
      return;
    }

    const zip = new JSZip();

    for (const { name } of SIZES) {
      const dataUrl = previews[name];
      const blob = await (await fetch(dataUrl)).blob();
      zip.file(name, blob);
    }
    
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'favicon_pack.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: 'Favicon pack downloaded!' });
    });
  };

  const htmlCode = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    toast({ title: 'HTML code copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Favicon Pack Generator</CardTitle>
        <CardDescription>
          Create a set of favicons for your website from a single image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div
          className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center h-48"
          onClick={() => fileInputRef.current?.click()}
        >
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {sourceImage ? (
            <div className="flex flex-col items-center gap-2 text-green-500">
              <CheckCircle className="h-10 w-10" />
              <p className="font-semibold">{sourceImage.name}</p>
              <p className="text-xs text-muted-foreground">Ready to generate</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-10 w-10" />
              <p className="font-semibold">Upload Your Logo/Image</p>
              <p className="text-xs">Recommended size: 512x512px</p>
            </div>
          )}
        </div>

        {Object.keys(previews).length > 0 && (
          <div className="space-y-8">
            <div className="border-t pt-8">
                <h3 className="text-xl font-semibold text-center mb-4">Generated Previews</h3>
                <div className="flex justify-center items-end gap-8 bg-muted/30 p-6 rounded-lg">
                    {SIZES.map(({ name, size }) => (
                        <div key={name} className="text-center space-y-2">
                            <img src={previews[name]} alt={`${size}x${size} preview`} className="border rounded-md bg-white p-1" style={{width: size*2, height: size*2}} />
                            <p className="text-xs text-muted-foreground">{name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t pt-8 space-y-4">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center gap-2"><Code /> HTML Code</h3>
                     <Button variant="secondary" onClick={handleCopyCode}>
                        {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? 'Copied' : 'Copy Code'}
                    </Button>
                </div>
                <CardDescription>
                Place these tags in the `&lt;head&gt;` section of your website's HTML.
                </CardDescription>
                <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{htmlCode}</code>
                </pre>
            </div>

            <div className="border-t pt-8 flex justify-center">
                <Button onClick={handleDownload} className="text-lg py-6">
                    <Download className="mr-2 h-5 w-5" />
                    Download Favicon Pack (.zip)
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
