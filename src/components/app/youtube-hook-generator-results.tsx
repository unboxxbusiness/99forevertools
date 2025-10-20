'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Frown, PartyPopper, Copy, Check } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import type { YoutubeHookGeneratorOutput } from '@/ai/flows/generate-youtube-hook';

type YoutubeHookResultsProps = {
  hook: YoutubeHookGeneratorOutput | null;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function YoutubeHookResults({ hook, isLoading, hasGenerated }: YoutubeHookResultsProps) {
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
       <Skeleton className="h-6 w-5/6" />
       <Skeleton className="h-6 w-3/4" />
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to go viral?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a topic above to generate a killer script hook.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No hook generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          The AI couldn't generate a hook for that topic. Please try again.
        </p>
      </div>
  );
  
  const renderResults = () => (
    hook && (
        <>
        <div className="bg-muted/50 p-6 rounded-lg animate-fade-in relative">
            <p className="text-lg font-medium pr-12 leading-relaxed">"{hook.hook}"</p>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 flex-shrink-0"
                onClick={() => copyToClipboard(hook.hook)}
            >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Here's your attention-grabbing YouTube hook!</p>
        </div>
        </>
    )
  );
  
  const hasResults = hasGenerated && !isLoading && hook;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Hook</CardTitle>
            <CardDescription>
              {
                isLoading ? "AI is writing your script..." :
                hasResults ? "Your viral hook is ready." :
                "Your generated script hook will appear here."
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !hook
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
