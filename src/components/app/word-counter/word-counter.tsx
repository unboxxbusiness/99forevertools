
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Stats {
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
}

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted/50 p-4 rounded-lg text-center">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<Stats>({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    // Characters
    const characters = text.length;

    // Words (handles multiple spaces and newlines)
    const words = text.trim().split(/\s+/).filter(Boolean).length;

    // Sentences (basic check for . ! ?)
    const sentences = (text.match(/[.!?]+/g) || []).length || (text.trim().length > 0 ? 1 : 0);

    // Paragraphs (split by newlines)
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;

    setStats({ words, characters, sentences, paragraphs });
  }, [text]);

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Word & Character Counter</CardTitle>
          <CardDescription>
            Instantly count words, characters, sentences, and paragraphs in your text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="h-64 text-base"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Words" value={stats.words} />
            <StatCard label="Characters" value={stats.characters} />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
          </div>

          <div className="border-t pt-6 flex justify-end">
            <Button variant="destructive" onClick={handleClear} disabled={!text}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
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
                        <li>Simply start typing or paste any text into the text area.</li>
                        <li>The tool instantly analyzes your text as you type.</li>
                        <li>The counters for words, characters, sentences, and paragraphs update in real-time.</li>
                        <li>Click "Clear" to reset the text area and start over.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Social Media Posts:</strong> Ensure your posts meet character limits for platforms like Twitter.</li>
                        <li><strong>Blog Writing:</strong> Keep track of your article length to meet SEO or readability goals.</li>
                        <li><strong>Email Marketing:</strong> Write concise and impactful emails by monitoring the word count.</li>
                        <li><strong>Ad Copywriting:</strong> Craft ad copy that fits within the strict character limits of platforms like Google Ads.</li>
                        <li><strong>Product Descriptions:</strong> Write detailed but to-the-point product descriptions for your e-commerce store.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
