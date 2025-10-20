'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Frown, PartyPopper, Copy, Check } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import type { PasCopyGeneratorOutput } from '@/ai/flows/generate-pas-copy';

type PasCopywriterResultsProps = {
  copy: PasCopyGeneratorOutput | null;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function PasCopywriterResults({ copy, isLoading, hasGenerated }: PasCopywriterResultsProps) {
  const { toast } = useToast();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
    toast({
      title: `${section} copy copied!`,
    });
  };

  const renderSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to write some killer copy?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No copy generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't generate copy for that input. Please try again.
        </p>
      </div>
  );
  
  const renderResults = () => {
    if (!copy?.copy) return null;
    const { problem, agitate, solve } = copy.copy;
    return (
      <div className="space-y-8">
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-primary mb-3">Problem</h3>
          <div className="relative bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground pr-10">{problem}</p>
            <Button
                variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copyToClipboard(problem, 'Problem')}
            >
              {copiedSection === 'Problem' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          <h3 className="text-xl font-bold text-primary mb-3">Agitate</h3>
          <div className="relative bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground pr-10">{agitate}</p>
            <Button
                variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copyToClipboard(agitate, 'Agitate')}
            >
              {copiedSection === 'Agitate' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h3 className="text-xl font-bold text-primary mb-3">Solve</h3>
          <div className="relative bg-muted/50 p-4 rounded-lg">
            <p className="text-muted-foreground pr-10">{solve}</p>
            <Button
                variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copyToClipboard(solve, 'Solve')}
            >
              {copiedSection === 'Solve' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Your persuasive copy is ready!</p>
        </div>
      </div>
    )
  };
  
  const hasResults = hasGenerated && !isLoading && copy;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Copy</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is writing your copy..." :
                hasResults ? "Your persuasive PAS copy." :
                "Your generated copy will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !copy
            ? renderNoResultsState()
            : !hasGenerated
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
