
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return formatCurrency(0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
};

const parseValue = (value: number | string) => {
    return Number(String(value).replace(/,/g, ''));
}

const formatValue = (value: number | string) => {
    if (value === '' || value === '-') return value;
    const num = parseValue(value);
    return isNaN(num) ? '' : num.toLocaleString('en-IN');
}

export function PfCalculator() {
  const [basicSalary, setBasicSalary] = useState<number | string>(25000);
  const pfRate = 0.12;
  const epsCap = 15000;
  const epsRate = 0.0833;

  const {
    employeeEpf,
    employerEpf,
    employerEps,
    totalContribution,
  } = useMemo(() => {
    const salary = parseValue(basicSalary);

    if (isNaN(salary) || salary <= 0) {
      return { employeeEpf: 0, employerEpf: 0, employerEps: 0, totalContribution: 0 };
    }
    
    // Employee's contribution (12% of basic)
    const employeeEpf = salary * pfRate;

    // Employer's contribution
    const employerTotal = salary * pfRate;
    const employerEps = Math.min(epsCap, salary) * epsRate;
    const employerEpf = employerTotal - employerEps;
    
    const totalContribution = employeeEpf + employerTotal;

    return {
      employeeEpf,
      employerEpf,
      employerEps,
      totalContribution,
    };
  }, [basicSalary]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const ResultRow = ({ label, monthly, annually }: { label: string; monthly: number; annually: number; }) => (
    <div className="flex justify-between items-center py-3 border-b border-border/50">
      <p className="text-muted-foreground">{label}</p>
      <div className="text-right">
        <p className="font-mono text-md">{formatCurrency(monthly)}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(annually)}/yr</p>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Provident Fund (PF) Calculator</CardTitle>
        <CardDescription>
          Calculate employee and employer contributions to EPF and EPS.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="w-full max-w-sm mx-auto space-y-2">
          <Label htmlFor="basicSalary" className="text-lg">Your Basic Salary (Monthly)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input
              id="basicSalary"
              type="text"
              value={formatValue(basicSalary)}
              onChange={handleInputChange(setBasicSalary)}
              className="pl-7 text-lg h-12 text-center"
            />
          </div>
        </div>

        <div className="border-t pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Employee's Contribution</h3>
            <ResultRow label="EPF (12%)" monthly={employeeEpf} annually={employeeEpf * 12} />
            <div className="flex justify-between items-center py-3 font-bold">
              <p>Total Employee Share</p>
              <p className="text-md font-mono">{formatCurrency(employeeEpf)}</p>
            </div>
          </div>
          <div className="p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Employer's Contribution</h3>
            <ResultRow label="EPS (8.33%)" monthly={employerEps} annually={employerEps * 12} />
            <ResultRow label="EPF (3.67%)" monthly={employerEpf} annually={employerEpf * 12} />
            <div className="flex justify-between items-center py-3 font-bold">
              <p>Total Employer Share</p>
              <p className="text-md font-mono">{formatCurrency(employerEpf + employerEps)}</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-primary/10 p-6 rounded-lg border border-primary/30">
          <p className="text-lg text-primary/80">Total Monthly PF Contribution</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(totalContribution)}</p>
          <p className="text-sm text-primary/70 mt-1">
            (Total Annual Contribution: {formatCurrency(totalContribution * 12)})
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
