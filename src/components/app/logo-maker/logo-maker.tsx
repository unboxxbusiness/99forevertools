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
  const [tagline, setTagline] = useState('Quality Goods');
  const [font, setFont] = useState('sans');
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [selectedIcon, setSelectedIcon] = useState('rocket');
  const [layout, setLayout] = useState<Layout>('icon-top');
  const [shape, setShape] = useState<Shape>('rounded');
  const [fontSize, setFontSize] = useState(32);
  const [taglineFontSize, setTaglineFontSize] = useState(12);
  const [padding, setPadding] = useState(20);
  const [iconTextSpacing, setIconTextSpacing] = useState(8);
  
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
    
    // Base positions
    let iconX = (100 - iconSize) / 2;
    let iconY = 0;
    let textX = 50;
    let textY = iconSize + iconTextSpacing;
    let textAnchor: 'middle' | 'start' = 'middle';

    if (layout === 'icon-left') {
        const totalContentWidth = iconSize + iconTextSpacing + (businessName.length * fontSize * 0.6); // Approximation
        const startX = (100 - totalContentWidth) / 2;
        iconX = startX;
        iconY = (100 - iconSize) / 2;
        textX = startX + iconSize + iconTextSpacing;
        textY = 50;
        textAnchor = 'start';
    }

    return (
      <g>
        {selectedIcon !== 'none' && <IconComponent color={textColor} x={iconX} y={iconY} width={iconSize} height={iconSize} />}
        <text
            x={textX}
            y={textY}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fill={textColor}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontWeight="bold"
        >
            {businessName}
        </text>
        {tagline && (
             <text
                x={textX}
                y={textY + fontSize * 0.8}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill={textColor}
                fontSize={taglineFontSize}
                fontFamily={fontFamily}
                opacity="0.9"
            >
                {tagline}
            </text>
        )}
      </g>
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Advanced Logo Maker</CardTitle>
        <CardDescription>
          Create a simple, text-based logo for your business with more options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Content</h3>
                <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                </div>
                 <div>
                    <Label htmlFor="tagline">Tagline (Optional)</Label>
                    <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Your company slogan" />
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

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Styling</h3>
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
                        <Label>Font Size: {fontSize}px</Label>
                        <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={10} max={50} step={1} />
                    </div>
                </div>
                <div>
                    <Label>Tagline Size: {taglineFontSize}px</Label>
                    <Slider value={[taglineFontSize]} onValueChange={(v) => setTaglineFontSize(v[0])} min={6} max={30} step={1} disabled={!tagline} />
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
            </div>
            
            <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="font-semibold text-lg">Layout</h3>
                 <div className="space-y-2">
                    <Label>Shape</Label>
                    <RadioGroup value={shape} onValueChange={(v) => setShape(v as Shape)} className="flex gap-2">
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="square" className="sr-only" /> Square
                        </Label>
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="rounded" className="sr-only" /> Rounded
                        </Label>
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="circle" className="sr-only" /> Circle
                        </Label>
                    </RadioGroup>
                </div>
                 <div className="space-y-2">
                    <Label>Icon Position</Label>
                    <RadioGroup value={layout} onValueChange={(v) => setLayout(v as Layout)} className="flex gap-2">
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="icon-top" className="sr-only" /> Icon Top
                        </Label>
                        <Label className="flex-1 text-center border rounded-md p-2 has-[:checked]:bg-primary/20 has-[:checked]:border-primary cursor-pointer text-sm h-10 justify-center items-center flex">
                            <RadioGroupItem value="icon-left" className="sr-only" /> Icon Left
                        </Label>
                    </RadioGroup>
                </div>
                <div>
                    <Label>Padding: {padding}px</Label>
                    <Slider value={[padding]} onValueChange={(v) => setPadding(v[0])} min={0} max={50} step={1} />
                </div>
                <div>
                    <Label>Icon-Text Spacing: {iconTextSpacing}px</Label>
                    <Slider value={[iconTextSpacing]} onValueChange={(v) => setIconTextSpacing(v[0])} min={0} max={30} step={1} />
                </div>
            </div>

             <div className="space-y-2 border-t pt-6">
                <Button onClick={downloadPNG} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG (512x512)
                </Button>
                <Button onClick={downloadSVG} variant="secondary" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download SVG
                </Button>
             </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-muted/30 p-8 rounded-lg flex flex-col items-center justify-center space-y-8">
            <div className="w-80 h-80 shadow-lg">
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${100 + padding * 2} ${100 + padding * 2}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect 
                        width={100 + padding * 2} 
                        height={100 + padding * 2} 
                        fill={bgColor}
                        rx={shape === 'rounded' ? 20 : (shape === 'circle' ? (50 + padding) : 0)}
                    />
                    <g transform={`translate(${padding} ${padding})`}>
                       {renderLogoContent()}
                    </g>
                </svg>
            </div>
            <div className="text-center w-full max-w-xs space-y-4">
                <h3 className="text-2xl font-bold p-2" style={{ fontFamily, color: textColor, backgroundColor: bgColor }}>
                    {businessName}
                </h3>
                 {tagline && <p className="text-sm p-2" style={{ fontFamily, color: textColor, backgroundColor: bgColor }}>{tagline}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
