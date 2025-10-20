'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
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
  );
}
