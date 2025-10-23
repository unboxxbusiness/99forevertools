
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check, Sparkles, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Templates for headline generation
const templates = [
  'Announces {topic}',
  'Launches New {topic} to Revolutionize the Industry',
  'Reveals Groundbreaking {topic}',
  'Unveils {topic} for Immediate Release',
  '{topic}: A Game-Changer for the Market',
  'Sets New Standard with {topic}',
  'Expands Services with {topic}',
  'Partners with [Partner Name] to Advance {topic}',
  'Celebrates Milestone with {topic}',
  'FOR IMMEDIATE RELEASE: {topic}',
  'Reports Record Growth Following {topic}',
];

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to generate headlines
const generateHeadlines = (topic: string, count: number): string[] => {
  if (!topic) return [];
  
  const shuffledTemplates = shuffleArray([...templates]);
  const headlines = shuffledTemplates.slice(0, count).map(template =>
    template.replace('{topic}', topic)
  );
  return headlines;
};

export function PressReleaseTitleGenerator() {
  const [topic, setTopic] = useState('');
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [copiedHeadline, setCopiedHeadline] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    const newHeadlines = generateHeadlines(topic, 8);
    setHeadlines(newHeadlines);
  };

  const handleCopy = (headline: string) => {
    navigator.clipboard.writeText(headline);
    setCopiedHeadline(headline);
    toast({ title: 'Headline copied to clipboard!' });
    setTimeout(() => setCopiedHeadline(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Press Release Title Generator</CardTitle>
          <CardDescription>
            Craft compelling headlines for your announcements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="topic" className="text-lg">Enter a Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., New Product, Company Milestone"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <Button onClick={handleGenerate} className="sm:mt-8 h-12 text-lg" disabled={!topic}>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate
            </Button>
          </div>

          {headlines.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-xl font-semibold">Generated Headlines</h3>
              <div className="space-y-3">
                {headlines.map((headline, index) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-lg flex items-center justify-between gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
                    <p className="text-sm font-medium">{headline}</p>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(headline)}>
                      {copiedHeadline === headline ? (
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
                        <li>Enter the core topic of your announcement (e.g., "New Vegan Menu", "Charity Partnership").</li>
                        <li>Click "Generate" to see a list of professionally structured press release titles.</li>
                        <li>The tool inserts your topic into proven headline formats used by journalists and PR professionals.</li>
                        <li>Copy your favorite headline to use for your press release.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Product Launches:</strong> Create impactful headlines when launching a new product or service.</li>
                        <li><strong>Company News:</strong> Announce new hires, funding rounds, or company milestones with a professional title.</li>
                        <li><strong>Event Promotion:</strong> Generate catchy headlines for upcoming workshops, webinars, or store openings.</li>
                        <li><strong>Partnership Announcements:</strong> Craft clear and exciting titles when announcing a new business partnership.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
