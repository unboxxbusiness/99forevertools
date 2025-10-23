'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Gift } from 'lucide-react';

const CHAR_SETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
};

type CharSet = keyof typeof CHAR_SETS;

const generateCodes = (count: number, length: number, charSet: CharSet, prefix: string, suffix: string): string[] => {
  const characters = CHAR_SETS[charSet];
  const codes = new Set<string>();
  while (codes.size < count) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const fullCode = `${prefix}${result}${suffix}`;
    codes.add(fullCode);
  }
  return Array.from(codes);
};

export function DiscountCouponGenerator() {
  const [count, setCount] = useState(10);
  const [length, setLength] = useState(8);
  const [charSet, setCharSet] = useState<CharSet>('alphanumeric');
  const [prefix, setPrefix] = useState('SALE-');
  const [suffix, setSuffix] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    const newCodes = generateCodes(count, length, charSet, prefix, suffix);
    setGeneratedCodes(newCodes);
    setCopiedAll(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: 'Code copied!' });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyAll = () => {
    const allCodes = generatedCodes.join('\n');
    navigator.clipboard.writeText(allCodes);
    setCopiedAll(true);
    toast({ title: 'All codes copied!' });
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Discount Coupon Code Generator</CardTitle>
        <CardDescription>
          Create batches of unique, random codes for your marketing campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="count">Number of Codes</Label>
              <Input id="count" type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} min={1} max={1000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Code Length</Label>
              <Input id="length" type="number" value={length} onChange={(e) => setLength(parseInt(e.target.value))} min={4} max={32} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="charset">Character Set</Label>
            <Select value={charSet} onValueChange={(v: CharSet) => setCharSet(v)}>
              <SelectTrigger id="charset"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alphanumeric">Alphanumeric (A-Z, 0-9)</SelectItem>
                <SelectItem value="alpha">Alphabetic (A-Z)</SelectItem>
                <SelectItem value="numeric">Numeric (0-9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix</Label>
              <Input id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix</Label>
              <Input id="suffix" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleGenerate} className="w-full text-lg py-6">
            <Gift className="mr-2" />
            Generate Codes
          </Button>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Generated Codes</h3>
            {generatedCodes.length > 0 && (
              <Button variant="secondary" onClick={handleCopyAll}>
                {copiedAll ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                Copy All
              </Button>
            )}
          </div>
          <div className="bg-muted/50 p-4 rounded-lg h-80 overflow-y-auto space-y-2">
            {generatedCodes.length > 0 ? (
              generatedCodes.map((code, index) => (
                <div key={index} className="flex items-center justify-between bg-card p-2 rounded-md animate-fade-in" style={{ animationDelay: `${index * 20}ms` }}>
                  <p className="font-mono text-sm">{code}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(code)}>
                    {copiedCode === code ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Your codes will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
