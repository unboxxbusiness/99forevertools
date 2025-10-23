
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

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
  );
}
