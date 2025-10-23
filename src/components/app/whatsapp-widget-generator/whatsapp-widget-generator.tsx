
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, MessageSquare, Code, Phone, Pilcrow, Palette, Pin } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type WidgetConfig = {
  phone: string;
  message: string;
  buttonText: string;
  position: 'bottom-right' | 'bottom-left';
  bgColor: string;
  textColor: string;
};

const generateEmbedCode = (config: WidgetConfig) => {
  const cleanPhone = config.phone.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(config.message);
  const link = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  const positionStyle = config.position === 'bottom-right' ? 'right: 20px;' : 'left: 20px;';

  return `
<!-- Start 99forevertools WhatsApp Widget -->
<style>
  .whatsapp-widget {
    position: fixed;
    bottom: 20px;
    ${positionStyle}
    z-index: 1000;
  }
  .whatsapp-button {
    background-color: ${config.bgColor};
    color: ${config.textColor};
    padding: 10px 20px;
    border-radius: 25px;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  }
  .whatsapp-button:hover {
    transform: scale(1.05);
  }
  .whatsapp-button svg {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    fill: ${config.textColor};
  }
</style>
<div class="whatsapp-widget">
  <a href="${link}" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 90 90"><path d="M90 43.84a44.11 44.11 0 0 1-44.11 44.12A44.11 44.11 0 0 1 0 43.84a44.11 44.11 0 0 1 44.11-44.11A44.1 44.1 0 0 1 90 43.84zM44.11 6.3a37.54 37.54 0 0 0-37.54 37.54A37.54 37.54 0 0 0 44.11 81.38a37.54 37.54 0 0 0 37.54-37.54A37.54 37.54 0 0 0 44.11 6.3zM67.54 53.43a2.11 2.11 0 0 1-2.84.23l-4.26-2.52a14.63 14.63 0 0 0-6.1-1.61c-1.42 0-2.83.17-4.2.5s-2.93.82-4.23 1.44l-2.13.91a.53.53 0 0 1-.7-.17l-3.35-4.38a.53.53 0 0 1 0-.6l2.13-2.19a.53.53 0 0 0 .03-.7c-1-2-1.74-4-2.28-6.15a.53.53 0 0 1 .28-.63l4.38-2.69a.53.53 0 0 1 .63.1c1.4 2.5 3.1 4.7 5.14 6.64a23.4 23.4 0 0 0 11.45-10.4.53.53 0 0 1 .53-.23l5 .69a.53.53 0 0 1 .45.56c-.8 4.7-2.8 9.1-5.73 12.9z"/></svg>
    ${config.buttonText}
  </a>
</div>
<!-- End 99forevertools WhatsApp Widget -->`.trim();
};

export function WhatsAppWidgetGenerator() {
  const [config, setConfig] = useState<WidgetConfig>({
    phone: '919876543210',
    message: 'Hello! I have a question about your services.',
    buttonText: 'Chat with us!',
    position: 'bottom-right',
    bgColor: '#25D366',
    textColor: '#FFFFFF',
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof WidgetConfig) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfig({ ...config, [field]: e.target.value });
  };
  
  const embedCode = useMemo(() => generateEmbedCode(config), [config]);

  const handleCopy = () => {
    if (!embedCode) return;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({ title: 'Embed code copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const positionClass = config.position === 'bottom-right' ? 'right-5' : 'left-5';

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Floating WhatsApp Widget Generator</CardTitle>
        <CardDescription>
          Create a click-to-chat WhatsApp button for your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone"><Phone className="inline-block mr-2 h-4 w-4"/>WhatsApp Number *</Label>
              <Input id="phone" value={config.phone} onChange={handleInputChange('phone')} placeholder="e.g., 919876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonText"><MessageSquare className="inline-block mr-2 h-4 w-4"/>Button Text</Label>
              <Input id="buttonText" value={config.buttonText} onChange={handleInputChange('buttonText')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message"><Pilcrow className="inline-block mr-2 h-4 w-4"/>Pre-filled Message</Label>
              <Textarea id="message" value={config.message} onChange={handleInputChange('message')} />
            </div>
            <div className="space-y-2">
              <Label><Palette className="inline-block mr-2 h-4 w-4"/>Colors</Label>
              <div className="flex gap-4">
                <Input type="color" value={config.bgColor} onChange={handleInputChange('bgColor')} className="p-1 h-10 w-full" />
                <Input type="color" value={config.textColor} onChange={handleInputChange('textColor')} className="p-1 h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
                <Label><Pin className="inline-block mr-2 h-4 w-4"/>Position</Label>
                <RadioGroup value={config.position} onValueChange={(v) => setConfig({...config, position: v as WidgetConfig['position']})} className="flex gap-4">
                    <Label className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer flex-1">
                        <RadioGroupItem value="bottom-left" /> Bottom Left
                    </Label>
                    <Label className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer flex-1">
                        <RadioGroupItem value="bottom-right" /> Bottom Right
                    </Label>
                </RadioGroup>
            </div>
          </div>
          {/* Preview & Code */}
          <div className="space-y-8">
             <div>
                <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                <div className="bg-muted/30 p-4 rounded-lg h-48 relative overflow-hidden">
                    <p className="text-sm text-muted-foreground text-center">This is a simulation of your website corner.</p>
                     <div className={`absolute bottom-5 ${positionClass} z-10`}>
                        <a href="#" className="flex items-center text-sm px-4 py-2 rounded-full shadow-lg" style={{backgroundColor: config.bgColor, color: config.textColor}}>
                            <svg viewBox="0 0 90 90" className="mr-2 w-6 h-6" style={{fill: config.textColor}}><path d="M90 43.84a44.11 44.11 0 0 1-44.11 44.12A44.11 44.11 0 0 1 0 43.84a44.11 44.11 0 0 1 44.11-44.11A44.1 44.1 0 0 1 90 43.84zM44.11 6.3a37.54 37.54 0 0 0-37.54 37.54A37.54 37.54 0 0 0 44.11 81.38a37.54 37.54 0 0 0 37.54-37.54A37.54 37.54 0 0 0 44.11 6.3zM67.54 53.43a2.11 2.11 0 0 1-2.84.23l-4.26-2.52a14.63 14.63 0 0 0-6.1-1.61c-1.42 0-2.83.17-4.2.5s-2.93.82-4.23 1.44l-2.13.91a.53.53 0 0 1-.7-.17l-3.35-4.38a.53.53 0 0 1 0-.6l2.13-2.19a.53.53 0 0 0 .03-.7c-1-2-1.74-4-2.28-6.15a.53.53 0 0 1 .28-.63l4.38-2.69a.53.53 0 0 1 .63.1c1.4 2.5 3.1 4.7 5.14 6.64a23.4 23.4 0 0 0 11.45-10.4.53.53 0 0 1 .53-.23l5 .69a.53.53 0 0 1 .45.56c-.8 4.7-2.8 9.1-5.73 12.9z"/></svg>
                            {config.buttonText}
                        </a>
                     </div>
                </div>
            </div>
            <div>
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Embed Code</h3>
                    <Button variant="secondary" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        Copy Code
                    </Button>
                </div>
                <CardDescription>Paste this code just before the closing `&lt;/body&gt;` tag on your website.</CardDescription>
                <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-xs h-60 mt-2">
                    <code>{embedCode}</code>
                </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
