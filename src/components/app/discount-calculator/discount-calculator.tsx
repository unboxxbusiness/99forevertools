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
  }).format(value);
};

const parseValue = (value: number | string) => {
    return Number(String(value).replace(/,/g, ''));
}

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number | string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number | string>('');

  const { finalPrice, amountSaved } = useMemo(() => {
    const price = parseValue(originalPrice);
    const discount = parseValue(discountPercentage);

    if (isNaN(price) || price <= 0 || isNaN(discount) || discount < 0 || discount > 100) {
      return { finalPrice: 0, amountSaved: 0 };
    }

    const saved = price * (discount / 100);
    const final = price - saved;

    return {
      finalPrice: final,
      amountSaved: saved,
    };
  }, [originalPrice, discountPercentage]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     if (value === '' || /^[0-9,]*\.?[0-9]*$/.test(value)) {
        setter(value);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Discount Calculator</CardTitle>
        <CardDescription>
          Quickly calculate the final price after a percentage discount.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="original-price" className="text-lg">Original Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="original-price"
                type="text"
                placeholder="e.g., 1,000"
                value={originalPrice}
                onChange={handleInputChange(setOriginalPrice)}
                className="pl-7 text-lg h-12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount-percentage" className="text-lg">Discount Percentage</Label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              <Input
                id="discount-percentage"
                type="text"
                placeholder="e.g., 15"
                value={discountPercentage}
                onChange={handleInputChange(setDiscountPercentage)}
                className="pr-7 text-lg h-12"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center bg-muted/30 p-6 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Amount Saved</p>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(amountSaved)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Final Price</p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(finalPrice)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
