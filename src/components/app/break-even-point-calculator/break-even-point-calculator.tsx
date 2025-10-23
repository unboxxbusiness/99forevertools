
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

const formatNumber = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0';
    return value.toLocaleString('en-IN');
}

export function BreakEvenPointCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number | string>('');
  const [variableCost, setVariableCost] = useState<number | string>('');
  const [salePrice, setSalePrice] = useState<number | string>('');

  const { breakEvenUnits, breakEvenRevenue, contributionMargin } = useMemo(() => {
    const fc = Number(fixedCosts);
    const vc = Number(variableCost);
    const sp = Number(salePrice);

    if (isNaN(fc) || isNaN(vc) || isNaN(sp) || fc <= 0 || sp <= vc) {
      return { breakEvenUnits: 0, breakEvenRevenue: 0, contributionMargin: 0 };
    }

    const contributionMargin = sp - vc;
    const breakEvenUnits = fc / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sp;
    
    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
    };
  }, [fixedCosts, variableCost, salePrice]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9,]*\.?[0-9]*$/.test(value.replace(/,/g, ''))) {
        setter(value);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Break-Even Point Calculator</CardTitle>
          <CardDescription>
            Determine how much you need to sell to cover your costs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fixed-costs" className="text-lg">Total Fixed Costs</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="fixed-costs"
                  type="text"
                  placeholder="e.g., 50,000"
                  value={fixedCosts}
                  onChange={handleInputChange(setFixedCosts)}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sale-price" className="text-lg">Sale Price Per Unit</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="sale-price"
                  type="text"
                  placeholder="e.g., 100"
                  value={salePrice}
                  onChange={handleInputChange(setSalePrice)}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="variable-cost" className="text-lg">Variable Cost Per Unit</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="variable-cost"
                  type="text"
                  placeholder="e.g., 40"
                  value={variableCost}
                  onChange={handleInputChange(setVariableCost)}
                  className="pl-7 text-lg h-12"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center bg-muted/30 p-6 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Contribution Margin</p>
              <p className="text-2xl font-bold">{formatCurrency(contributionMargin)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Break-Even Units</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(Math.ceil(breakEvenUnits))}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(breakEvenRevenue)}</p>
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
                        <li><strong>Total Fixed Costs:</strong> Enter all costs that do not change with production levels (e.g., rent, salaries, insurance).</li>
                        <li><strong>Sale Price Per Unit:</strong> Enter the price at which you sell one unit of your product or service.</li>
                        <li><strong>Variable Cost Per Unit:</strong> Enter the costs directly associated with producing one unit (e.g., materials, direct labor).</li>
                        <li>The calculator instantly determines the number of units you need to sell to cover all your costs.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>New Product Launch:</strong> Determine how many units of a new product you need to sell to become profitable.</li>
                        <li><strong>Pricing Strategy:</strong> Test different sale prices to see how they impact your break-even point and profitability.</li>
                        <li><strong>Goal Setting:</strong> Set realistic sales targets for your team based on what's needed to cover costs.</li>
                        <li><strong>Business Planning:</strong> Use the calculation in your business plan to forecast financial viability and secure funding.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
