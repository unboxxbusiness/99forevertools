'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Frown, PartyPopper, Copy, Check } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type HeadlineResultsProps = {
  headlines: string[];
  isLoading: boolean;
  hasGenerated: boolean;
};

export function HeadlineResults({ headlines, isLoading, hasGenerated }: HeadlineResultsProps) {
  const { toast } = useToast();
  const [copiedLine, setCopiedLine] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLine(text);
    setTimeout(() => setCopiedLine(null), 2000);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const renderSkeleton = () => (
    <div className="space-y-3">
      {[...Array(10)].map((_, i) => (
         <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to create some buzz?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a topic above to generate catchy headlines.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No headlines generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't generate headlines for that topic. Please try a different one.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <div className="space-y-3">
          {headlines.map((line, index) => (
            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
              <span className="text-sm font-medium pr-2">{line}</span>
              <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => copyToClipboard(line)}
              >
                  {copiedLine === line ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ))}
      </div>
       {headlines.length > 0 && 
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Here are {headlines.length} headlines to get you started!</p>
        </div>
       }
    </>
  );
  
  const resultsCount = hasGenerated && !isLoading ? headlines.length : null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Headlines</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is crafting headlines..." :
                resultsCount !== null ? `${resultsCount} headlines generated.` :
                "AI-powered suggestions will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && headlines.length === 0
            ? renderNoResultsState()
            : !hasGenerated && headlines.length === 0
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
