
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Megaphone, Pointer, Tag, DraftingCompass, ExternalLink, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type UtmParams = {
    url: string;
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
};

type UtmLinkBuilderFormProps = {
  utmParams: UtmParams;
  setUtmParams: (params: UtmParams) => void;
};

export function UtmLinkBuilderForm({ utmParams, setUtmParams }: UtmLinkBuilderFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUtmParams({ ...utmParams, [name]: value });
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">UTM Link Builder</CardTitle>
          <CardDescription>
            Add UTM parameters to your URLs for campaign tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="url">Website URL *</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="url" name="url" placeholder="https://www.example.com" value={utmParams.url} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Campaign Source *</Label>
            <div className="relative">
              <Megaphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="source" name="source" placeholder="e.g., google, newsletter" value={utmParams.source} onChange={handleChange} className="pl-10" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medium">Campaign Medium *</Label>
            <div className="relative">
              <Pointer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="medium" name="medium" placeholder="e.g., cpc, email" value={utmParams.medium} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign Name *</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="campaign" name="campaign" placeholder="e.g., summer_sale" value={utmParams.campaign} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="term">Campaign Term (Optional)</Label>
            <div className="relative">
              <DraftingCompass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="term" name="term" placeholder="e.g., running+shoes" value={utmParams.term} onChange={handleChange} className="pl-10" />
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="content">Campaign Content (Optional)</Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="content" name="content" placeholder="e.g., logolink, textlink" value={utmParams.content} onChange={handleChange} className="pl-10" />
            </div>
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
                        <li>Enter the base URL of the page you want to link to.</li>
                        <li>Fill in the required campaign parameters: Source, Medium, and Name.</li>
                        <li>Optionally, add Term and Content for more detailed tracking.</li>
                        <li>The tool automatically generates a complete URL with all your UTM parameters.</li>
                        <li>Copy the generated URL and use it in your marketing campaigns.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Track Ad Performance:</strong> Create unique links for Google Ads, Facebook Ads, and other platforms to see which ones drive the most traffic and conversions.</li>
                        <li><strong>Monitor Email Campaigns:</strong> Use UTM tags in your email newsletters to track which links are most effective.</li>
                        <li><strong>Social Media ROI:</strong> Find out which social media posts are sending the most valuable traffic to your website.</li>
                        <li><strong>A/B Testing:</strong> Create different links for different versions of an ad or landing page (e.g., using the `utm_content` tag) to see which performs better.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
