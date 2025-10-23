
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
  
  const whatsappIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.2-1.3-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6s.2-.3.4-.4c.1-.1.2-.3.3-.4.1-.2 0-.4-.1-.5-.1-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.4-.2.2-.3.5-.3.8s-.1 1.6.5 2.8c.6 1.2 2.1 3.2 5.1 4.5 2.1.9 3.3 1.2 4.5 1.2 1.2 0 2.2-.4 2.8-.8.6-.4.9-1 .9-1.8.1-.8-.1-1.3-.2-1.4-.1-.1-.3-.2-.5-.2h-.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.5c-4.7 0-8.5-3.8-8.5-8.5S7.3 3.5 12 3.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z"/></svg>`;

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
  }
</style>
<div class="whatsapp-widget">
  <a href="${link}" class="whatsapp-button" target="_blank" rel="noopener noreferrer">
    ${whatsappIconSvg}
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2 w-6 h-6"><path fill="currentColor" d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.2-1.3-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6s.2-.3.4-.4c.1-.1.2-.3.3-.4.1-.2 0-.4-.1-.5-.1-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6 0-.2.1-.4.2-.6.4-.2.2-.3.5-.3.8s-.1 1.6.5 2.8c.6 1.2 2.1 3.2 5.1 4.5 2.1.9 3.3 1.2 4.5 1.2 1.2 0 2.2-.4 2.8-.8.6-.4.9-1 .9-1.8.1-.8-.1-1.3-.2-1.4-.1-.1-.3-.2-.5-.2h-.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.5c-4.7 0-8.5-3.8-8.5-8.5S7.3 3.5 12 3.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z"/></svg>
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
