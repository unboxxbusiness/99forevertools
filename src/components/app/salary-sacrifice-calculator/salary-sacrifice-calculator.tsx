
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lightbulb, Briefcase } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

// Simplified progressive tax brackets (example for illustrative purposes)
const taxBrackets = [
  { threshold: 0, rate: 0.10 },       // 10% on income up to 15,000
  { threshold: 15000, rate: 0.20 },  // 20% on income between 15,001 and 50,000
  { threshold: 50000, rate: 0.30 },  // 30% on income between 50,001 and 100,000
  { threshold: 100000, rate: 0.40 }, // 40% on income above 100,000
];

const calculateTax = (income: number) => {
  let tax = 0;
  let remainingIncome = income;
  for (let i = taxBrackets.length - 1; i >= 0; i--) {
    const bracket = taxBrackets[i];
    if (remainingIncome > bracket.threshold) {
      const taxableInBracket = remainingIncome - bracket.threshold;
      tax += taxableInBracket * bracket.rate;
      remainingIncome = bracket.threshold;
    }
  }
  return tax;
};


const ResultRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center py-3 border-b border-border/50">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-mono text-lg">{value}</p>
    </div>
)

export function SalarySacrificeCalculator() {
  const [salary, setSalary] = useState(60000);
  const [sacrificePercentage, setSacrificePercentage] = useState(5);

  const {
    originalTakeHome,
    sacrificedTakeHome,
    taxSavings,
    sacrificedAmount,
    newTaxableSalary,
    originalTax,
    newTax,
  } = useMemo(() => {
    const sacrificedAmount = salary * (sacrificePercentage / 100);
    const newTaxableSalary = salary - sacrificedAmount;

    const originalTax = calculateTax(salary);
    const newTax = calculateTax(newTaxableSalary);

    const originalTakeHome = salary - originalTax;
    const sacrificedTakeHome = newTaxableSalary - newTax;
    const taxSavings = originalTax - newTax;

    return {
      originalTakeHome,
      sacrificedTakeHome,
      taxSavings,
      sacrificedAmount,
      newTaxableSalary,
      originalTax,
      newTax,
    };
  }, [salary, sacrificePercentage]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Salary Sacrifice Calculator</CardTitle>
          <CardDescription>
            Estimate your potential tax savings from pre-tax contributions. This is for illustrative purposes only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label htmlFor="salary">Gross Annual Salary: <span className="font-bold text-primary">{formatCurrency(salary)}</span></Label>
              <Slider id="salary" value={[salary]} onValueChange={(v) => setSalary(v[0])} min={10000} max={200000} step={1000} />
            </div>
            <div className="space-y-4">
              <Label htmlFor="sacrifice">Sacrifice Percentage: <span className="font-bold text-primary">{sacrificePercentage}%</span></Label>
              <Slider id="sacrifice" value={[sacrificePercentage]} onValueChange={(v) => setSacrificePercentage(v[0])} min={0} max={40} step={1} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className='p-6 bg-muted/30 rounded-lg'>
                  <h3 className='text-xl font-semibold mb-4 text-center'>Before Sacrifice</h3>
                  <ResultRow label="Gross Annual Salary" value={formatCurrency(salary)} />
                  <ResultRow label="Pension Contribution" value={formatCurrency(0)} />
                  <ResultRow label="Taxable Salary" value={formatCurrency(salary)} />
                  <ResultRow label="Estimated Tax Paid" value={formatCurrency(originalTax)} />
                  <ResultRow label="Take-Home Pay" value={formatCurrency(originalTakeHome)} />
              </div>
               <div className='p-6 bg-primary/10 rounded-lg'>
                  <h3 className='text-xl font-semibold mb-4 text-center text-primary'>After Sacrifice</h3>
                  <ResultRow label="Gross Annual Salary" value={formatCurrency(salary)} />
                  <ResultRow label="Pension Contribution" value={formatCurrency(sacrificedAmount)} />
                  <ResultRow label="New Taxable Salary" value={formatCurrency(newTaxableSalary)} />
                  <ResultRow label="Estimated Tax Paid" value={formatCurrency(newTax)} />
                  <ResultRow label="Take-Home Pay" value={formatCurrency(sacrificedTakeHome)} />
              </div>
          </div>

          <div className="text-center bg-green-500/10 p-6 rounded-lg border border-green-500/30">
              <p className="text-lg text-green-300">Estimated Annual Tax Saving</p>
              <p className="text-4xl font-bold text-green-400">{formatCurrency(taxSavings)}</p>
              <p className="text-sm text-green-400/70 mt-1">
                  Your take-home is only reduced by {formatCurrency(originalTakeHome - sacrificedTakeHome)}, but your pension gains {formatCurrency(sacrificedAmount)}.
              </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              This calculator provides an illustrative estimate only and does not constitute financial advice. It uses a simplified tax model and does not account for National Insurance, student loans, or other deductions. Consult a financial advisor for accurate figures.
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
                        <li>Enter your Gross Annual Salary and the percentage you wish to contribute to your pension via salary sacrifice.</li>
                        <li>The tool calculates your original take-home pay and tax without any sacrifice.</li>
                        <li>It then calculates your new, lower take-home pay and tax after the sacrifice.</li>
                        <li>The final result shows your estimated annual tax saving and the total amount contributed to your pension.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Employee Benefits:</strong> Demonstrate to employees the tax advantages of contributing to a company pension scheme.</li>
                        <li><strong>Financial Wellness:</strong> Offer this tool as part of a financial wellness program for your staff.</li>
                        <li><strong>Owner's Finances:</strong> As a business owner, model how contributing to your personal pension can reduce your income tax liability.</li>
                        <li><strong>Recruitment:</strong> Use this to illustrate the power of your company's pension matching or contribution benefits to potential hires.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
