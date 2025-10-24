
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type MetaTagGeneratorFormProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
};

export function MetaTagGeneratorForm({ title, setTitle, description, setDescription }: MetaTagGeneratorFormProps) {
  return (
    <>
      <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in h-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">SERP Details</CardTitle>
          <CardDescription>
            Enter your meta title and description to see a live preview.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Meta Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              placeholder="Your page title"
            />
            <p className="text-xs text-muted-foreground text-right">{title.length} / 60</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Meta Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={155}
              rows={5}
              placeholder="Your page description"
            />
            <p className="text-xs text-muted-foreground text-right">{description.length} / 155</p>
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
                        <li>Enter the meta title for your webpage (aim for under 60 characters).</li>
                        <li>Enter the meta description (aim for under 155 characters).</li>
                        <li>The tool provides a live preview of how your page will likely appear in a Google search result.</li>
                        <li>It also generates the necessary HTML meta tags for you to copy.</li>
                        <li>Paste these tags into the `<head>` section of your website's HTML.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Improve Click-Through Rate:</strong> Write compelling titles and descriptions that entice users to click on your link in search results.</li>
                        <li><strong>SEO Optimization:</strong> Ensure your most important keywords are in your title and description.</li>
                        <li><strong>Brand Consistency:</strong> Preview and standardize how your brand appears across different pages on search engines.</li>
                        <li><strong>Content Planning:</strong> Use the tool to draft and refine your SEO metadata before publishing a new page or blog post.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
