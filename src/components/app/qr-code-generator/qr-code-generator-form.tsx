'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Wifi, User, Palette } from 'lucide-react';
import React, { useEffect } from 'react';

type QrCodeType = 'url' | 'wifi' | 'vcard';

export type QrCodeConfig = {
  type: QrCodeType;
  value: string;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  url: string;
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
};

type QrCodeGeneratorFormProps = {
  config: QrCodeConfig;
  setConfig: (config: QrCodeConfig) => void;
};

export function QrCodeGeneratorForm({ config, setConfig }: QrCodeGeneratorFormProps) {

  const handleInputChange = (field: keyof QrCodeConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [field]: e.target.value });
  };
  
  const handleSelectChange = (field: keyof QrCodeConfig) => (value: string) => {
     setConfig({ ...config, [field]: value });
  };

  const handleTabChange = (type: string) => {
    setConfig({ ...config, type: type as QrCodeType });
  };

  useEffect(() => {
    let value = '';
    switch (config.type) {
      case 'url':
        value = config.url;
        break;
      case 'wifi':
        value = `WIFI:T:${config.encryption};S:${config.ssid};P:${config.password};;`;
        break;
      case 'vcard':
        value = `BEGIN:VCARD\nVERSION:3.0\nN:${config.lastName};${config.firstName}\nFN:${config.firstName} ${config.lastName}\nTEL:${config.phone}\nEMAIL:${config.email}\nURL:${config.website}\nEND:VCARD`;
        break;
    }
    setConfig({ ...config, value });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type, config.url, config.ssid, config.password, config.encryption, config.firstName, config.lastName, config.phone, config.email, config.website]);

  return (
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">QR Code Generator</CardTitle>
        <CardDescription>
          Create a QR code for a website, Wi-Fi network, or contact card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url"><Globe className="mr-2 h-4 w-4"/>URL</TabsTrigger>
            <TabsTrigger value="wifi"><Wifi className="mr-2 h-4 w-4"/>Wi-Fi</TabsTrigger>
            <TabsTrigger value="vcard"><User className="mr-2 h-4 w-4"/>Contact</TabsTrigger>
          </TabsList>
          
          <div className="pt-6 space-y-6">
            <TabsContent value="url" className="space-y-4 m-0">
                <div className="space-y-2">
                    <Label htmlFor="url">Website URL *</Label>
                    <Input id="url" value={config.url} onChange={handleInputChange('url')} placeholder="https://example.com" />
                </div>
            </TabsContent>
            <TabsContent value="wifi" className="space-y-4 m-0">
                <div className="space-y-2">
                    <Label htmlFor="ssid">Network Name (SSID) *</Label>
                    <Input id="ssid" value={config.ssid} onChange={handleInputChange('ssid')} placeholder="YourNetworkName" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={config.password} onChange={handleInputChange('password')} placeholder="Your-Network-Password" />
                </div>
                <div className="space-y-2">
                    <Label>Encryption</Label>
                    <Select onValueChange={handleSelectChange('encryption')} value={config.encryption}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WPA">WPA/WPA2</SelectItem>
                            <SelectItem value="WEP">WEP</SelectItem>
                            <SelectItem value="nopass">None</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </TabsContent>
            <TabsContent value="vcard" className="space-y-4 m-0">
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
            </TabsContent>

            <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium flex items-center"><Palette className="mr-2 h-5 w-5"/>Customization</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fgColor">Foreground Color</Label>
                        <Input id="fgColor" type="color" value={config.fgColor} onChange={handleInputChange('fgColor')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bgColor">Background Color</Label>
                        <Input id="bgColor" type="color" value={config.bgColor} onChange={handleInputChange('bgColor')} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Error Correction</Label>
                    <Select onValueChange={handleSelectChange('level')} value={config.level}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="L">Low (7%)</SelectItem>
                            <SelectItem value="M">Medium (15%)</SelectItem>
                            <SelectItem value="Q">Quartile (25%)</SelectItem>
                            <SelectItem value="H">High (30%)</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
