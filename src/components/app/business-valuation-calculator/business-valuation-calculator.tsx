
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return formatCurrency(0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const INDUSTRY_MULTIPLIERS = {
  'saas': 7,
  'ecommerce': 2,
  'services': 1.5,
  'retail': 0.75,
  'manufacturing': 1.2,
  'media': 3,
};
type Industry = keyof typeof INDUSTRY_MULTIPLIERS;

export function BusinessValuationCalculator() {
  const [annualRevenue, setAnnualRevenue] = useState<number | string>('');
  const [industry, setIndustry] = useState<Industry>('saas');

  const estimatedValuation = useMemo(() => {
    const revenue = Number(String(annualRevenue).replace(/,/g, ''));
    if (isNaN(revenue) || revenue <= 0) {
      return 0;
    }
    const multiplier = INDUSTRY_MULTIPLIERS[industry];
    return revenue * multiplier;
  }, [annualRevenue, industry]);

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
     if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setAnnualRevenue(value);
    }
  };
  
  const formatValue = (value: number | string) => {
    const num = Number(String(value).replace(/,/g, ''));
    return isNaN(num) ? '' : num.toLocaleString('en-IN');
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">"What's My Business Worth?" Calculator</CardTitle>
          <CardDescription>
            Get a fun, simple valuation estimate based on your revenue and industry.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="annual-revenue" className="text-lg">Annual Revenue</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="annual-revenue"
                  type="text"
                  placeholder="e.g., 50,00,000"
                  value={formatValue(annualRevenue)}
                  onChange={handleRevenueChange}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-lg">Industry</Label>
              <Select onValueChange={(value: Industry) => setIndustry(value)} value={industry}>
                <SelectTrigger id="industry" className="h-12 text-lg">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS / Software</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="services">Services (Agency, Consulting)</SelectItem>
                  <SelectItem value="retail">Physical Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="media">Media / Publishing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-8 space-y-4 text-center bg-primary/10 p-6 rounded-lg">
            <p className="text-sm text-primary/80">Estimated Business Valuation</p>
            <p className="text-5xl font-bold text-primary">{formatCurrency(estimatedValuation)}</p>
            <p className="text-muted-foreground">
              Based on a {INDUSTRY_MULTIPLIERS[industry]}x revenue multiple for the {industry.charAt(0).toUpperCase() + industry.slice(1)} industry.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>For Entertainment Purposes Only</AlertTitle>
            <AlertDescription>
              This is a simplified, non-scientific estimate. Real-world business valuations are complex and depend on many factors including profit, growth rate, assets, market conditions, and more.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Enter your business's total annual revenue.</li>
                        <li>Select the industry that best describes your business from the dropdown menu.</li>
                        <li>The tool applies a standard industry multiple to your revenue to provide a rough valuation estimate.</li>
                        <li>The result is a simplified, high-level estimate of your business's potential worth.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>General Interest:</strong> Get a quick, ballpark figure of your business's value out of curiosity.</li>
                        <li><strong>Strategic Planning:</strong> Use the valuation as a benchmark to set future growth goals.</li>
                        <li><strong>Investor Discussions:</strong> Provide a starting point for conversations with potential investors (but always follow up with a professional valuation).</li>
                        <li><strong>Exit Strategy:</strong> Gain a preliminary idea of what your business might be worth if you were to consider selling.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
