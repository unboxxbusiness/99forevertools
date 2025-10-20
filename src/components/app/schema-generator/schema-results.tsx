'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SchemaResultsProps = {
  schema: string;
};

export function SchemaResults({ schema }: SchemaResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(schema);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated Schema</CardTitle>
            <CardDescription>Copy and paste this into your website's `<head>` tag.</CardDescription>
          </div>
          {schema && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Schema'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {schema ? (
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<script type="application/ld+json">
${schema}
</script>`}</code>
            </pre>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
              <FileJson className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your schema will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out a form to generate your structured data.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
