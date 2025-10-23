
'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const fontFamilies: { [key: string]: string } = {
  sans: 'Inter, sans-serif',
  serif: 'Georgia, serif',
  mono: 'monospace',
};

export function LogoMaker() {
  const [businessName, setBusinessName] = useState('Acme Inc');
  const [font, setFont] = useState('sans');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [textColor, setTextColor] = useState('#ffffff');
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  const getInitials = useCallback((name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length > 1) {
      return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
    }
    if (words[0]) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return 'AI';
  }, []);

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logo.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'SVG downloaded!' });
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'logo.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast({ title: 'PNG downloaded!' });
    };

    img.src = url;
  };

  const initials = getInitials(businessName);
  const fontFamily = fontFamilies[font] || fontFamilies.sans;

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Basic Logo Maker</CardTitle>
        <CardDescription>
          Create a simple, text-based logo for your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="font">Font Family</Label>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger id="font">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans">Sans Serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bgColor">Background</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="p-1"
                />
              </div>
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="p-1"
                />
              </div>
            </div>
             <div className="space-y-2 border-t pt-6">
                <Button onClick={downloadPNG} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                </Button>
                <Button onClick={downloadSVG} variant="secondary" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                </Button>
             </div>
          </div>

          {/* Preview */}
          <div className="md:col-span-2 bg-muted/30 p-8 rounded-lg flex flex-col items-center justify-center space-y-8">
            <div className="w-64 h-64 shadow-lg">
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="100" height="100" fill={bgColor} />
                    <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="40"
                    fontFamily={fontFamily}
                    fontWeight="bold"
                    >
                    {initials}
                    </text>
                </svg>
            </div>
            <div className="text-center w-full max-w-xs">
                <h3 className="text-2xl font-bold" style={{ fontFamily, color: textColor, backgroundColor: bgColor, padding: '0.5rem' }}>
                    {businessName}
                </h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
