
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Check, Trash2, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function CaseConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const conversions = [
    { name: 'Sentence case', transform: toSentenceCase },
    { name: 'lowercase', transform: (s: string) => s.toLowerCase() },
    { name: 'UPPERCASE', transform: (s: string) => s.toUpperCase() },
    { name: 'Title Case', transform: toTitleCase },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Case Converter</CardTitle>
          <CardDescription>
            Instantly convert text to various formats like UPPERCASE, lowercase, Title Case, and Sentence case.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Input</h3>
              <Textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setOutputText(e.target.value);
                }}
                placeholder="Type or paste your text here..."
                className="h-48"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Output</h3>
                  <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!outputText}>
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
              </div>
              <Textarea
                value={outputText}
                readOnly
                placeholder="Converted text will appear here..."
                className="h-48 bg-muted/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {conversions.map((conv) => (
              <Button
                key={conv.name}
                variant="secondary"
                onClick={() => setOutputText(conv.transform(inputText))}
                disabled={!inputText}
              >
                {conv.name}
              </Button>
            ))}
          </div>

          <div className="border-t pt-6 flex justify-end">
            <Button variant="destructive" onClick={handleClear} disabled={!inputText && !outputText}>
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
                        <li>Type or paste the text you want to convert into the "Input" box.</li>
                        <li>Click one of the case buttons (e.g., "UPPERCASE", "Title Case") to transform the text.</li>
                        <li>The converted text will immediately appear in the "Output" box.</li>
                        <li>Click the copy icon to copy the result to your clipboard.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Blog Post Titles:</strong> Quickly format your blog post titles into "Title Case" for a professional look.</li>
                        <li><strong>Email Marketing:</strong> Standardize subject lines or headings in your newsletters.</li>
                        <li><strong>Social Media Posts:</strong> Convert text to UPPERCASE for emphasis or to Sentence case for readability.</li>
                        <li><strong>Product Descriptions:</strong> Ensure consistent capitalization across all your product listings on your e-commerce site.</li>
                        <li><strong>Data Cleaning:</strong> Normalize text data (e.g., names, addresses) before importing it into a spreadsheet or CRM.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
