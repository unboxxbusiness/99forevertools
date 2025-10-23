'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function URLShortener() {
  const [slug, setSlug] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // This runs only on the client, so window is available
    setOrigin(window.location.origin);
  }, []);

  const generateLink = () => {
    if (!slug) {
      toast({ variant: 'destructive', title: 'Slug is required' });
      return;
    }
    if (!destinationUrl) {
      toast({ variant: 'destructive', title: 'Destination URL is required' });
      return;
    }
    
    // Basic URL validation
    try {
        new URL(destinationUrl);
    } catch (_) {
        toast({ variant: 'destructive', title: 'Invalid Destination URL', description: 'Please enter a valid URL with http:// or https://' });
        return;
    }
    
    const url = `${origin}/r/${slug}?to=${encodeURIComponent(destinationUrl)}`;
    setShortUrl(url);
    toast({ title: 'Redirect link generated!' });
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast({ title: 'Link copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">URL Redirect Tool</CardTitle>
        <CardDescription>
          Create a short link on your domain that redirects to a long URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border rounded-lg">
           <div className="space-y-2">
                <Label htmlFor="slug">Short Link Path (Slug)</Label>
                <div className="flex items-center">
                    <span className="text-muted-foreground text-sm p-2 bg-muted/50 rounded-l-md border border-r-0">{origin}/r/</span>
                    <Input
                        id="slug"
                        type="text"
                        placeholder="your-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-'))}
                        className="rounded-l-none h-10"
                    />
                </div>
           </div>
          <div className="space-y-2">
            <Label htmlFor="destinationUrl">Destination URL</Label>
            <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="destinationUrl"
                    type="url"
                    placeholder="https://example.com/very/long/url"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    className="pl-10 h-10"
                />
            </div>
          </div>
        </div>

        <Button onClick={generateLink} className="w-full h-12 text-lg">
          <ExternalLink className="mr-2" />
          Generate Redirect Link
        </Button>

        {shortUrl && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Your Redirect Link
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between gap-4 break-all">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-mono text-sm underline hover:opacity-80">
                {shortUrl}
              </a>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
