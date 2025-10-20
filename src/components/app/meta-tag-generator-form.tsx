'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type MetaTagGeneratorFormProps = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
};

// Character limits
const TITLE_CHAR_LIMIT = 60;
const DESC_CHAR_LIMIT = 160;

export function MetaTagGeneratorForm({ title, setTitle, description, setDescription }: MetaTagGeneratorFormProps) {
    const { toast } = useToast();
    const [copied, setCopied] = useState<'title' | 'desc' | null>(null);

    const handleCopy = (text: string, type: 'title' | 'desc') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        toast({
            title: `Copied ${type === 'title' ? 'Title' : 'Description'}!`,
        });
        setTimeout(() => setCopied(null), 2000);
    };

  return (
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Meta Tag Generator</CardTitle>
        <CardDescription>
          Create optimized title and description tags for Google search.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="meta-title">Meta Title</Label>
                <span className={`text-sm ${title.length > TITLE_CHAR_LIMIT ? 'text-destructive' : 'text-muted-foreground'}`}>{title.length} / {TITLE_CHAR_LIMIT}</span>
            </div>
          <div className="relative">
             <Input
                id="meta-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your meta title"
                className="pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleCopy(title, 'title')}>
                {copied === 'title' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <Label htmlFor="meta-description">Meta Description</Label>
                 <span className={`text-sm ${description.length > DESC_CHAR_LIMIT ? 'text-destructive' : 'text-muted-foreground'}`}>{description.length} / {DESC_CHAR_LIMIT}</span>
            </div>
            <div className="relative">
                <Textarea
                    id="meta-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your meta description"
                    rows={5}
                    className="pr-10"
                />
                 <Button variant="ghost" size="icon" className="absolute right-1 top-2 h-8 w-8" onClick={() => handleCopy(description, 'desc')}>
                    {copied === 'desc' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
