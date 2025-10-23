
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AboutUsData = {
  companyName: string;
  mission: string;
  story: string;
  cta: string;
};

export function AboutUsGenerator() {
  const [data, setData] = useState<AboutUsData>({
    companyName: 'Acme Innovations',
    mission: 'to revolutionize the gadget industry with cutting-edge solutions.',
    story: 'Founded in 2023 by a group of passionate engineers, Acme Innovations started in a small garage with a big idea. We have since grown into a leading provider of innovative gadgets that simplify everyday life.',
    cta: 'Explore our products and join the Acme family today!',
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof AboutUsData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [field]: e.target.value });
  };

  const generatedText = useMemo(() => {
    return `About ${data.companyName}

Welcome to ${data.companyName}!

Our Mission
At ${data.companyName}, our mission is ${data.mission}. We are dedicated to providing the highest quality products and services to our valued customers.

Our Story
${data.story} We believe in the power of innovation, quality, and customer satisfaction, and these values are at the heart of everything we do.

Join Us
${data.cta}`;
  }, [data]);

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast({ title: 'Text copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">"About Us" Page Generator</CardTitle>
        <CardDescription>
          Help your business write a simple "About Us" section using this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Your Business Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" value={data.companyName} onChange={handleInputChange('companyName')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Your Mission</Label>
                <Textarea id="mission" value={data.mission} onChange={handleInputChange('mission')} placeholder="e.g., to provide the best coffee in town..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story">Your Story</Label>
                <Textarea id="story" value={data.story} onChange={handleInputChange('story')} placeholder="e.g., Founded in 2023, we started with a simple idea..." rows={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Input id="cta" value={data.cta} onChange={handleInputChange('cta')} placeholder="e.g., Explore our services today!" />
              </div>
            </div>
          </div>
          {/* Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Generated "About Us" Text</h3>
                <Button variant="secondary" onClick={handleCopy}>
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy
                </Button>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg h-[400px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
              {generatedText}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
