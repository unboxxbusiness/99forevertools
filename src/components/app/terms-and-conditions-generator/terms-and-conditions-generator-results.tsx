'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type TermsAndConditionsResultsProps = {
  terms: string;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function TermsAndConditionsGeneratorResults({ terms, isLoading, hasGenerated }: TermsAndConditionsResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!terms) return;
    navigator.clipboard.writeText(terms);
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
        <Skeleton className="h-6 w-3/6" />
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-full flex flex-col justify-center">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Your T&C will appear here</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the details on the left to generate your document.
        </p>
      </div>
  );

  return (
    <div className="animate-fade-in h-full" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated T&C</CardTitle>
            <CardDescription>
                Copy the generated document.
                <span className="font-bold text-destructive"> This is not legal advice.</span>
            </CardDescription>
          </div>
          {terms && !isLoading && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy T&C'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            renderSkeleton()
          ) : hasGenerated && terms ? (
            <div className="bg-muted/50 p-4 rounded-lg overflow-y-auto max-h-96 text-sm leading-relaxed whitespace-pre-wrap">
              {terms}
            </div>
          ) : (
            renderInitialState()
          )}
        </CardContent>
      </Card>
    </div>
  );
}
