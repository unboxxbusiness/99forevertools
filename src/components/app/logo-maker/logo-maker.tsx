'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Download, Copy, Check, Rocket, Zap, Gem, Shield, Star, Briefcase, Building, Lightbulb, Globe, Heart, Home, Flag, Award, BarChart, Camera, Cloud, Code, Compass, Cpu, CreditCard, Database, GitBranch, Keyboard, Layers, LifeBuoy, Lock, Mail, MousePointer, Package, Phone, PieChart, Puzzle, Server, Settings, ShoppingBag, ShoppingCart, Smartphone, Speaker, Sun, Target, Terminal, ThumbsUp, Wrench, TrafficCone, Train, TreePine, TrendingUp, Truck, Umbrella, Wallet, Watch, Wind } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LogoMaker() {
  const [name, setName] = useState('99forevertools');
  const [tagline, setTagline] = useState('Professional Tools');
  const [font, setFont] = useState('poppins');
  const [bg, setBg] = useState('#ffffff');
  const [text, setText] = useState('#1F2937');
  const [icon, setIcon] = useState('zap');
  const [layout, setLayout] = useState('left');
  const [shape, setShape] = useState('rounded');
  const [fontSize, setFontSize] = useState(28);
  const [tagSize, setTagSize] = useState(14);
  const [pad, setPad] = useState(24);
  const [iconSize, setIconSize] = useState(56);
  const [spacing, setSpacing] = useState(16);
  const [grad, setGrad] = useState(false);
  const [angle, setAngle] = useState(45);
  const [color1, setColor1] = useState('#3B82F6');
  const [color2, setColor2] = useState('#1E40AF');
  const [iconColor, setIconColor] = useState('#3B82F6');
  const [border, setBorder] = useState(false);
  const [bw, setBw] = useState(2);
  const [bc, setBc] = useState('#E5E7EB');
  const [copied, setCopied] = useState(false);

  const svgRef = useRef(null);
  const { toast } = useToast();

  const fonts = {
    inter: 'Inter, sans-serif',
    poppins: '"Poppins", sans-serif',
    playfair: '"Playfair Display", serif',
    georgia: 'Georgia, serif',
    mono: 'Courier New, monospace',
  };

  const palettes = [
    { name: 'Modern', primary: '#3B82F6', secondary: '#1E40AF' },
    { name: 'Vibrant', primary: '#EC4899', secondary: '#BE185D' },
    { name: 'Nature', primary: '#10B981', secondary: '#059669' },
    { name: 'Sunset', primary: '#F97316', secondary: '#EA580C' },
    { name: 'Ocean', primary: '#0EA5E9', secondary: '#0369A1' },
    { name: 'Dark', primary: '#1F2937', secondary: '#111827' },
    { name: 'Luxury', primary: '#7C3AED', secondary: '#5B21B6' },
    { name: 'Fire', primary: '#EF4444', secondary: '#DC2626' },
  ];

  const icons = {
    rocket: Rocket, zap: Zap, gem: Gem, shield: Shield, star: Star,
    briefcase: Briefcase, building: Building, lightbulb: Lightbulb,
    globe: Globe, heart: Heart, home: Home, flag: Flag, award: Award,
    barChart: BarChart, camera: Camera, cloud: Cloud, code: Code,
    compass: Compass, cpu: Cpu, creditCard: CreditCard, database: Database,
    gitBranch: GitBranch, keyboard: Keyboard, layers: Layers,
    lifeBuoy: LifeBuoy, lock: Lock, mail: Mail, mousePointer: MousePointer,
    package: Package, phone: Phone, pieChart: PieChart, puzzle: Puzzle,
    server: Server, settings: Settings, shoppingBag: ShoppingBag,
    shoppingCart: ShoppingCart, smartphone: Smartphone, speaker: Speaker,
    sun: Sun, target: Target, terminal: Terminal, thumbsUp: ThumbsUp,
    wrench: Wrench, trafficCone: TrafficCone, train: Train, treePine: TreePine,
    trendingUp: TrendingUp, truck: Truck, umbrella: Umbrella, wallet: Wallet,
    watch: Watch, wind: Wind,
  };

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svg = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name.replace(/\s+/g, '-').toLowerCase() + '.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'SVG downloaded!' });
  };

  const handleDownloadPNG = (size) => {
    if (!svgRef.current) return;
    const svg = new XMLSerializer().serializeToString(svgRef.current);
    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = name.replace(/\s+/g, '-').toLowerCase() + '-' + size + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: 'PNG ' + size + 'x' + size + ' downloaded!' });
    };
    img.src = URL.createObjectURL(blob);
  };

  const handleCopyCode = () => {
    if (!svgRef.current) return;
    const svg = new XMLSerializer().serializeToString(svgRef.current);
    navigator.clipboard.writeText(svg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'SVG copied!' });
    });
  };

  const w = 100 + pad * 2;
  const h = 100 + pad * 2;
  const IconComponent = icons[icon];
  const fontFamily = fonts[font];
  const br = shape === 'square' ? 0 : shape === 'circle' ? 50 + pad : 20;
  const gx = 50 + 50 * Math.cos((angle * Math.PI) / 180);
  const gy = 50 + 50 * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="w-full space-y-6">
      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Professional Logo Maker</CardTitle>
          <CardDescription>Create logos with gradients, borders, multiple layouts, and export.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full aspect-square max-w-md bg-gradient-to-br from-muted/30 to-muted/50 rounded-2xl p-8 flex items-center justify-center shadow-inner border border-border/40">
                  <svg ref={svgRef} width="100%" height="100%" viewBox={'0 0 ' + w + ' ' + h} xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                    {!grad ? (
                      <rect width={w} height={h} fill={bg} rx={br} stroke={border ? bc : 'none'} strokeWidth={border ? bw : 0} />
                    ) : (
                      <>
                        <defs>
                          <linearGradient id="lg" x1="50%" y1="50%" x2={gx + '%'} y2={gy + '%'}>
                            <stop offset="0%" stopColor={color1} />
                            <stop offset="100%" stopColor={color2} />
                          </linearGradient>
                        </defs>
                        <rect width={w} height={h} fill="url(#lg)" rx={br} stroke={border ? bc : 'none'} strokeWidth={border ? bw : 0} />
                      </>
                    )}
                    <g transform={'translate(' + pad + ' ' + pad + ')'}>
                      {layout !== 'only' && (
                        <>
                          <text x={layout === 'left' ? 15 + iconSize + spacing : layout === 'right' ? 15 : 50} y={layout === 'left' || layout === 'right' ? 50 : 55} textAnchor={layout === 'left' || layout === 'right' ? 'start' : 'middle'} dominantBaseline="middle" fill={text} fontSize={fontSize} fontFamily={fontFamily} fontWeight="700">
                            {name}
                          </text>
                          {tagline && (
                            <text x={layout === 'left' ? 15 + iconSize + spacing : layout === 'right' ? 15 : 50} y={layout === 'left' || layout === 'right' ? 50 + fontSize * 0.65 : 55 + fontSize * 0.65} textAnchor={layout === 'left' || layout === 'right' ? 'start' : 'middle'} dominantBaseline="middle" fill={text} fontSize={tagSize} fontFamily={fontFamily} opacity="0.8">
                              {tagline}
                            </text>
                          )}
                        </>
                      )}
                      {IconComponent && (
                        <g transform={'translate(' + (layout === 'left' ? 15 : layout === 'right' ? 85 - iconSize : 50 - iconSize / 2) + ' ' + (layout === 'left' || layout === 'right' ? 50 - iconSize / 2 : layout === 'only' ? 50 - iconSize / 2 : 10) + ')'}>
                          <IconComponent color={iconColor} width={iconSize} height={iconSize} />
                        </g>
                      )}
                    </g>
                  </svg>
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button onClick={() => handleDownloadPNG(256)} variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> 256</Button>
                  <Button onClick={() => handleDownloadPNG(512)} size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> 512</Button>
                  <Button onClick={() => handleDownloadPNG(1024)} variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> 1024</Button>
                  <Button onClick={handleDownloadSVG} variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> SVG</Button>
                </div>

                <Button onClick={handleCopyCode} variant="ghost" className="w-full">{copied ? <><Check className="w-4 h-4 mr-2" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy SVG</>}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg border-primary/10 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto">
            <CardContent className="pt-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                  <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
                  <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Business Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Your brand" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tagline</Label>
                    <Input value={tagline} onChange={e => setTagline(e.target.value)} maxLength={50} placeholder="Your slogan" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Icon</Label>
                    <Select value={icon} onValueChange={setIcon}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-64">{Object.keys(icons).map(k => (<SelectItem key={k} value={k} className="capitalize">{k}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium mb-2 block">Color Palettes</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {palettes.map(p => (<button key={p.name} onClick={() => { setText(p.primary); setIconColor(p.primary); setColor1(p.primary); setColor2(p.secondary); }} className="h-10 rounded-lg border-2 border-border hover:border-primary transition-all" style={{ background: 'linear-gradient(135deg, ' + p.primary + ', ' + p.secondary + ')' }} title={p.name} />))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Font Family</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.keys(fonts).map(k => (<SelectItem key={k} value={k} className="capitalize">{k}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2"><Label className="text-sm font-medium">Name Size: {fontSize}px</Label><Slider value={[fontSize]} onValueChange={v => setFontSize(v[0])} min={14} max={48} step={1} /></div>
                  <div className="space-y-2"><Label className="text-sm font-medium">Tagline Size: {tagSize}px</Label><Slider value={[tagSize]} onValueChange={v => setTagSize(v[0])} min={8} max={24} step={1} /></div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2"><Label className="text-xs font-medium">Background</Label><Input type="color" value={bg} onChange={e => setBg(e.target.value)} className="h-10 cursor-pointer" /></div>
                    <div className="space-y-2"><Label className="text-xs font-medium">Text Color</Label><Input type="color" value={text} onChange={e => setText(e.target.value)} className="h-10 cursor-pointer" /></div>
                  </div>

                  <div className="space-y-2"><Label className="text-sm font-medium">Icon Color</Label><Input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)} className="h-10 w-full cursor-pointer" /></div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <input type="checkbox" id="grad-toggle" checked={grad} onChange={e => setGrad(e.target.checked)} className="w-4 h-4 rounded" />
                    <Label htmlFor="grad-toggle" className="text-sm font-medium cursor-pointer">Enable Gradient</Label>
                  </div>

                  {grad && (
                    <div className="space-y-3 pt-2">
                      <div><Label className="text-xs">Angle: {angle}°</Label><Slider value={[angle]} onValueChange={v => setAngle(v[0])} min={0} max={360} step={15} /></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs">Color 1</Label><Input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="h-8 w-full cursor-pointer" /></div>
                        <div><Label className="text-xs">Color 2</Label><Input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="h-8 w-full cursor-pointer" /></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <input type="checkbox" id="border-toggle" checked={border} onChange={e => setBorder(e.target.checked)} className="w-4 h-4 rounded" />
                    <Label htmlFor="border-toggle" className="text-sm font-medium cursor-pointer">Add Border</Label>
                  </div>

                  {border && (
                    <div className="space-y-3 pt-2">
                      <div><Label className="text-xs">Width: {bw}px</Label><Slider value={[bw]} onValueChange={v => setBw(v[0])} min={1} max={8} step={1} /></div>
                      <div><Label className="text-xs">Border Color</Label><Input type="color" value={bc} onChange={e => setBc(e.target.value)} className="h-8 w-full cursor-pointer" /></div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Shape</Label>
                    <RadioGroup value={shape} onValueChange={v => setShape(v)}>
                      <div className="grid grid-cols-3 gap-2">
                        {['square', 'rounded', 'circle'].map(s => (<Label key={s} className="text-center border rounded-lg p-2 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer text-xs h-10 flex items-center justify-center"><RadioGroupItem value={s} className="sr-only" /><span className="capitalize">{s}</span></Label>))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Icon Position</Label>
                    <RadioGroup value={layout} onValueChange={v => setLayout(v)}>
                      <div className="grid grid-cols-2 gap-2">
                        {['top', 'left', 'right', 'only'].map(l => (<Label key={l} className="text-center border rounded-lg p-2 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer text-xs h-10 flex items-center justify-center"><RadioGroupItem value={l} className="sr-only" /><span className="capitalize">{l}</span></Label>))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2"><Label className="text-sm font-medium">Icon Size: {iconSize}px</Label><Slider value={[iconSize]} onValueChange={v => setIconSize(v[0])} min={24} max={80} step={2} /></div>
                  <div className="space-y-2"><Label className="text-sm font-medium">Padding: {pad}px</Label><Slider value={[pad]} onValueChange={v => setPad(v[0])} min={0} max={40} step={2} /></div>
                  <div className="space-y-2"><Label className="text-sm font-medium">Icon-Text Spacing: {spacing}px</Label><Slider value={[spacing]} onValueChange={v => setSpacing(v[0])} min={0} max={32} step={2} /></div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
