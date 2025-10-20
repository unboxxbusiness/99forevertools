'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown, PartyPopper } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type WhoToContactResultsProps = {
  jobTitles: string[];
  isLoading: boolean;
  hasGenerated: boolean;
};

export function WhoToContactResults({ jobTitles, isLoading, hasGenerated }: WhoToContactResultsProps) {

  const renderSkeleton = () => (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
         <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to find the right people?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a website and service above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No contacts suggested</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't find contacts for that company/service. Please try a different one.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <div className="space-y-3">
          {jobTitles.map((title, index) => (
            <div key={index} className="bg-muted/50 p-3 rounded-md animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
              <p className="text-sm font-medium text-center">{title}</p>
            </div>
          ))}
      </div>
       {jobTitles.length > 0 && 
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Here are {jobTitles.length} potential job titles to target!</p>
        </div>
       }
    </>
  );
  
  const resultsCount = hasGenerated && !isLoading ? jobTitles.length : null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Suggested Contacts</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is searching for contacts..." :
                resultsCount !== null ? `${resultsCount} job titles suggested.` :
                "AI-powered suggestions will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && jobTitles.length === 0
            ? renderNoResultsState()
            : !hasGenerated && jobTitles.length === 0
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
