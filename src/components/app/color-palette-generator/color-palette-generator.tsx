'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Info, CheckCircle, XCircle } from 'lucide-react';
import { hexToHsl, generateWebsitePalettes, type WebsitePalette } from './color-utils';
import { Button } from '@/components/ui/button';

const ColorBox = ({ color, name }: { color: string, name: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        toast({ title: `Copied ${name} (${color}) to clipboard!` });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group w-full h-24 rounded-lg" style={{ backgroundColor: color }} onClick={handleCopy}>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 cursor-pointer">
                <div className="text-white flex items-center gap-2">
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    <span className='font-bold'>{name}</span>
                </div>
                <span className="text-sm text-neutral-300 font-mono">{color}</span>
            </div>
        </div>
    );
};

const PalettePreview = ({ palette }: { palette: WebsitePalette }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const cssVariables = `
:root {
    --background: ${palette.background.hsl.h} ${palette.background.hsl.s}% ${palette.background.hsl.l}%;
    --foreground: ${palette.foreground.hsl.h} ${palette.foreground.hsl.s}% ${palette.foreground.hsl.l}%;
    --primary: ${palette.primary.hsl.h} ${palette.primary.hsl.s}% ${palette.primary.hsl.l}%;
    --primary-foreground: ${palette.primaryForeground.hsl.h} ${palette.primaryForeground.hsl.s}% ${palette.primaryForeground.hsl.l}%;
    --accent: ${palette.accent.hsl.h} ${palette.accent.hsl.s}% ${palette.accent.hsl.l}%;
    --accent-foreground: ${palette.accentForeground.hsl.h} ${palette.accentForeground.hsl.s}% ${palette.accentForeground.hsl.l}%;
    /* Other vars for shadcn */
    --card: var(--background);
    --card-foreground: var(--foreground);
    --popover: var(--background);
    --popover-foreground: var(--foreground);
    --secondary: var(--accent);
    --secondary-foreground: var(--accent-foreground);
    --muted: hsl(${palette.background.hsl.h} ${palette.background.hsl.s}% ${palette.background.hsl.l + 5}%);
    --muted-foreground: hsl(${palette.foreground.hsl.h} ${palette.foreground.hsl.s}% ${palette.foreground.hsl.l - 20}%);
    --border: hsl(${palette.background.hsl.h} ${palette.background.hsl.s}% ${palette.background.hsl.l + 10}%);
    --input: hsl(${palette.background.hsl.h} ${palette.background.hsl.s}% ${palette.background.hsl.l + 10}%);
    --ring: ${palette.primary.hsl.h} ${palette.primary.hsl.s}% ${palette.primary.hsl.l}%;
    --radius: 0.5rem;
}`.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssVariables);
        setCopied(true);
        toast({ title: "Copied CSS Variables to clipboard!" });
        setTimeout(() => setCopied(false), 2000);
    };

    const ContrastPill = ({ label, ratio, threshold }: { label: string, ratio: number, threshold: number}) => {
        const passes = ratio >= threshold;
        return (
            <div className={`flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-xs ${passes ? 'border-green-400/50' : 'border-red-400/50'}`}>
                {passes ? <CheckCircle className="h-3 w-3 text-green-400" /> : <XCircle className="h-3 w-3 text-red-400" />}
                <span className="font-medium">{label}:</span>
                <span className="font-mono">{ratio.toFixed(2)}:1</span>
                {!passes && <span className="font-medium text-red-400">(Fail)</span>}
            </div>
        )
    };

    return (
        <div className='border rounded-xl p-4 space-y-4 animate-fade-in'>
            <div className='flex justify-between items-start'>
                <div>
                    <h3 className="text-lg font-semibold">{palette.name}</h3>
                    <p className="text-sm text-muted-foreground">A {palette.type} color scheme.</p>
                </div>
                 <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4 text-green-500 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy CSS
                </Button>
            </div>
            
            <div style={{
                // @ts-ignore
                '--bg': palette.background.hex,
                '--fg': palette.foreground.hex,
                '--pri': palette.primary.hex,
                '--pri-fg': palette.primaryForeground.hex,
                '--acc': palette.accent.hex,
                '--acc-fg': palette.accentForeground.hex,
            }}>
                <div className='bg-[var(--bg)] text-[var(--fg)] p-6 rounded-lg border-2 border-[var(--acc)] space-y-4'>
                    <h4 className='text-xl font-bold'>Example Card</h4>
                    <p>This is some example text to demonstrate the color contrast.</p>
                    <div className='flex gap-2'>
                        <button style={{backgroundColor: 'var(--pri)', color: 'var(--pri-fg)'}} className='px-4 py-2 rounded-md font-semibold text-sm'>Primary Button</button>
                        <button style={{backgroundColor: 'var(--acc)', color: 'var(--acc-fg)'}} className='px-4 py-2 rounded-md font-semibold text-sm'>Accent Button</button>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3'>
                <ColorBox color={palette.background.hex} name="BG" />
                <ColorBox color={palette.foreground.hex} name="FG" />
                <ColorBox color={palette.primary.hex} name="Primary" />
                <ColorBox color={palette.primaryForeground.hex} name="Primary FG" />
                <ColorBox color={palette.accent.hex} name="Accent" />
                <ColorBox color={palette.accentForeground.hex} name="Accent FG" />
            </div>
            
             <div className='space-y-3 pt-3 border-t'>
                 <h4 className='text-sm font-semibold flex items-center gap-2'><Info className='h-4 w-4' />WCAG 2.1 Contrast Ratios</h4>
                 <div className='flex flex-wrap gap-2'>
                    <ContrastPill label="Text on BG" ratio={palette.contrasts.fgOnBg} threshold={4.5} />
                    <ContrastPill label="Primary on BG" ratio={palette.contrasts.primaryOnBg} threshold={3.0} />
                    <ContrastPill label="Accent on BG" ratio={palette.contrasts.accentOnBg} threshold={3.0} />
                    <ContrastPill label="Text on Primary" ratio={palette.contrasts.primaryFgOnPrimary} threshold={4.5} />
                    <ContrastPill label="Text on Accent" ratio={palette.contrasts.accentFgOnAccent} threshold={4.5} />
                 </div>
                 <p className='text-xs text-muted-foreground'>AA standard requires 4.5:1 for normal text and 3:1 for large text/UI components.</p>
             </div>
        </div>
    )
}

export function ColorPaletteGenerator() {
    const [baseColor, setBaseColor] = useState('#f5b342');
    const [palettes, setPalettes] = useState<WebsitePalette[]>([]);

    useEffect(() => {
        const hsl = hexToHsl(baseColor);
        if (hsl) {
            setPalettes(generateWebsitePalettes(hsl));
        }
    }, [baseColor]);

    return (
        <Card className="w-full max-w-5xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Website Color Scheme Generator</CardTitle>
                <CardDescription>
                    Choose a base color to generate accessible, WCAG-compliant color schemes for your website.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex justify-center">
                    <div className="space-y-2 flex flex-col items-center">
                        <Label htmlFor="base-color" className="text-lg">Base Color</Label>
                        <div className="relative">
                            <Input
                                id="base-color"
                                type="text"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-40 h-12 text-center text-lg font-mono"
                            />
                            <Input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {palettes && palettes.length > 0 && (
                    <div className="space-y-8 pt-8 border-t">
                        {palettes.map((palette, i) => (
                           <PalettePreview key={i} palette={palette} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
