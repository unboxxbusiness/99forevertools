
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, Briefcase } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const chartConfig = {
  principal: {
    label: "Total Principal",
    color: "hsl(var(--chart-2))",
  },
  interest: {
    label: "Total Interest",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(7);
  const [years, setYears] = useState(10);

  const { futureValue, totalInterest, totalPrincipal, yearlyData } = useMemo(() => {
    const rate = interestRate / 100;
    const compoundingPeriods = 12; // Monthly
    
    let currentBalance = initialInvestment;
    let totalPrincipal = initialInvestment;
    const yearlyData = [{ year: 0, balance: initialInvestment, totalInterest: 0, totalPrincipal: initialInvestment }];

    for (let year = 1; year <= years; year++) {
        let yearlyInterest = 0;
        for (let month = 1; month <= 12; month++) {
            currentBalance += monthlyContribution;
            totalPrincipal += monthlyContribution;
            const interestThisMonth = currentBalance * (rate / compoundingPeriods);
            currentBalance += interestThisMonth;
            yearlyInterest += interestThisMonth;
        }
        yearlyData.push({
             year,
             balance: currentBalance,
             totalInterest: (yearlyData[year-1]?.totalInterest || 0) + yearlyInterest,
             totalPrincipal
        });
    }

    const futureValue = currentBalance;
    const totalInterest = futureValue - totalPrincipal;

    return {
      futureValue,
      totalInterest,
      totalPrincipal,
      yearlyData
    };
  }, [initialInvestment, monthlyContribution, interestRate, years]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Compound Interest Calculator</CardTitle>
          <CardDescription>
            Visualize the future value of your investment and see how compound interest works.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Label>Initial Investment: <span className="font-bold text-primary">{formatCurrency(initialInvestment)}</span></Label>
              <Slider value={[initialInvestment]} onValueChange={(v) => setInitialInvestment(v[0])} min={0} max={100000} step={500} />
            </div>
            <div className="space-y-4">
              <Label>Monthly Contribution: <span className="font-bold text-primary">{formatCurrency(monthlyContribution)}</span></Label>
              <Slider value={[monthlyContribution]} onValueChange={(v) => setMonthlyContribution(v[0])} min={0} max={5000} step={50} />
            </div>
            <div className="space-y-4">
              <Label>Annual Interest Rate: <span className="font-bold text-primary">{interestRate.toFixed(1)}%</span></Label>
              <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} min={0} max={20} step={0.1} />
            </div>
            <div className="space-y-4">
              <Label>Years to Grow: <span className="font-bold text-primary">{years} years</span></Label>
              <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={50} step={1} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-primary/80">Future Value</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(futureValue)}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalPrincipal)}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Interest Earned</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
          </div>
          
          <div className="space-y-4 pt-8 border-t">
            <h3 className='text-xl font-semibold'>Investment Growth Over Time</h3>
            <Card>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                  <AreaChart accessibilityLayer data={yearlyData} margin={{ left: 12, right: 12, top: 20 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `Year ${value}`}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => formatCurrency(value)} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      dataKey="totalInterest"
                      type="natural"
                      fill="var(--color-interest)"
                      fillOpacity={0.4}
                      stroke="var(--color-interest)"
                      stackId="a"
                      name="Total Interest"
                    />
                    <Area
                      dataKey="totalPrincipal"
                      type="natural"
                      fill="var(--color-principal)"
                      fillOpacity={0.4}
                      stroke="var(--color-principal)"
                      stackId="a"
                      name="Total Principal"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
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
                        <li>Set your initial investment, regular monthly contribution, expected annual interest rate, and the number of years you plan to invest.</li>
                        <li>The calculator uses the compound interest formula to project the future value of your investment.</li>
                        <li>It calculates your total principal (the money you put in) and the total interest earned over the specified period.</li>
                        <li>The chart visualizes how your investment grows over time, showing the powerful effect of compounding where your interest starts earning its own interest.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Retirement Planning:</strong> Estimate how much your personal or employee retirement savings could grow over time.</li>
                        <li><strong>Long-Term Savings Goals:</strong> Visualize how much you need to save monthly to reach a specific financial goal, like a down payment for an office.</li>
                        <li><strong>Business Investments:</strong> Project the potential return on retaining earnings in an interest-bearing account versus reinvesting in the business.</li>
                        <li><strong>Client Education:</strong> Financial advisors can use this tool to visually explain the concept of compound interest to clients.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
