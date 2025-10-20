'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

const GST_RATES = [5, 12, 18, 28];

export function GstCalculator() {
  const [amount, setAmount] = useState<number | string>('');
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');

  const { baseAmount, gstAmount, totalAmount } = useMemo(() => {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return { baseAmount: 0, gstAmount: 0, totalAmount: 0 };
    }

    if (calculationType === 'add') {
      const base = numAmount;
      const gst = base * (gstRate / 100);
      const total = base + gst;
      return { baseAmount: base, gstAmount: gst, totalAmount: total };
    } else { // 'remove'
      const total = numAmount;
      const base = total / (1 + gstRate / 100);
      const gst = total - base;
      return { baseAmount: base, gstAmount: gst, totalAmount: total };
    }
  }, [amount, gstRate, calculationType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">GST Calculator</CardTitle>
        <CardDescription>
          Quickly add or remove Goods and Services Tax from any price.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-lg">
              {calculationType === 'add' ? 'Base Amount' : 'Total Amount (incl. GST)'}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="amount"
                type="text"
                placeholder="e.g., 1000"
                value={amount}
                onChange={handleInputChange}
                className="pl-7 text-lg h-12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gst-rate" className="text-lg">GST Rate</Label>
            <Select onValueChange={(value) => setGstRate(Number(value))} value={String(gstRate)}>
              <SelectTrigger id="gst-rate" className="h-12 text-lg">
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
              <SelectContent>
                {GST_RATES.map(rate => (
                  <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <RadioGroup
          value={calculationType}
          onValueChange={(value: 'add' | 'remove') => setCalculationType(value)}
          className="flex justify-center gap-4"
        >
          <Label htmlFor="add-gst" className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
            <RadioGroupItem value="add" id="add-gst" />
            Add GST (Exclusive)
          </Label>
          <Label htmlFor="remove-gst" className="flex items-center gap-2 border rounded-md p-3 has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer">
            <RadioGroupItem value="remove" id="remove-gst" />
            Remove GST (Inclusive)
          </Label>
        </RadioGroup>

        <div className="border-t pt-8 space-y-4 text-center bg-muted/30 p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Base Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(baseAmount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">GST ({gstRate}%)</p>
              <p className="text-2xl font-bold">{formatCurrency(gstAmount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
