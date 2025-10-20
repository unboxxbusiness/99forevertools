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

export type SubjectLineAnalysis = {
    totalScore: number;
    length: { score: number; count: number; };
    spam: { score: number; count: number; words: string[]; };
    emotion: { score: number; positive: number; negative: number; urgency: number; };
    formatting: { score: number; isAllCaps: boolean; hasExcessivePunctuation: boolean; };
} | null;

type SubjectLineResultsProps = {
  analysis: SubjectLineAnalysis;
  isLoading: boolean;
  hasGenerated: boolean;
  subject: string;
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


export function EmailSubjectLineTesterResults({ analysis, isLoading, hasGenerated, subject }: SubjectLineResultsProps) {

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
        <h3 className="mt-4 text-lg font-medium">Ready for analysis?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter a subject line above to see its score.
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
                    <h3 className="text-xl font-semibold text-center">&quot;{subject}&quot;</h3>
                    <ScoreCircle score={analysis.totalScore} />
                    <p className="text-muted-foreground text-center">
                        This score is based on length, spam triggers, emotion, and formatting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Breakdown</h4>
                        
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Length ({analysis.length.count} chars)</span>
                                        <span className='font-bold'>{analysis.length.score}/100</span>
                                    </div>
                                    <Progress value={analysis.length.score} className="h-3" indicatorClassName={getScoreColor(analysis.length.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Subject lines between 30 and 50 characters often perform best.</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Spam Triggers ({analysis.spam.count})</span>
                                        <span className='font-bold'>{analysis.spam.score}/100</span>
                                    </div>
                                    <Progress value={analysis.spam.score} className="h-3" indicatorClassName={getScoreColor(analysis.spam.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Avoid words commonly flagged by spam filters.</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Emotion & Urgency</span>
                                        <span className='font-bold'>{analysis.emotion.score}/100</span>
                                    </div>
                                    <Progress value={analysis.emotion.score} className="h-3" indicatorClassName={getScoreColor(analysis.emotion.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Using emotional or urgent language can increase open rates.</p>
                            </TooltipContent>
                        </Tooltip>

                         <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span>Formatting</span>
                                        <span className='font-bold'>{analysis.formatting.score}/100</span>
                                    </div>
                                    <Progress value={analysis.formatting.score} className="h-3" indicatorClassName={getScoreColor(analysis.formatting.score)} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Avoid using ALL CAPS or excessive punctuation (!!!).</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Suggestions</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {analysis.length.score < 70 && <li>Aim for a character count between 30-50 characters.</li>}
                            {analysis.spam.score < 80 && <li>Try to remove or replace the identified spam trigger words.</li>}
                            {analysis.emotion.score < 50 && <li>Add words that create urgency or a positive emotional response.</li>}
                            {analysis.formatting.score < 100 && <li>Avoid using all caps and multiple exclamation points.</li>}
                            {analysis.totalScore >= 75 && <li>This is a strong subject line! Looks good to send.</li>}
                        </ul>
                        
                        {analysis.spam.count > 0 && (
                            <div>
                                <h5 className="font-semibold mt-4 mb-2">Spam Triggers Found:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.spam.words.map(word => (
                                        <Badge key={word} variant="destructive">{word}</Badge>
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
                isLoading ? "Analyzing your subject line..." :
                hasGenerated && analysis ? `Overall Score for "${subject}"` :
                "Your subject line analysis will appear here."
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
