
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link as LinkIcon, Info, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export function ReviewLinkGenerator() {
  const [placeId, setPlaceId] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatedLink = useMemo(() => {
    if (!placeId) return '';
    return `https://search.google.com/local/writereview?placeid=${placeId}`;
  }, [placeId]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: 'Link copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Google Review Link Generator</CardTitle>
        <CardDescription>
          Create a direct link for customers to leave a Google Review for your business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="placeId" className="text-lg">Google Place ID *</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="placeId"
              type="text"
              placeholder="e.g., ChIJN1t_tDeuEmsRUsoyG83frY4"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>How to find your Google Place ID</AlertTitle>
          <AlertDescription>
            You need a Place ID to generate a review link. Use the official {' '}
            <Link href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-primary">
              Google Place ID Finder
            </Link>
            {' '} to find the ID for your business.
          </AlertDescription>
        </Alert>

        {generatedLink && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Your Generated Review Link
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between gap-4 break-all">
              <code className="text-sm">{generatedLink}</code>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button asChild className="w-full">
                <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                    Test Link
                </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
