
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type HeadlineAnalysis = {
  totalScore: number;
  length: { score: number; count: number; };
  sentiment: { score: number; type: 'Positive' | 'Negative' | 'Neutral'; };
  powerWords: { score: number; count: number; words: string[]; };
  clarity: { score: number; };
} | null;

type HeadlineResultsProps = {
  analysis: HeadlineAnalysis;
  isLoading: boolean;
  hasGenerated: boolean;
  headline: string;
};

const getScoreColor = (score: number) => {
  if (score > 75) return 'bg-green-500';
  if (score > 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ScoreCircle = ({ score }: { score: number }) => (
    <div className={`relative h-32 w-32 rounded-full flex items-center justify-center text-white text-4xl font-bold ${getScoreColor(score)}`}>
        {score}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
            <path
                className="text-gray-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className="text-white"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    </div>
);


export function HeadlineAnalyzerResults({ analysis, isLoading, hasGenerated, headline }: HeadlineResultsProps) {

  const renderSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex justify-center mb-6">
            <div className="h-32 w-32 rounded-full bg-muted"></div>
        </div>
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded-md w-full"></div>
            ))}
        </div>
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to analyze?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a headline above to get your score.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Analysis Failed</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
      </div>
  );
  
  const renderResults = () => {
    if (!analysis) return null;

    return (
        <TooltipProvider>
            <div className="space-y-8">
                <div className="flex flex-col items-center gap-4 animate-fade-in">
                    <h3 className="text-xl font-semibold text-center">&quot;{headline}&quot;</h3>
                    <ScoreCircle score={analysis.totalScore} />
                    <p className="text-muted-foreground text-center">
                        This score is based on length, sentiment, power words, and clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Breakdown</h4>
                        
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Word Count ({analysis.length.count})</span>
                                        <span className='font-bold'>{analysis.length.score}/100</span>
                                    </div>
                                    <Progress value={analysis.length.score} className="h-3" indicatorClassName={getScoreColor(analysis.length.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Headlines between 6 and 12 words tend to perform best.</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Sentiment ({analysis.sentiment.type})</span>
                                        <span className='font-bold'>{analysis.sentiment.score}/100</span>
                                    </div>
                                    <Progress value={analysis.sentiment.score} className="h-3" indicatorClassName={getScoreColor(analysis.sentiment.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Positive or strong negative sentiment can increase engagement.</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Clarity Score</span>
                                        <span className='font-bold'>{analysis.clarity.score}/100</span>
                                    </div>
                                    <Progress value={analysis.clarity.score} className="h-3" indicatorClassName={getScoreColor(analysis.clarity.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Based on average word length. Shorter words are often clearer.</p>
                            </TooltipContent>
                        </Tooltip>

                         <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Power Words ({analysis.powerWords.count})</span>
                                        <span className='font-bold'>{analysis.powerWords.score}/100</span>
                                    </div>
                                    <Progress value={analysis.powerWords.score} className="h-3" indicatorClassName={getScoreColor(analysis.powerWords.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Words that trigger an emotional or psychological response.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Suggestions</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {analysis.length.score < 70 && <li>Aim for a word count between 6-12 words.</li>}
                            {analysis.sentiment.score < 50 && <li>Try adding more emotionally resonant words (positive or negative).</li>}
                            {analysis.clarity.score < 60 && <li>Simplify your language. Use shorter, more common words.</li>}
                            {analysis.powerWords.score < 50 && <li>Include at least one "power word" to create urgency or curiosity.</li>}
                            {analysis.totalScore >= 70 && <li>This is a strong headline! Well done.</li>}
                        </ul>
                        
                        {analysis.powerWords.count > 0 && (
                            <div>
                                <h5 className="font-semibold mt-4 mb-2">Power Words Found:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.powerWords.words.map(word => (
                                        <Badge key={word} variant="secondary">{word}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
  }

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Analysis Results</CardTitle>
            <CardDescription>
              {
                isLoading ? "Analyzing your headline..." :
                hasGenerated && analysis ? `Overall Score for "${headline}"` :
                "Your headline analysis will appear here."
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
