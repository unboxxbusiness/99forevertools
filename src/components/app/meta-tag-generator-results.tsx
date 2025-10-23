
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type MetaTagGeneratorResultsProps = {
  title: string;
  description: string;
};

export function MetaTagGeneratorResults({ title, description }: MetaTagGeneratorResultsProps) {
  const siteUrl = 'www.example.com';
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const metaTags = `<title>${title}</title>\n<meta name="description" content="${description}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    toast({ title: 'Meta tags copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">SERP Preview</CardTitle>
            <CardDescription>
              This is how your page might appear on a Google search results page.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-[#202124] p-6 rounded-lg font-sans border border-gray-700">
              <div className="flex items-center">
                  <div className="w-7 h-7 bg-gray-500 rounded-full mr-3"></div>
                  <div>
                      <div className="text-sm text-gray-200">Your Company</div>
                      <div className="text-xs text-gray-400">{siteUrl} &rsaquo; ...</div>
                  </div>
              </div>
              <h3 className="text-xl text-[#8ab4f8] mt-2 truncate font-medium">
                  {title || 'Your Meta Title Will Appear Here'}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                  {description || 'Your meta description will appear here. Keep it concise and compelling to attract clicks from potential customers.'}
              </p>
          </div>
           <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">HTML Meta Tags</h4>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy Tags'}
                </Button>
            </div>
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{metaTags}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
