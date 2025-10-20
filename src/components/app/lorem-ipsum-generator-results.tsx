'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type LoremIpsumResultsProps = {
  text: string;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function LoremIpsumGeneratorResults({ text, isLoading, hasGenerated }: LoremIpsumResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/6" />
        <Skeleton className="h-6 w-full" />
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-full flex flex-col justify-center">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Your placeholder text will appear here</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure the options on the left to get started.
        </p>
      </div>
  );

  return (
    <div className="animate-fade-in h-full" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Text</CardTitle>
            <CardDescription>Your generated placeholder text is ready to use.</CardDescription>
          </div>
          {text && !isLoading && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            renderSkeleton()
          ) : hasGenerated ? (
            <div className="bg-muted/50 p-4 rounded-lg overflow-y-auto max-h-96 text-sm leading-relaxed whitespace-pre-wrap">
              {text}
            </div>
          ) : (
            renderInitialState()
          )}
        </CardContent>
      </Card>
    </div>
  );
}
