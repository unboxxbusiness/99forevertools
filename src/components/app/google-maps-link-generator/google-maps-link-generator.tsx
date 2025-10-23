
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link as LinkIcon, MapPin, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function GoogleMapsLinkGenerator() {
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatedLink = useMemo(() => {
    if (!address) return '';
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }, [address]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: 'Link copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Google Maps Link Generator</CardTitle>
          <CardDescription>
            Create a direct shareable link to any address on Google Maps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-lg">Full Business Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                type="text"
                placeholder="e.g., 1600 Amphitheatre Parkway, Mountain View, CA"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
          </div>

          {generatedLink && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Your Generated Link
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between gap-4 break-all">
                <code className="text-sm">{generatedLink}</code>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Button asChild className="w-full">
                  <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                      Test Link
                  </a>
              </Button>
            </div>
          )}
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
                        <li>Enter the full address of your business location.</li>
                        <li>The tool automatically generates a direct Google Maps link for that address.</li>
                        <li>Copy the generated link to share with your customers.</li>
                        <li>You can also click "Test Link" to see the result on Google Maps.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Contact Page:</strong> Add a "Get Directions" button on your website's contact page.</li>
                        <li><strong>Email Signatures:</strong> Include a link to your physical store or office in your email signature.</li>
                        <li><strong>Social Media:</strong> Share the link in your social media profiles or posts to help customers find you.</li>
                        <li><strong>Appointment Confirmations:</strong> Send the link in appointment confirmation emails or messages so clients can easily navigate to your location.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
