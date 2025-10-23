
'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QrCode, User, Phone, Mail, Globe, Briefcase, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type VCardData = {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
};

export function DigitalBusinessCardGenerator() {
  const [data, setData] = useState<VCardData>({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Acme Inc.',
    phone: '+1-555-123-4567',
    email: 'john.doe@example.com',
    website: 'https://example.com',
  });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof VCardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [field]: e.target.value });
  };
  
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else if (file) {
        toast({ variant: 'destructive', title: 'Invalid File', description: 'Please select an image file.'});
    }
  };

  const vCardValue = useMemo(() => {
    if (!data.name) return '';
    
    let vCardString = `BEGIN:VCARD\nVERSION:3.0\nN:${data.name}\nFN:${data.name}\n`;
    if (data.title) vCardString += `TITLE:${data.title}\n`;
    if (data.company) vCardString += `ORG:${data.company}\n`;
    if (data.phone) vCardString += `TEL;TYPE=WORK,VOICE:${data.phone}\n`;
    if (data.email) vCardString += `EMAIL:${data.email}\n`;
    if (data.website) vCardString += `URL:${data.website}\n`;
    vCardString += `END:VCARD`;

    return vCardString;
  }, [data]);

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const downloadQrCode = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "digital-business-card-qr.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast({ title: 'QR Code downloaded!' });
        }
    }
  };
  
  const downloadVCard = () => {
    downloadFile(vCardValue, 'contact.vcf', 'text/vcard');
    toast({ title: 'vCard file (.vcf) downloaded!' });
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Instant Digital Business Card Generator</CardTitle>
          <CardDescription>
            Create a shareable digital business card and QR code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Your Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" value={data.name} onChange={handleInputChange('name')} /></div>
                  <div className="space-y-2"><Label htmlFor="title">Title / Position</Label><Input id="title" value={data.title} onChange={handleInputChange('title')} /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" value={data.company} onChange={handleInputChange('company')} /></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" value={data.phone} onChange={handleInputChange('phone')} /></div>
                <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" value={data.email} onChange={handleInputChange('email')} /></div>
                <div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" value={data.website} onChange={handleInputChange('website')} /></div>
                 <div className="space-y-2">
                  <Label htmlFor="profilePic">Profile Picture</Label>
                  <Input id="profilePic" type="file" accept="image/*" ref={fileInputRef} onChange={handleProfilePicChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
              </div>
               <div className="border-t pt-6 space-y-4">
                  <h3 className="text-xl font-semibold">Download Options</h3>
                  <div className="flex gap-4">
                      <Button onClick={downloadQrCode} className="flex-1" disabled={!vCardValue}><QrCode className="mr-2"/> Download QR Code</Button>
                      <Button onClick={downloadVCard} className="flex-1" variant="secondary" disabled={!vCardValue}><User className="mr-2"/> Download vCard (.vcf)</Button>
                  </div>
              </div>
            </div>
            {/* Preview */}
            <div className="space-y-8">
              <div className="bg-muted/30 p-8 rounded-lg shadow-inner flex flex-col items-center justify-center">
                  <div className="w-full max-w-sm bg-card rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105">
                      <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                              {profilePic ? (
                                  <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary"/>
                              ) : (
                                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-primary/50"><User className="w-12 h-12 text-muted-foreground"/></div>
                              )}
                          </div>
                          <h2 className="text-2xl font-bold">{data.name || "Your Name"}</h2>
                          <p className="text-primary">{data.title || "Your Title"}</p>
                          <p className="text-muted-foreground">{data.company || "Your Company"}</p>
                          <div className="border-t w-full my-6"></div>
                          <div className="space-y-3 text-left w-full">
                              {data.phone && <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground"/><span className="text-sm">{data.phone}</span></div>}
                              {data.email && <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground"/><span className="text-sm">{data.email}</span></div>}
                              {data.website && <div className="flex items-center gap-3"><Globe className="h-4 w-4 text-muted-foreground"/><span className="text-sm">{data.website}</span></div>}
                          </div>
                      </div>
                  </div>
              </div>
              {vCardValue && (
                  <div className="flex flex-col items-center justify-center space-y-2">
                      <h3 className="text-lg font-semibold">Scan to Save Contact</h3>
                      <div ref={qrCodeRef} className="p-4 bg-white rounded-lg inline-block">
                          <QRCodeCanvas value={vCardValue} size={128} includeMargin={true} />
                      </div>
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
                        <li>Fill in your contact details: name, title, company, phone, email, and website.</li>
                        <li>Optionally, upload a profile picture to personalize your card.</li>
                        <li>A live preview of your digital business card and a QR code are generated instantly.</li>
                        <li>Download the QR code as a PNG image or the contact information as a .vcf (vCard) file.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Networking Events:</strong> Let new contacts scan your QR code to instantly save your details to their phone.</li>
                        <li><strong>Physical Business Cards:</strong> Add the QR code to your printed business cards for a modern touch.</li>
                        <li><strong>Email Signatures:</strong> Include the QR code in your email signature so recipients can easily save your contact information.</li>
                        <li><strong>Retail Stores:</strong> Display the QR code at your checkout counter for customers to easily save your business details.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
