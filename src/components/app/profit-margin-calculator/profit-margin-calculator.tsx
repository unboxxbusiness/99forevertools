
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, Briefcase } from 'lucide-react';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return formatCurrency(0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

const formatPercentage = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0.00%';
    return `${value.toFixed(2)}%`;
}

export function ProfitMarginCalculator() {
  const [costPrice, setCostPrice] = useState<number | string>('');
  const [salePrice, setSalePrice] = useState<number | string>('');

  const { profitMargin, markup, netProfit } = useMemo(() => {
    const cost = Number(costPrice);
    const sale = Number(salePrice);

    if (isNaN(cost) || isNaN(sale) || cost <= 0 || sale <= 0) {
      return { profitMargin: 0, markup: 0, netProfit: 0 };
    }

    const netProfit = sale - cost;
    const profitMargin = (netProfit / sale) * 100;
    const markup = (netProfit / cost) * 100;

    return {
      profitMargin,
      markup,
      netProfit,
    };
  }, [costPrice, salePrice]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9,]*\.?[0-9]*$/.test(value.replace(/,/g, ''))) {
        setter(value);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Profit Margin Calculator</CardTitle>
          <CardDescription>
            Calculate profit margin, markup, and net profit from cost and sale price.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cost-price" className="text-lg">Cost Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="cost-price"
                  type="text"
                  placeholder="e.g., 800"
                  value={costPrice}
                  onChange={handleInputChange(setCostPrice)}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sale-price" className="text-lg">Sale Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="sale-price"
                  type="text"
                  placeholder="e.g., 1000"
                  value={salePrice}
                  onChange={handleInputChange(setSalePrice)}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-muted/30 p-6 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(netProfit)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-2xl font-bold text-primary">{formatPercentage(profitMargin)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Markup</p>
              <p className="text-2xl font-bold">{formatPercentage(markup)}</p>
            </div>
          </div>
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
                        <li><strong>Enter Cost Price:</strong> Input the total cost to acquire or produce one unit of your product.</li>
                        <li><strong>Enter Sale Price:</strong> Input the price at which you sell one unit.</li>
                        <li>The calculator instantly computes your Net Profit, Profit Margin (profit relative to revenue), and Markup (profit relative to cost).</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Pricing Strategy:</strong> Determine if your current pricing ensures a healthy profit margin.</li>
                        <li><strong>Product Profitability:</strong> Compare the profitability of different products in your inventory.</li>
                        <li><strong>Financial Health Check:</strong> Quickly assess the financial viability of your sales.</li>
                        <li><strong>Negotiating with Suppliers:</strong> Understand how changes in cost price will affect your overall profitability.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
