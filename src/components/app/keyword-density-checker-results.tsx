'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type KeywordDensityAnalysis = {
  density: number;
  count: number;
  totalWords: number;
} | null;

type KeywordDensityResultsProps = {
  analysis: KeywordDensityAnalysis;
  isLoading: boolean;
  hasGenerated: boolean;
  keyword: string;
};

const getDensityColor = (density: number) => {
  if (density > 0.5 && density < 2.5) return 'text-green-400';
  if (density > 0 && density <= 3.5) return 'text-yellow-400';
  return 'text-red-400';
};

const getFeedbackMessage = (density: number) => {
    if (density === 0) return 'Keyword not found in the text.';
    if (density <= 0.5) return 'A bit low. Consider adding the keyword a few more times naturally.';
    if (density > 0.5 && density < 2.5) return 'Looking good! This is a healthy keyword density.';
    if (density >= 2.5 && density <= 3.5) return 'A little high. Be careful not to sound repetitive.';
    return 'Too high! This could be flagged as keyword stuffing. Reduce keyword usage.';
}

const DensityCircle = ({ density }: { density: number }) => (
    <div className="relative h-36 w-36">
        <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
                className="text-muted/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
            />
            <path
                className={getDensityColor(density)}
                strokeDasharray={`${Math.min(density, 4) * 25}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getDensityColor(density)}`}>{density}%</span>
            <span className="text-sm text-muted-foreground">Density</span>
        </div>
    </div>
);


export function KeywordDensityCheckerResults({ analysis, isLoading, hasGenerated, keyword }: KeywordDensityResultsProps) {

  const renderSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex justify-center mb-6">
            <div className="h-36 w-36 rounded-full bg-muted"></div>
        </div>
        <div className="space-y-4">
            <div className="h-8 bg-muted rounded-md w-3/4 mx-auto"></div>
            <div className="h-6 bg-muted rounded-md w-1/2 mx-auto"></div>
        </div>
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to check your density?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste your text and a keyword above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Analysis Failed</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please check your inputs and try again.
        </p>
      </div>
  );
  
  const renderResults = () => {
    if (!analysis) return null;

    return (
        <TooltipProvider>
            <div className="space-y-8">
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <DensityCircle density={analysis.density} />
                     <p className="text-muted-foreground text-center max-w-md">
                        {getFeedbackMessage(analysis.density)}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t text-center">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Keyword</p>
                        <p className="text-lg font-semibold text-primary">&quot;{keyword}&quot;</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Keyword Count</p>
                        <p className="text-lg font-semibold">{analysis.count}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Words</p>
                        <p className="text-lg font-semibold">{analysis.totalWords}</p>
                    </div>
                </div>
                 <div className="bg-muted/30 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">What is Keyword Density?</h4>
                    <p className="text-sm text-muted-foreground">
                        It's the percentage of times a keyword appears in a text compared to the total word count. For SEO, a healthy density is typically between 0.5% and 2.5%.
                    </p>
                </div>
            </div>
        </TooltipProvider>
    );
  }

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Density Analysis</CardTitle>
            <CardDescription>
              {
                isLoading ? "Analyzing your text..." :
                hasGenerated && analysis ? `Results for the keyword "${keyword}"` :
                "Your analysis will appear here."
              }
            </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !analysis
            ? renderNoResultsState()
            : !hasGenerated || !analysis
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
