'use client';

import { useState, useRef, useCallback, type SVGProps } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, Gem, Rocket, Shield, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const fontFamilies: { [key: string]: string } = {
  sans: 'Inter, sans-serif',
  serif: 'Georgia, serif',
  mono: 'monospace',
};

const icons: { [key: string]: (props: SVGProps<SVGSVGElement>) => JSX.Element } = {
    none: () => <></>,
    rocket: (props) => <Rocket {...props} />,
    zap: (props) => <Zap {...props} />,
    gem: (props) => <Gem {...props} />,
    shield: (props) => <Shield {...props} />,
    star: (props) => <Star {...props} />,
};
const iconKeys = Object.keys(icons);

type Layout = 'icon-top' | 'icon-left';
type Shape = 'square' | 'rounded' | 'circle';

export function LogoMaker() {
  const [businessName, setBusinessName] = useState('Acme Inc');
  const [font, setFont] = useState('sans');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [selectedIcon, setSelectedIcon] = useState('rocket');
  const [layout, setLayout] = useState<Layout>('icon-top');
  const [shape, setShape] = useState<Shape>('rounded');
  const [fontSize, setFontSize] = useState(40);
  const [padding, setPadding] = useState(20);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

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

  const fontFamily = fontFamilies[font] || fontFamilies.sans;
  const IconComponent = icons[selectedIcon];

  const renderLogoContent = () => {
    const iconSize = fontSize * 1.2;
    const iconProps = {
        color: textColor,
        x: layout === 'icon-left' ? padding : (100 - iconSize) / 2,
        y: layout === 'icon-top' ? padding : (100 - iconSize) / 2,
        width: iconSize,
        height: iconSize,
    };
    
    const textYPosition = layout === 'icon-left' ? 50 : padding + iconSize + (100 - (padding + iconSize) - padding) / 2;

    return (
        <>
            <IconComponent {...iconProps} />
            <text
                x="50%"
                y={`${textYPosition}%`}
                dy=".3em"
                textAnchor="middle"
                fill={textColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
                fontWeight="bold"
                className="group-data-[layout=icon-left]:hidden"
            >
                {businessName}
            </text>
             <text
                x={layout === 'icon-left' ? padding + iconSize + 10 : 50}
                y="50%"
                dy=".3em"
                textAnchor={layout === 'icon-left' ? 'start' : 'middle'}
                fill={textColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
                fontWeight="bold"
                className="group-data-[layout=icon-top]:hidden"
            >
                {businessName}
            </text>
        </>
    )
  }

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

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="font">Font Family</Label>
                    <Select value={font} onValueChange={setFont}>
                        <SelectTrigger id="font"><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                        <SelectTrigger id="icon"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {iconKeys.map(key => <SelectItem key={key} value={key} className="capitalize">{key}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Layout</Label>
                 <RadioGroup value={layout} onValueChange={(v) => setLayout(v as Layout)} className="flex gap-2">
                    <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value="icon-top" className="sr-only" /> Icon Top
                    </Label>
                     <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value="icon-left" className="sr-only" /> Icon Left
                    </Label>
                 </RadioGroup>
            </div>

             <div className="space-y-2">
                <Label>Shape</Label>
                 <RadioGroup value={shape} onValueChange={(v) => setShape(v as Shape)} className="flex gap-2">
                    <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value="square" className="sr-only" /> Square
                    </Label>
                     <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value="rounded" className="sr-only" /> Rounded
                    </Label>
                     <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value="circle" className="sr-only" /> Circle
                    </Label>
                 </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Font Size: {fontSize}px</Label>
                    <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={10} max={60} step={1} />
                </div>
                 <div>
                    <Label>Padding: {padding}px</Label>
                    <Slider value={[padding]} onValueChange={(v) => setPadding(v[0])} min={0} max={40} step={1} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bgColor">Background</Label>
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10"/>
              </div>
              <div>
                <Label htmlFor="textColor">Text & Icon</Label>
                <Input id="textColor" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="p-1 h-10"/>
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
                    viewBox={`0 0 ${100 + padding * 2} ${100 + padding * 2}`}
                    xmlns="http://www.w3.org/2000/svg"
                    className="group"
                    data-layout={layout}
                >
                    <rect 
                        width={100 + padding * 2} 
                        height={100 + padding * 2} 
                        fill={bgColor}
                        rx={shape === 'rounded' ? 15 : (shape === 'circle' ? (50 + padding) : 0)}
                    />
                    <g transform={`translate(${padding} ${padding})`}>
                       {renderLogoContent()}
                    </g>
                </svg>
            </div>
            <div className="text-center w-full max-w-xs">
                <h3 className="text-2xl font-bold p-2" style={{ fontFamily, color: textColor, backgroundColor: bgColor }}>
                    {businessName}
                </h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
