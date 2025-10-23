
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link as LinkIcon, Phone, Pilcrow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WhatsAppLinkGenerator() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatedLink = useMemo(() => {
    if (!phoneNumber) return '';
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  }, [phoneNumber, message]);

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: 'Link copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">WhatsApp Link Generator</CardTitle>
        <CardDescription>
          Create a `wa.me` link with a pre-filled message.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-lg">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="e.g., 919876543210 (include country code)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg">Pre-filled Message (Optional)</Label>
            <div className="relative">
              <Pilcrow className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                placeholder="e.g., Hello! I'm interested in your product."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pl-10"
                rows={4}
              />
            </div>
          </div>
        </div>

        {phoneNumber && (
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
