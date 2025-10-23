
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link2, Loader2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TINYURL_API = 'https://tinyurl.com/api-create.php?url=';

export function URLShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShorten = async () => {
    if (!longUrl) {
      toast({ variant: 'destructive', title: 'URL is required' });
      return;
    }
    
    // Basic URL validation
    try {
        new URL(longUrl);
    } catch (_) {
        toast({ variant: 'destructive', title: 'Invalid URL', description: 'Please enter a valid URL with http:// or https://' });
        return;
    }

    setIsLoading(true);
    setShortUrl('');

    try {
      const response = await fetch(`${TINYURL_API}${encodeURIComponent(longUrl)}`);
      if (response.ok) {
        const data = await response.text();
        setShortUrl(data);
        toast({ title: 'URL shortened successfully!' });
      } else {
        throw new Error('Failed to shorten URL');
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not shorten the URL. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast({ title: 'Short URL copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">URL Shortener</CardTitle>
        <CardDescription>
          Create short, shareable links from long URLs. Powered by TinyURL.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="longUrl" className="text-lg">Enter a long URL</Label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="longUrl"
                    type="url"
                    placeholder="https://example.com/very/long/url/to/shorten"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="pl-10 h-12 text-base"
                />
            </div>
            <Button onClick={handleShorten} disabled={isLoading} className="h-12 text-lg">
              {isLoading ? <Loader2 className="animate-spin" /> : <Link2 className="mr-2" />}
              Shorten
            </Button>
          </div>
        </div>

        {shortUrl && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Your Shortened URL
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
