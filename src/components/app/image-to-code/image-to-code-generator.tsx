
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Loader2, Code, Copy, Check, Wand2 } from 'lucide-react';
import { imageToCode } from '@/ai/flows/image-to-code-flow';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast({ title: `Copied ${language} to clipboard!` });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={handleCopy}
            >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm h-96">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
};


export function ImageToCodeGenerator() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [sourceImageUrl, setSourceImageUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<{ html: string; css: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        setSourceImage(file);
        setGeneratedCode(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setSourceImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file (PNG, JPG, etc.).',
      });
    }
  };
  
  const handleGenerate = async () => {
    if (!sourceImage || !sourceImageUrl) {
      toast({ variant: 'destructive', title: 'No image selected', description: 'Please upload an image to convert.' });
      return;
    }
    
    setIsLoading(true);
    setGeneratedCode(null);
    
    try {
        const result = await imageToCode({ imageDataUri: sourceImageUrl });
        if (result && result.html) {
            // A simple fix to format the HTML from a string literal
            const formattedHtml = result.html.replace(/\\n/g, '\n').replace(/\\"/g, '"');
            setGeneratedCode({ html: formattedHtml, css: result.css });
            toast({ title: 'Code generated successfully!' });
        } else {
            throw new Error('Invalid response from AI');
        }
    } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Code generation failed', description: 'The AI model could not process the image. Please try another image.' });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Image to Code Generator</CardTitle>
        <CardDescription>
          Turn any website screenshot into clean HTML with Tailwind CSS.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg">
            <div className="flex-1 w-full">
                <Button variant="outline" className="w-full h-24 border-dashed" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2"/>
                    {sourceImage ? 'Change Image' : 'Upload Screenshot'}
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
             <Button onClick={handleGenerate} disabled={isLoading || !sourceImage} className="w-full sm:w-auto text-lg py-6 px-8">
                {isLoading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2 h-5 w-5" />Generate Code</>}
            </Button>
        </div>
        
        {isLoading && (
            <div className="text-center space-y-4">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary"/>
                <p className="text-muted-foreground">The AI is analyzing your image... this may take a moment.</p>
            </div>
        )}

        {generatedCode && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t pt-8">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">HTML</h3>
                <CodeBlock code={generatedCode.html} language="html" />
            </div>
             <div className="space-y-2">
                <h3 className="text-xl font-semibold">CSS (Tailwind)</h3>
                <CodeBlock code={generatedCode.css} language="css" />
            </div>
          </div>
        )}

        {sourceImageUrl && !generatedCode && !isLoading && (
            <div className="border-t pt-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Image Preview</h3>
                <div className="max-w-2xl mx-auto p-4 bg-muted/30 rounded-lg">
                    <img src={sourceImageUrl} alt="Source preview" className="rounded-md border-2 border-border max-w-full" />
                </div>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
