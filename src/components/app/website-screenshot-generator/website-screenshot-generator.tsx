
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, Globe, Camera, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function WebsiteScreenshotGenerator() {
  const [url, setUrl] = useState('');
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCapture = async () => {
    if (!url) {
      toast({
        variant: 'destructive',
        title: 'URL is required',
        description: 'Please enter a website URL to capture.',
      });
      return;
    }

    setIsLoading(true);
    setScreenshotData(null);

    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&screenshot=true`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (response.ok && data.lighthouseResult?.audits?.['final-screenshot']?.details?.data) {
        setScreenshotData(data.lighthouseResult.audits['final-screenshot'].details.data);
        toast({ title: 'Screenshot captured!' });
      } else {
        throw new Error(data.error?.message || 'Failed to capture screenshot. The URL might be invalid or unreachable.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Could not fetch the screenshot.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!screenshotData) return;
    const link = document.createElement('a');
    link.href = screenshotData;
    link.download = `screenshot-${new URL(url).hostname}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Website Screenshot Generator</CardTitle>
        <CardDescription>
          Enter a URL to get a full-page screenshot of any website.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full space-y-2">
            <Label htmlFor="url" className="text-lg">Website URL *</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
          </div>
          <Button onClick={handleCapture} disabled={isLoading} className="sm:mt-8 h-12 text-lg">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Camera className="mr-2 h-5 w-5" />
            )}
            Capture
          </Button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-center mb-4">Screenshot Preview</h3>
          <div className="bg-muted/30 p-4 rounded-lg min-h-[400px] flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-full h-full min-h-[400px]" />
            ) : screenshotData ? (
              <div className="space-y-4 animate-fade-in text-center">
                <img src={screenshotData} alt="Website screenshot" className="rounded-md border-2 border-border max-w-full" />
                <Button onClick={handleDownload} className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Screenshot
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Your screenshot will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
