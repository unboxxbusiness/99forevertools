'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type RobotsTxtGeneratorResultsProps = {
  content: string;
};

export function RobotsTxtGeneratorResults({ content }: RobotsTxtGeneratorResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated robots.txt</CardTitle>
            <CardDescription>Copy this content into a `robots.txt` file in your root directory.</CardDescription>
          </div>
          {content && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy File'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {content ? (
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm h-96">
              <code>{content}</code>
            </pre>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-96 justify-center flex flex-col">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your file content will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure the rules on the left to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
