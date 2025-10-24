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
import { generateAdCopy, type AdCopyInput, type AdCopyOutput } from '@/ai/flows/ad-copy-flow';

export default function AiAdCopyGeneratorPage() {
  const [form, setForm] = useState<AdCopyInput>({
    productName: '',
    description: '',
    targetAudience: '',
  });
  const [result, setResult] = useState<AdCopyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    try {
      const adCopy = await generateAdCopy(form);
      setResult(adCopy);
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
            <CardTitle className="text-3xl font-bold tracking-tight">AI Ad Copy Generator</CardTitle>
            <CardDescription>Generate compelling ad copy with the power of AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product/Service Name</Label>
                <Input id="productName" name="productName" value={form.productName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={form.description} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input id="targetAudience" name="targetAudience" value={form.targetAudience} onChange={handleInputChange} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Ad Copy
              </Button>
            </form>

            {result && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold">Generated Ad Copy</h3>
                <div className="mt-4 space-y-4 bg-muted p-4 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Headline:</h4>
                    <p>{result.headline}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Body:</h4>
                    <p className="whitespace-pre-wrap">{result.body}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
