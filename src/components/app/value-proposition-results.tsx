'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Frown, PartyPopper, Copy, Check } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type ValuePropositionResultsProps = {
  valueProposition: string;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function ValuePropositionResults({ valueProposition, isLoading, hasGenerated }: ValuePropositionResultsProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const renderSkeleton = () => (
    <div className="space-y-3">
       <Skeleton className="h-6 w-full" />
       <Skeleton className="h-6 w-4/5" />
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to define your value?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form above to generate your unique value proposition.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No value proposition generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't generate a statement for that input. Please try again.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <div className="bg-muted/50 p-6 rounded-lg animate-fade-in relative">
        <blockquote className="text-lg font-medium pr-12">"{valueProposition}"</blockquote>
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-8 w-8 flex-shrink-0"
            onClick={() => copyToClipboard(valueProposition)}
        >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
       <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
          <PartyPopper className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium">Here's your generated value proposition!</p>
      </div>
    </>
  );
  
  const hasResults = hasGenerated && !isLoading && valueProposition;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Your Value Proposition</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is crafting your statement..." :
                hasResults ? "Your unique value proposition is ready." :
                "Your generated statement will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !valueProposition
            ? renderNoResultsState()
            : !hasGenerated && !valueProposition
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
