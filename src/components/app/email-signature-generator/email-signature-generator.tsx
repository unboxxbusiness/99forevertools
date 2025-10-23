'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type SignatureData = {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  imageUrl: string;
};

type Template = 'professional' | 'compact';

const generateSignatures = (data: SignatureData, template: Template) => {
    const { name, title, company, phone, email, website, imageUrl } = data;
    
    const plainText = `${name}
${title} | ${company}
P: ${phone} | E: ${email} | W: ${website}`;

    let html = '';
    if (template === 'professional') {
        html = `<table style="width: 450px; font-family: Arial, sans-serif; font-size: 12px; color: #333;">
  <tr>
    ${imageUrl ? `<td style="width: 100px; vertical-align: top;"><img src="${imageUrl}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%;"></td>` : ''}
    <td style="vertical-align: top; padding-left: 15px; border-left: 2px solid #f5b342;">
      <p style="margin: 0; font-size: 16px; font-weight: bold; color: #000;">${name}</p>
      <p style="margin: 2px 0; color: #555;">${title} | ${company}</p>
      <div style="margin-top: 8px;">
        ${phone ? `<p style="margin: 2px 0;"><strong style="color: #f5b342;">P:</strong> ${phone}</p>` : ''}
        ${email ? `<p style="margin: 2px 0;"><strong style="color: #f5b342;">E:</strong> <a href="mailto:${email}" style="color: #333; text-decoration: none;">${email}</a></p>` : ''}
        ${website ? `<p style="margin: 2px 0;"><strong style="color: #f5b342;">W:</strong> <a href="https://${website}" target="_blank" style="color: #333; text-decoration: none;">${website}</a></p>` : ''}
      </div>
    </td>
  </tr>
</table>`;
    } else if (template === 'compact') {
        html = `<table style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
  <tr>
    ${imageUrl ? `<td style="vertical-align: middle; padding-right: 15px;"><img src="${imageUrl}" alt="Profile" style="width: 70px; height: 70px; border-radius: 8px;"></td>` : ''}
    <td style="vertical-align: middle;">
      <p style="margin: 0; font-size: 16px; font-weight: bold; color: #000;">${name}</p>
      <p style="margin: 2px 0; color: #555;">${title} | ${company}</p>
      <p style="margin: 5px 0; color: #555;">
        ${phone ? `<strong>P:</strong> ${phone}` : ''}
        ${phone && (email || website) ? ' | ' : ''}
        ${email ? `<strong>E:</strong> <a href="mailto:${email}" style="color: #333; text-decoration: none;">${email}</a>` : ''}
        ${email && website ? ' | ' : ''}
        ${website ? `<strong>W:</strong> <a href="https://${website}" target="_blank" style="color: #333; text-decoration: none;">${website}</a>` : ''}
      </p>
    </td>
  </tr>
</table>`;
    }

    return { html, plainText };
}

export function EmailSignatureGenerator() {
  const [data, setData] = useState<SignatureData>({
    name: 'John Doe',
    title: 'Founder & CEO',
    company: 'Acme Inc.',
    phone: '+1 234 567 890',
    email: 'john.doe@acme.com',
    website: 'www.acme.com',
    imageUrl: 'https://picsum.photos/seed/1/100/100',
  });
  const [template, setTemplate] = useState<Template>('professional');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [field]: e.target.value });
  };

  const { html: generatedHtml, plainText: generatedText } = useMemo(() => {
    return generateSignatures(data, template);
  }, [data, template]);

  const handleCopyHtml = () => {
    if (!generatedHtml) return;
    navigator.clipboard.writeText(generatedHtml);
    setCopiedHtml(true);
    toast({ title: 'HTML copied to clipboard!' });
    setTimeout(() => setCopiedHtml(false), 2000);
  };
  
  const handleCopyText = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopiedText(true);
    toast({ title: 'Plain text copied to clipboard!' });
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Email Signature Generator</CardTitle>
        <CardDescription>
          Create a professional email signature. Fill in your details, choose a template, and copy the code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Your Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={data.name} onChange={handleInputChange('name')} /></div>
                <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={data.title} onChange={handleInputChange('title')} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" value={data.company} onChange={handleInputChange('company')} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" value={data.phone} onChange={handleInputChange('phone')} /></div>
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={data.email} onChange={handleInputChange('email')} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" value={data.website} onChange={handleInputChange('website')} /></div>
            <div className="space-y-2"><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" value={data.imageUrl} onChange={handleInputChange('imageUrl')} placeholder="https://..." /></div>
             <div className="space-y-3 pt-4 border-t">
                <Label className="text-lg font-medium">Template</Label>
                <RadioGroup value={template} onValueChange={(v: Template) => setTemplate(v)} className="flex gap-4">
                    <Label className="flex-1 text-center border rounded-md p-3 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                         <RadioGroupItem value="professional" className="sr-only" />
                         Professional
                    </Label>
                    <Label className="flex-1 text-center border rounded-md p-3 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                         <RadioGroupItem value="compact" className="sr-only" />
                         Compact
                    </Label>
                </RadioGroup>
            </div>
          </div>
          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Live Preview</h3>
            <div className="bg-muted/30 p-6 rounded-lg min-h-[150px]">
              <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Get Your Signature</h3>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={handleCopyText}>
                            {copiedText ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            Copy Text
                        </Button>
                        <Button variant="secondary" onClick={handleCopyHtml}>
                            {copiedHtml ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            Copy HTML
                        </Button>
                    </div>
                </div>
                 <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm h-40">
                    <code>{generatedHtml}</code>
                </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
