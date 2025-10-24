'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { generateStory, type StoryInput, type StoryOutput } from '@/ai/flows/story-generator-flow';

export default function AiBusinessStoryGeneratorPage() {
  const [form, setForm] = useState<StoryInput>({
    companyName: '',
    industry: '',
    values: '',
  });
  const [result, setResult] = useState<StoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    try {
      const story = await generateStory(form);
      setResult(story);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">AI Business Story Generator</CardTitle>
            <CardDescription>Generate a compelling brand story with AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={form.companyName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" value={form.industry} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="values">Core Values (comma separated)</Label>
                <Input id="values" name="values" value={form.values} onChange={handleInputChange} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Story
              </Button>
            </form>

            {result && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold">Generated Story</h3>
                <div className="mt-4 space-y-4 bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{result.story}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
