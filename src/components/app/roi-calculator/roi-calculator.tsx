
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export function RoiCalculator() {
  const [amountInvested, setAmountInvested] = useState<number | string>('');
  const [finalValue, setFinalValue] = useState<number | string>('');

  const { roi, netProfit, isProfit, isLoss } = useMemo(() => {
    const invested = Number(amountInvested);
    const returned = Number(finalValue);

    if (isNaN(invested) || isNaN(returned) || invested <= 0) {
      return { roi: 0, netProfit: 0, isProfit: false, isLoss: false };
    }

    const netProfit = returned - invested;
    const roi = (netProfit / invested) * 100;

    return {
      roi,
      netProfit,
      isProfit: netProfit > 0,
      isLoss: netProfit < 0,
    };
  }, [amountInvested, finalValue]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9,]*\.?[0-9]*$/.test(value.replace(/,/g, ''))) {
        setter(value);
    }
  };
  
  const parseValue = (value: number | string) => {
    return Number(String(value).replace(/,/g, ''));
  }
  
  const formatValue = (value: number | string) => {
    if (value === '' || value === '-') return value;
    const num = parseValue(value);
    return isNaN(num) ? '' : num.toLocaleString('en-US');
  }

  const RoiBadge = () => {
    if (!isProfit && !isLoss) {
      return <Badge variant="secondary" className="text-lg"><Minus className="mr-1" />Neutral</Badge>;
    }
    if (isProfit) {
      return <Badge className="text-lg bg-green-500/20 text-green-300 hover:bg-green-500/30"><TrendingUp className="mr-1" />Profit</Badge>;
    }
    return <Badge variant="destructive" className="text-lg"><TrendingDown className="mr-1" />Loss</Badge>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Return on Investment (ROI) Calculator</CardTitle>
          <CardDescription>
            A simple calculator to determine the profitability of an investment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amountInvested" className="text-lg">Amount Invested</Label>
              <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                      id="amountInvested"
                      type="text"
                      placeholder="e.g., 1,000"
                      value={formatValue(amountInvested)}
                      onChange={handleInputChange(setAmountInvested)}
                      className="pl-7 text-lg h-12"
                  />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalValue" className="text-lg">Final Value of Investment</Label>
               <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                      id="finalValue"
                      type="text"
                      placeholder="e.g., 1,500"
                      value={formatValue(finalValue)}
                      onChange={handleInputChange(setFinalValue)}
                      className="pl-7 text-lg h-12"
                  />
              </div>
            </div>
          </div>

          <div className="border-t pt-8 space-y-6">
              <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                  <div className="text-center">
                      <p className="text-sm text-muted-foreground">Return on Investment (ROI)</p>
                      <p className={`text-5xl font-bold ${isProfit ? 'text-green-400' : isLoss ? 'text-red-400' : ''}`}>
                          {roi.toFixed(2)}%
                      </p>
                  </div>
                  <div className="text-center">
                      <p className="text-sm text-muted-foreground">Net Profit</p>
                      <p className={`text-5xl font-bold ${isProfit ? 'text-green-400' : isLoss ? 'text-red-400' : ''}`}>
                          {formatCurrency(netProfit)}
                      </p>
                  </div>
              </div>
               <div className="flex justify-center">
                  <RoiBadge />
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
                        <li>Enter the initial amount you invested or spent on a campaign.</li>
                        <li>Enter the final value or total revenue generated from that investment.</li>
                        <li>The calculator computes the Net Profit (or Loss) and the Return on Investment (ROI) as a percentage.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Marketing Campaigns:</strong> Determine if your latest Facebook ad or Google Ads campaign was profitable.</li>
                        <li><strong>New Equipment Purchases:</strong> Evaluate the financial return of investing in new machinery or software.</li>
                        <li><strong>Business Initiatives:</strong> Assess the profitability of a new product launch or a new service offering.</li>
                        <li><strong>Reporting to Stakeholders:</strong> Show investors or team members the financial performance of different business activities.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
