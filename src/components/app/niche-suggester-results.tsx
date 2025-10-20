'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown, PartyPopper } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import type { NicheSuggestion } from '@/ai/flows/suggest-niches';

type NicheResultsProps = {
  niches: NicheSuggestion[];
  isLoading: boolean;
  hasGenerated: boolean;
};

export function NicheSuggesterResults({ niches, isLoading, hasGenerated }: NicheResultsProps) {

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
           <Skeleton className="h-6 w-1/2 mb-2" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to discover new markets?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a keyword above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No niches generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't find niches for that keyword. Please try a different one.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <div className="space-y-4">
          {niches.map((niche, index) => (
            <div key={index} className="bg-card border border-border/50 p-4 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
              <h3 className="text-lg font-semibold text-primary">{niche.title}</h3>
              <p className="text-muted-foreground mt-1">{niche.description}</p>
            </div>
          ))}
      </div>
       {niches.length > 0 && 
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Here are {niches.length} niche ideas to explore!</p>
        </div>
       }
    </>
  );
  
  const resultsCount = hasGenerated && !isLoading ? niches.length : null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Niche Suggestions</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is brainstorming ideas..." :
                resultsCount !== null ? `${resultsCount} niches suggested.` :
                "AI-powered suggestions will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && niches.length === 0
            ? renderNoResultsState()
            : !hasGenerated && niches.length === 0
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
