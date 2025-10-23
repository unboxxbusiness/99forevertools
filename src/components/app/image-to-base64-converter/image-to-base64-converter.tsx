
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Copy, Check, FileCode, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function ImageToBase64Converter() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSourceImage(file);
      convertToBase64(file);
    } else if (file) {
      setSourceImage(null);
      setBase64String('');
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload a supported image file.',
      });
    }
  };
  
  const convertToBase64 = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
          const result = e.target?.result as string;
          setBase64String(result);
          toast({ title: 'Image converted to Base64!' });
      };
      reader.onerror = () => {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to read the file.'});
      }
      reader.readAsDataURL(file);
  }

  const handleCopy = () => {
    if (!base64String) return;
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    toast({ title: 'Base64 string copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Image to Base64 Converter
          </CardTitle>
          <CardDescription>
            Instantly convert your images into Base64 encoded strings.
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
              accept="image/png, image/jpeg, image/webp, image/x-icon, image/bmp, image/avif, image/tiff, image/gif"
            />
            {sourceImage ? (
              <div className="flex flex-col items-center gap-2 text-green-500">
                <CheckCircle className="h-10 w-10" />
                <p className="font-semibold">{sourceImage.name}</p>
                <p className="text-xs text-muted-foreground">Size: {formatBytes(sourceImage.size)}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-10 w-10" />
                <p className="font-semibold">Click to upload an Image</p>
                <p className="text-xs">PNG, JPG, GIF, WEBP, etc.</p>
              </div>
            )}
          </div>
          
          {base64String && (
            <div className="border-t pt-8 space-y-4">
              <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold flex items-center gap-2"><FileCode /> Base64 Output</h3>
                  <Button variant="secondary" onClick={handleCopy}>
                      {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? 'Copied' : 'Copy'}
                  </Button>
              </div>
              <Textarea
                readOnly
                value={base64String}
                className="h-48 font-mono text-xs bg-muted/50"
                placeholder="Your Base64 string will appear here..."
              />
              <p className="text-xs text-muted-foreground">This string is a data URL that you can use directly in CSS or HTML.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Click the upload area to select an image file from your computer.</li>
                        <li>The tool instantly reads the image and converts it into a Base64 data URL.</li>
                        <li>The resulting Base64 string is displayed in the text area.</li>
                        <li>Click the "Copy" button to copy the entire string to your clipboard.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Web Development:</strong> Embed small images directly into your CSS or HTML files to reduce HTTP requests and potentially speed up load times.</li>
                        <li><strong>Email Marketing:</strong> Embed logos or icons directly into your HTML email templates to ensure they display correctly without being blocked.</li>
                        <li><strong>API Payloads:</strong> Send images as part of a JSON payload to an API that requires a Base64 string.</li>
                        <li><strong>Quick Prototyping:</strong> Easily include image data in your code without needing to host the image files separately.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
