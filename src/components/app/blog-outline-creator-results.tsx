'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown, PartyPopper } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import type { BlogOutline } from '@/ai/flows/generate-blog-outline';

type BlogOutlineResultsProps = {
  outline: BlogOutline | null;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function BlogOutlineResults({ outline, isLoading, hasGenerated }: BlogOutlineResultsProps) {

  const renderSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-7 w-1/2" />
          <div className="pl-6 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to structure your post?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a title above to generate a blog post outline.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No outline generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't generate an outline for that topic. Please try a different one.
        </p>
      </div>
  );
  
  const renderResults = () => (
    outline && (
      <>
        <div className="space-y-6">
            {outline.outline.map((section, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms`}}>
                <h2 className="text-xl font-bold text-primary mb-3 flex items-center">
                  <span className="text-primary/50 mr-2 font-mono text-lg">H2</span> {section.heading}
                </h2>
                <ul className="space-y-2 pl-8 list-disc list-outside text-muted-foreground">
                    {section.subheadings.map((sub, subIndex) => (
                        <li key={subIndex} className="flex items-start">
                           <span className="text-primary/50 mr-3 font-mono text-sm mt-1">H3</span> <span>{sub}</span>
                        </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Your blog post outline is ready!</p>
        </div>
      </>
    )
  );
  
  const hasResults = hasGenerated && !isLoading && outline && outline.outline.length > 0;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Outline</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is building your outline..." :
                hasResults ? "Your structured blog post outline." :
                "Your generated outline will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !hasResults
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
