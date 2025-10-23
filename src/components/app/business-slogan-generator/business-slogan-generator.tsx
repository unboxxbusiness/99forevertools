
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check, Zap, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
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
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Enter a core keyword that represents your brand's main value (e.g., "Fresh," "Fast," "Secure").</li>
                        <li>Click the "Generate" button.</li>
                        <li>The tool will produce a list of slogans by inserting your keyword into proven, high-impact tagline templates.</li>
                        <li>Browse the generated slogans and copy your favorite ones to use in your marketing materials.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Marketing Campaigns:</strong> Create memorable taglines for your ads, social media posts, and brochures.</li>
                        <li><strong>Website Headers:</strong> Use a catchy slogan on your website's homepage to immediately grab visitors' attention.</li>
                        <li><strong>Business Cards:</strong> Add a professional and memorable slogan to your business cards.</li>
                        <li><strong>Social Media Bios:</strong> Summarize your brand's promise in a short, powerful slogan for your social media profiles.</li>
                        <li><strong>Branding:</strong> Find the perfect tagline that encapsulates your brand's mission and values.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
