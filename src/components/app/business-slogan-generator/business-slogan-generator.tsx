'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Templates for slogan generation
const templates = [
  '{keyword}. The Best You Can Get.',
  'The Art of {keyword}.',
  'My {keyword}, My Passion.',
  'Experience the Difference of {keyword}.',
  '{keyword}: Perfection in Simplicity.',
  'Unlock Your Potential with {keyword}.',
  '{keyword} for Life.',
  'The Future is {keyword}.',
  'Simply {keyword}.',
  'The Ultimate {keyword} Experience.',
  'Empowering Your {keyword}.',
  '{keyword}, Redefined.',
  'Choose {keyword}. Choose Excellence.',
  'Quality {keyword}, Quality Life.',
  'The Heart of {keyword}.'
];

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to generate slogans
const generateSlogans = (keyword: string, count: number): string[] => {
  if (!keyword) return [];
  
  const shuffledTemplates = shuffleArray([...templates]);
  const slogans = shuffledTemplates.slice(0, count).map(template =>
    template.replace('{keyword}', keyword)
  );
  return slogans;
};


export function BusinessSloganGenerator() {
  const [keyword, setKeyword] = useState('');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [copiedSlogan, setCopiedSlogan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    const newSlogans = generateSlogans(keyword, 10);
    setSlogans(newSlogans);
  };

  const handleCopy = (slogan: string) => {
    navigator.clipboard.writeText(slogan);
    setCopiedSlogan(slogan);
    toast({ title: 'Slogan copied to clipboard!' });
    setTimeout(() => setCopiedSlogan(null), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Business Slogan Generator</CardTitle>
        <CardDescription>
          Generate catchy taglines based on keywords for your business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full space-y-2">
            <Label htmlFor="keyword" className="text-lg">Enter a Keyword</Label>
            <Input
              id="keyword"
              placeholder="e.g., Quality, Speed, Innovation"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-12 text-lg"
            />
          </div>
          <Button onClick={handleGenerate} className="sm:mt-8 h-12 text-lg" disabled={!keyword}>
            <Zap className="mr-2 h-5 w-5" />
            Generate
          </Button>
        </div>

        {slogans.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-xl font-semibold">Generated Slogans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slogans.map((slogan, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg flex items-center justify-between gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
                  <p className="text-sm font-medium">{slogan}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(slogan)}>
                    {copiedSlogan === slogan ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
