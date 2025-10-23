
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type MetaTagGeneratorFormProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
};

export function MetaTagGeneratorForm({ title, setTitle, description, setDescription }: MetaTagGeneratorFormProps) {
  return (
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
  );
}
