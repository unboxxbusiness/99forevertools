'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';
import { hslToHex, hexToHsl, generatePalettes, type ColorPalettes } from './color-utils';

const ColorBox = ({ color }: { color: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        toast({ title: `Copied ${color} to clipboard!` });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="h-24 w-full rounded-lg" style={{ backgroundColor: color }} />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={handleCopy} className="text-white flex items-center gap-2 bg-black/50 p-2 rounded-md">
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    {color}
                </button>
            </div>
        </div>
    );
};

const PaletteDisplay = ({ title, colors }: { title: string, colors: string[] }) => (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {colors.map((color, index) => <ColorBox key={`${title}-${index}`} color={color} />)}
        </div>
    </div>
);


export function ColorPaletteGenerator() {
    const [baseColor, setBaseColor] = useState('#f5b342');
    const [palettes, setPalettes] = useState<ColorPalettes | null>(null);

    useEffect(() => {
        const hsl = hexToHsl(baseColor);
        if (hsl) {
            setPalettes(generatePalettes(hsl));
        }
    }, [baseColor]);


    return (
        <Card className="w-full max-w-5xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">Color Palette Generator</CardTitle>
                <CardDescription>
                    Choose a base color to generate harmonious color schemes. Hover over a color to copy its hex code.
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

                {palettes && (
                    <div className="space-y-8 pt-8 border-t">
                        <PaletteDisplay title="Monochromatic" colors={palettes.monochromatic} />
                        <PaletteDisplay title="Analogous" colors={palettes.analogous} />
                        <PaletteDisplay title="Complementary" colors={palettes.complementary} />
                        <PaletteDisplay title="Triadic" colors={palettes.triadic} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
