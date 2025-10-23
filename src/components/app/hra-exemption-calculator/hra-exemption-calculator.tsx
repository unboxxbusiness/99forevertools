'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return formatCurrency(0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
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

export function HraExemptionCalculator() {
  const [basicSalary, setBasicSalary] = useState<number | string>(500000);
  const [hraReceived, setHraReceived] = useState<number | string>(200000);
  const [rentPaid, setRentPaid] = useState<number | string>(240000);
  const [isMetroCity, setIsMetroCity] = useState(true);

  const { exemptHra, taxableHra, conditions } = useMemo(() => {
    const salary = parseValue(basicSalary);
    const hra = parseValue(hraReceived);
    const rent = parseValue(rentPaid);

    if (isNaN(salary) || salary <= 0) {
      return { exemptHra: 0, taxableHra: 0, conditions: [0, 0, 0] };
    }

    const condition1 = hra;
    const condition2 = Math.max(0, rent - (0.10 * salary));
    const condition3 = isMetroCity ? (0.50 * salary) : (0.40 * salary);

    const exemptHra = Math.min(condition1, condition2, condition3);
    const taxableHra = Math.max(0, hra - exemptHra);

    return {
      exemptHra,
      taxableHra,
      conditions: [condition1, condition2, condition3]
    };
  }, [basicSalary, hraReceived, rentPaid, isMetroCity]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">HRA Exemption Calculator</CardTitle>
        <CardDescription>
          Calculate your House Rent Allowance exemption for tax purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="basicSalary" className="text-lg">Basic Salary (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input id="basicSalary" type="text" value={formatValue(basicSalary)} onChange={handleInputChange(setBasicSalary)} className="pl-7 text-lg h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hraReceived" className="text-lg">HRA Received (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input id="hraReceived" type="text" value={formatValue(hraReceived)} onChange={handleInputChange(setHraReceived)} className="pl-7 text-lg h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rentPaid" className="text-lg">Rent Paid (Annual)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input id="rentPaid" type="text" value={formatValue(rentPaid)} onChange={handleInputChange(setRentPaid)} className="pl-7 text-lg h-12" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="isMetro" className="text-lg">Living in a Metro City? (Delhi, Mumbai, Chennai, Kolkata)</Label>
            <Switch id="isMetro" checked={isMetroCity} onCheckedChange={setIsMetroCity} />
        </div>

        <div className="border-t pt-8 space-y-4">
            <h3 className="text-xl font-semibold text-center">Exemption Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Actual HRA received</p>
                    <p className="text-xl font-bold">{formatCurrency(conditions[0])}</p>
                </div>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rent Paid - 10% of Salary</p>
                    <p className="text-xl font-bold">{formatCurrency(conditions[1])}</p>
                </div>
                 <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">{isMetroCity ? '50%' : '40%'} of Salary</p>
                    <p className="text-xl font-bold">{formatCurrency(conditions[2])}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-lg text-green-300">Exempt HRA</p>
                <p className="text-4xl font-bold text-green-400">{formatCurrency(exemptHra)}</p>
                <p className="text-xs text-green-400/70">(Minimum of the three amounts above)</p>
            </div>
            <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="text-lg text-red-300">Taxable HRA</p>
                <p className="text-4xl font-bold text-red-400">{formatCurrency(taxableHra)}</p>
                <p className="text-xs text-red-400/70">(HRA Received - Exempt HRA)</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
