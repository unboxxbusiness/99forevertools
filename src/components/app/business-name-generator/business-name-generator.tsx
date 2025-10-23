'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check, Zap, PenSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const prefixes = ['Aura', 'Zen', 'Nova', 'Apex', 'Ever', 'Synergy', 'Bright', 'Quantum', 'Stellar', 'Veridian'];
const suffixes = ['ify', 'ly', 'Co', 'Works', 'Lab', 'Solutions', 'Group', 'Ventures', 'Hub', 'Sphere'];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateNames = (keyword: string, count: number): string[] => {
  if (!keyword) return [];
  
  const keywordCapitalized = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
  const names = new Set<string>();

  // Type 1: Prefix + Keyword
  shuffleArray([...prefixes]).slice(0, count / 3).forEach(prefix => {
    names.add(`${prefix}${keywordCapitalized}`);
  });

  // Type 2: Keyword + Suffix
  shuffleArray([...suffixes]).slice(0, count / 3).forEach(suffix => {
    names.add(`${keywordCapitalized}${suffix}`);
  });
  
  // Type 3: Simple variations
  names.add(`The ${keywordCapitalized} Co.`);
  names.add(`${keywordCapitalized} & Co.`);
  names.add(`${keywordCapitalized} Collective`);
  names.add(`${keywordCapitalized} Labs`);

  return Array.from(names).slice(0, count);
};

export function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    const newNames = generateNames(keyword, 15);
    setNames(newNames);
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    toast({ title: 'Name copied to clipboard!' });
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Business Name Generator</CardTitle>
        <CardDescription>
          Generate potential names for your new business or product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full space-y-2">
            <Label htmlFor="keyword" className="text-lg">Enter a Keyword</Label>
             <div className="relative">
                <PenSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="keyword"
                  placeholder="e.g., Coffee, Tech, Bloom"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-12 text-lg pl-10"
                />
            </div>
          </div>
          <Button onClick={handleGenerate} className="sm:mt-8 h-12 text-lg" disabled={!keyword}>
            <Zap className="mr-2 h-5 w-5" />
            Generate
          </Button>
        </div>

        {names.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-xl font-semibold">Generated Names</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {names.map((name, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg flex items-center justify-between gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
                  <p className="text-sm font-medium">{name}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(name)}>
                    {copiedName === name ? (
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
