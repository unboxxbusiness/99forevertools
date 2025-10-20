'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Bot, Frown, PartyPopper, Copy, Check } from 'lucide-react';
import { downloadAsCSV } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type EmailResultsProps = {
  emails: string[];
  isLoading: boolean;
  hasGenerated: boolean;
};

export function EmailPermutatorResults({ emails, isLoading, hasGenerated }: EmailResultsProps) {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleExport = () => {
    downloadAsCSV(emails, 'generated_emails');
    toast({
      title: 'Exported!',
      description: 'The emails have been downloaded as a CSV file.',
    });
  };

  const copyToClipboard = (text: string, isBulk = false) => {
    navigator.clipboard.writeText(text);
    if (!isBulk) {
        setCopiedEmail(text);
        setTimeout(() => setCopiedEmail(null), 2000);
    }
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const copyAllToClipboard = () => {
    copyToClipboard(emails.join('\n'), true);
  };


  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(12)].map((_, i) => (
         <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to find emails?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No emails generated</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please check your input and try again.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emails.map((email, index) => (
            <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md animate-fade-in" style={{ animationDelay: `${index * 20}ms`}}>
              <span className="text-sm font-mono truncate">{email}</span>
              <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(email)}
              >
                  {copiedEmail === email ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          ))}
      </div>
       {emails.length > 0 && 
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">You've generated {emails.length} possible emails!</p>
        </div>
       }
    </>
  );
  
  const resultsCount = hasGenerated && !isLoading ? emails.length : null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms'}}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Emails</CardTitle>
            <CardDescription>
              {
                isLoading ? "Generating email permutations..." :
                resultsCount !== null ? `${resultsCount} emails generated.` :
                "Generated emails will appear here."
              }
            </CardDescription>
          </div>
          {emails.length > 0 && !isLoading && (
            <div className='flex gap-2'>
              <Button onClick={copyAllToClipboard} variant="secondary">
                <Copy className="mr-2 h-4 w-4" />
                Copy All
              </Button>
              <Button onClick={handleExport} variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && emails.length === 0
            ? renderNoResultsState()
            : !hasGenerated && emails.length === 0
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
