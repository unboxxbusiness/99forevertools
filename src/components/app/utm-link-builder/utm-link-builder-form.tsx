'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Megaphone, Pointer, Tag, DraftingCompass, ExternalLink } from 'lucide-react';

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
  );
}
