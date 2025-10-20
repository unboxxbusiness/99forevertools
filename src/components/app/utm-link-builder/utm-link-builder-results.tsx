'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UtmLinkBuilderResultsProps = {
  url: string;
};

export function UtmLinkBuilderResults({ url }: UtmLinkBuilderResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated URL</CardTitle>
            <CardDescription>Your campaign-ready URL will appear below.</CardDescription>
          </div>
          {url && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy URL'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {url ? (
            <div className="bg-muted/50 p-4 rounded-lg break-words text-sm">
                <code>{url}</code>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-full flex flex-col justify-center">
              <LinkIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your URL will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the required fields on the left to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
