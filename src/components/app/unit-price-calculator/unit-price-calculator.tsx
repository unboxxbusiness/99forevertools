
'use client';

import { useState, useMemo, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const UNITS = {
  // Weight
  kg: { base: 'g', multiplier: 1000 },
  g: { base: 'g', multiplier: 1 },
  // Volume
  l: { base: 'ml', multiplier: 1000 },
  ml: { base: 'ml', multiplier: 1 },
  // Count
  items: { base: 'item', multiplier: 1 },
};
type Unit = keyof typeof UNITS;

interface ItemState {
    price: string;
    quantity: string;
    unit: Unit;
}

const formatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return formatCurrency(0);
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const ItemInput = ({
    item,
    setItem,
    title
}: {
    item: ItemState;
    setItem: (item: ItemState) => void;
    title: string;
}) => {
    const handleInputChange = (field: keyof ItemState) => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^[0-9,]*\.?[0-9]*$/.test(value.replace(/,/g, ''))) {
            setItem({ ...item, [field]: value });
        }
    };
    
    const handleUnitChange = (unit: Unit) => {
        setItem({ ...item, unit });
    };
    
    return (
        <div className="space-y-4 p-6 border rounded-lg">
            <h3 className="font-semibold text-lg">{title}</h3>
             <div className="space-y-2">
                <Label htmlFor={`price-${title}`}>Price</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input id={`price-${title}`} type="text" placeholder="e.g., 150" value={item.price} onChange={handleInputChange('price')} className="pl-7" />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor={`quantity-${title}`}>Quantity</Label>
                    <Input id={`quantity-${title}`} type="text" placeholder="e.g., 500" value={item.quantity} onChange={handleInputChange('quantity')} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor={`unit-${title}`}>Unit</Label>
                     <Select onValueChange={handleUnitChange} value={item.unit}>
                        <SelectTrigger id={`unit-${title}`}><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="g">Grams (g)</SelectItem>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="ml">Milliliters (ml)</SelectItem>
                            <SelectItem value="l">Liters (l)</SelectItem>
                            <SelectItem value="items">Items</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};


export function UnitPriceCalculator() {
  const [itemA, setItemA] = useState<ItemState>({ price: '150', quantity: '500', unit: 'g' });
  const [itemB, setItemB] = useState<ItemState>({ price: '250', quantity: '1', unit: 'kg' });

  const calculateUnitPrice = (item: ItemState) => {
    const price = parseFloat(item.price);
    const quantity = parseFloat(item.quantity);
    const unitInfo = UNITS[item.unit];

    if (isNaN(price) || isNaN(quantity) || quantity === 0) {
      return { unitPrice: null, baseUnit: '' };
    }
    const baseQuantity = quantity * unitInfo.multiplier;
    return {
        unitPrice: price / baseQuantity,
        baseUnit: unitInfo.base
    };
  };

  const { unitPriceA, unitPriceB, betterBuy } = useMemo(() => {
    const { unitPrice: upA, baseUnit: baseUnitA } = calculateUnitPrice(itemA);
    const { unitPrice: upB, baseUnit: baseUnitB } = calculateUnitPrice(itemB);

    let betterBuy: 'A' | 'B' | 'Same' | null = null;
    if (upA !== null && upB !== null && baseUnitA === baseUnitB) {
        if (upA < upB) betterBuy = 'A';
        else if (upB < upA) betterBuy = 'B';
        else betterBuy = 'Same';
    }

    return { unitPriceA: upA, unitPriceB: upB, betterBuy };
  }, [itemA, itemB]);
  
  const ResultCard = ({ title, unitPrice, baseUnit, isBetter }: {title: string, unitPrice: number | null, baseUnit: string, isBetter: boolean}) => (
    <div className={`p-4 rounded-lg text-center transition-all ${isBetter ? 'bg-green-500/10 border-2 border-green-500/50 scale-105 shadow-lg' : 'bg-muted/30'}`}>
        <p className="text-sm text-muted-foreground">{title}</p>
        {unitPrice !== null ? (
            <>
                <p className={`text-3xl font-bold ${isBetter ? 'text-green-400' : ''}`}>{formatCurrency(unitPrice)}</p>
                <p className="text-xs text-muted-foreground">per {baseUnit}</p>
                 {isBetter && <Badge className="mt-2 bg-green-500/20 text-green-300 hover:bg-green-500/30"><ThumbsUp className="mr-1 h-3 w-3"/>Better Value</Badge>}
            </>
        ) : (
             <p className="text-3xl font-bold">-</p>
        )}
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Unit Price Calculator</CardTitle>
          <CardDescription>
            Compare two items to find the one with the better value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ItemInput item={itemA} setItem={setItemA} title="Item A" />
            <ItemInput item={itemB} setItem={setItemB} title="Item B" />
          </div>

          <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-center mb-4">Comparison</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ResultCard title="Item A Unit Price" unitPrice={unitPriceA} baseUnit={UNITS[itemA.unit].base} isBetter={betterBuy === 'A'} />
                  <ResultCard title="Item B Unit Price" unitPrice={unitPriceB} baseUnit={UNITS[itemB.unit].base} isBetter={betterBuy === 'B'} />
              </div>
               {betterBuy === null && unitPriceA !== null && unitPriceB !== null && <p className="text-center text-yellow-500 mt-4 text-sm">Cannot compare items with different unit types (e.g., weight vs. volume).</p>}
               {betterBuy === 'Same' && <p className="text-center text-muted-foreground mt-4 text-sm">Both items have the same unit price.</p>}
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
                        <li>Enter the price, quantity, and unit for "Item A".</li>
                        <li>Do the same for "Item B", making sure to use a comparable unit (e.g., grams and kilograms).</li>
                        <li>The calculator determines the price per base unit (e.g., price per gram) for each item.</li>
                        <li>The item with the lower unit price is highlighted as the better value.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Purchasing Decisions:</strong> Compare bulk supply prices from different vendors to find the most cost-effective option.</li>
                        <li><strong>Product Packaging:</strong> Decide on new product sizes by comparing the unit price to competitors.</li>
                        <li><strong>Customer Transparency:</strong> Help customers understand the value of different product sizes in your store.</li>
                        <li><strong>Competitive Analysis:</strong> Analyze whether your competitor's "large" size is actually a better deal than your "medium" size.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
