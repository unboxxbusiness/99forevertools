'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
// A mock function, replace with your actual AI flow
async function generateBlogPostIdeas(topic: string): Promise<string[]> {
  console.log("Generating ideas for:", topic);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        `10 Common Mistakes in ${topic} and How to Avoid Them`,
        `The Ultimate Beginner's Guide to ${topic}`,
        `${topic} in 2024: Trends and Predictions`,
        `How ${topic} Can Improve Your Business`,
        `A Deep Dive into the Core Concepts of ${topic}`
      ]);
    }, 1500);
  });
}
export function AiBlogPostIdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIdeas([]);
    const generatedIdeas = await generateBlogPostIdeas(topic);
    setIdeas(generatedIdeas);
    setIsLoading(false);
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">AI Blog Post Idea Generator</CardTitle>
        <CardDescription>Never run out of content ideas again.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Enter a Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Digital Marketing, Healthy Recipes"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Ideas
          </Button>
        </form>
        {ideas.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold">Generated Ideas:</h3>
            <ul className="list-disc list-inside mt-2 space-y-2">
              {ideas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
