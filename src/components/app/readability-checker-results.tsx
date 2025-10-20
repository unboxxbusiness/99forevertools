'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Frown } from 'lucide-react';

export type ReadabilityAnalysis = {
  score: number;
  wordCount: number;
  sentenceCount: number;
} | null;

type ReadabilityResultsProps = {
  analysis: ReadabilityAnalysis;
  isLoading: boolean;
  hasGenerated: boolean;
};

const getScoreColor = (score: number) => {
  if (score >= 60) return 'text-green-400';
  if (score >= 30) return 'text-yellow-400';
  return 'text-red-400';
};

const getScoreInterpretation = (score: number) => {
  if (score > 90) return { level: 'Very Easy', description: 'Easily understood by an average 11-year-old student.' };
  if (score > 80) return { level: 'Easy', description: 'Easy to read. Conversational English for consumers.' };
  if (score > 70) return { level: 'Fairly Easy', description: 'Fairly easy to read.' };
  if (score > 60) return { level: 'Standard', description: 'Plain English. Easily understood by 13- to 15-year-old students.' };
  if (score > 50) return { level: 'Fairly Difficult', description: 'Fairly difficult to read.' };
  if (score > 30) return { level: 'Difficult', description: 'Difficult to read. Best understood by college graduates.' };
  return { level: 'Very Confusing', description: 'Very difficult to read. Best understood by university graduates.' };
};

const ScoreCircle = ({ score }: { score: number }) => (
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
                className={getScoreColor(score)}
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-sm text-muted-foreground">Flesch Score</span>
        </div>
    </div>
);


export function ReadabilityCheckerResults({ analysis, isLoading, hasGenerated }: ReadabilityResultsProps) {

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
        <h3 className="mt-4 text-lg font-medium">Ready to check your score?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste your text above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Analysis Failed</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong. Please check your text and try again.
        </p>
      </div>
  );
  
  const renderResults = () => {
    if (!analysis) return null;
    const interpretation = getScoreInterpretation(analysis.score);

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center gap-4 animate-fade-in">
                <ScoreCircle score={analysis.score} />
                <div className='text-center'>
                    <h3 className={`text-xl font-bold ${getScoreColor(analysis.score)}`}>{interpretation.level}</h3>
                    <p className="text-muted-foreground text-center max-w-md mt-1">
                        {interpretation.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t text-center">
                 <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Word Count</p>
                    <p className="text-lg font-semibold">{analysis.wordCount}</p>
                </div>
                 <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sentence Count</p>
                    <p className="text-lg font-semibold">{analysis.sentenceCount}</p>
                </div>
            </div>
             <div className="bg-muted/30 p-4 rounded-lg text-center">
                <h4 className="font-semibold mb-2">What is Flesch-Kincaid Reading Ease?</h4>
                <p className="text-sm text-muted-foreground">
                    It's a test that measures how difficult a piece of English text is to understand. The higher the score, the easier it is to read. Scores between 60 and 70 are considered acceptable for most web copy.
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Readability Analysis</CardTitle>
            <CardDescription>
              {
                isLoading ? "Analyzing your text..." :
                hasGenerated && analysis ? `Your text has a score of ${analysis.score}.` :
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
