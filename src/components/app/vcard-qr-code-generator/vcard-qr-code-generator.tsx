
'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, QrCode, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type VCardConfig = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
};

export function VCardQrCodeGenerator() {
  const [config, setConfig] = useState<VCardConfig>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    website: '',
  });

  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof VCardConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  const vCardValue = useMemo(() => {
    if (!config.firstName && !config.lastName && !config.phone && !config.email && !config.website) {
      return '';
    }
    return `BEGIN:VCARD\nVERSION:3.0\nN:${config.lastName};${config.firstName}\nFN:${config.firstName} ${config.lastName}\nTEL:${config.phone}\nEMAIL:${config.email}\nURL:${config.website}\nEND:VCARD`;
  }, [config]);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "vcard-qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast({ title: 'QR Code downloaded!' });
        }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Business Card QR Code Generator</CardTitle>
          <CardDescription>
            Generate a QR code that contains your contact information (vCard).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={config.firstName} onChange={handleInputChange('firstName')} placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={config.lastName} onChange={handleInputChange('lastName')} placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={config.phone} onChange={handleInputChange('phone')} placeholder="+15551234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={config.email} onChange={handleInputChange('email')} placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={config.website} onChange={handleInputChange('website')} placeholder="https://example.com" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 bg-muted/30 p-6 rounded-lg">
              {vCardValue ? (
                <>
                  <div ref={qrCodeRef} className="p-4 bg-white rounded-lg inline-block">
                    <QRCodeCanvas
                      value={vCardValue}
                      size={256}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"
                      includeMargin={true}
                    />
                  </div>
                  <Button onClick={downloadQRCode}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                </>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted w-full h-full justify-center flex flex-col">
                  <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Your QR code will appear here</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your contact details to generate a vCard QR code.
                  </p>
                </div>
              )}
            </div>
          </div>
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
                        <li>Enter your contact details into the form, including your name, phone number, email, and website.</li>
                        <li>As you type, the tool generates a QR code that contains all this information in a vCard format.</li>
                        <li>Click the "Download PNG" button to save the QR code image to your computer.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Business Cards:</strong> Add the QR code to your printed business cards so people can save your contact details with a single scan.</li>
                        <li><strong>Event Banners:</strong> Include the QR code on your booth's banner at trade shows or networking events.</li>
                        <li><strong>Presentations:</strong> End your presentations with a slide containing your QR code for easy networking.</li>
                        <li><strong>Storefronts:</strong> Display the QR code on your shop's window or door for customers to easily save your contact information.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
