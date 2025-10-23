
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const chartConfig = {
  principal: {
    label: "Principal",
    color: "hsl(var(--chart-2))",
  },
  interest: {
    label: "Interest",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function LoanRepaymentCalculator() {
  const [amount, setAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(5);
  const [term, setTerm] = useState(5);

  const { monthlyPayment, totalInterest, totalRepayment, amortizationSchedule } = useMemo(() => {
    const principal = amount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    if (principal <= 0 || monthlyInterestRate <= 0 || numberOfPayments <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalRepayment: 0, amortizationSchedule: [] };
    }

    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    let balance = principal;
    const schedule = [];
    let totalInterestPaid = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        totalPayment: monthlyPayment,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }
    
    const totalRepayment = principal + totalInterestPaid;

    return {
      monthlyPayment,
      totalInterest: totalInterestPaid,
      totalRepayment,
      amortizationSchedule: schedule,
    };
  }, [amount, interestRate, term]);
  
  const chartData = useMemo(() => {
    return amortizationSchedule.map(row => ({
      month: row.month,
      principal: row.principal,
      interest: row.interest,
    }))
  }, [amortizationSchedule])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Loan Repayment Calculator</CardTitle>
          <CardDescription>
            Calculates monthly payments and total interest for loans based on the principal, interest rate, and term.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Label htmlFor="amount">Loan Amount: <span className="font-bold text-primary">{formatCurrency(amount)}</span></Label>
              <Slider id="amount" value={[amount]} onValueChange={(v) => setAmount(v[0])} min={1000} max={100000} step={1000} />
            </div>
            <div className="space-y-4">
              <Label htmlFor="interest">Annual Interest Rate: <span className="font-bold text-primary">{interestRate.toFixed(2)}%</span></Label>
              <Slider id="interest" value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} min={0.1} max={20} step={0.1} />
            </div>
            <div className="space-y-4">
              <Label htmlFor="term">Loan Term: <span className="font-bold text-primary">{term} years</span></Label>
              <Slider id="term" value={[term]} onValueChange={(v) => setTerm(v[0])} min={1} max={30} step={1} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Repayment</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalRepayment)}</p>
              </div>
          </div>
          
          <div className="space-y-4 pt-8 border-t">
            <h3 className='text-xl font-semibold'>Repayment Breakdown</h3>
             <Card>
              <CardContent className="p-0">
                 <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12, top: 10 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `Month ${value}`}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                      dataKey="interest"
                      type="natural"
                      fill="var(--color-interest)"
                      fillOpacity={0.4}
                      stroke="var(--color-interest)"
                      stackId="a"
                    />
                    <Area
                      dataKey="principal"
                      type="natural"
                      fill="var(--color-principal)"
                      fillOpacity={0.4}
                      stroke="var(--color-principal)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 pt-8 border-t">
              <h3 className='text-xl font-semibold'>Amortization Schedule</h3>
               <div className="max-h-96 overflow-y-auto border rounded-lg">
                  <Table>
                      <TableHeader className='sticky top-0 bg-card'>
                          <TableRow>
                              <TableHead>Month</TableHead>
                              <TableHead>Principal</TableHead>
                              <TableHead>Interest</TableHead>
                              <TableHead>Total Payment</TableHead>
                              <TableHead>Remaining Balance</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {amortizationSchedule.map((row) => (
                              <TableRow key={row.month}>
                                  <TableCell>{row.month}</TableCell>
                                  <TableCell>{formatCurrency(row.principal)}</TableCell>
                                  <TableCell>{formatCurrency(row.interest)}</TableCell>
                                  <TableCell>{formatCurrency(row.totalPayment)}</TableCell>
                                  <TableCell>{formatCurrency(row.remainingBalance)}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
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
                        <li>Use the sliders to input the Loan Amount, Annual Interest Rate, and Loan Term in years.</li>
                        <li>The tool calculates your monthly payment, the total interest you'll pay over the life of the loan, and the total amount you'll repay.</li>
                        <li>The chart visualizes how your payments are split between principal and interest over time.</li>
                        <li>The Amortization Schedule provides a detailed, month-by-month breakdown of your loan repayment.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Loan Comparison:</strong> Compare different loan offers from banks by seeing the total cost of each.</li>
                        <li><strong>Financial Planning:</strong> Understand the financial commitment before taking out a loan for new equipment, a vehicle, or expansion.</li>
                        <li><strong>Budgeting:</strong> Determine the exact monthly payment that will need to be allocated in your business budget.</li>
                        <li><strong>Debt Management:</strong> Analyze existing loans to understand how much principal is left and how much interest you're paying.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
