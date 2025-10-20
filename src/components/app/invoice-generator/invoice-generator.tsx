
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, Printer, FileText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

type LineItem = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
};

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  });

  const [fromInfo, setFromInfo] = useState({ name: 'Your Company Name', address: '123 Street, City, Country' });
  const [toInfo, setToInfo] = useState({ name: 'Client Company Name', address: '456 Avenue, City, Country' });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: 'Website Design', quantity: 1, price: 20000 },
    { id: 2, description: 'Hosting (1 year)', quantity: 1, price: 5000 },
  ]);
  const [nextId, setNextId] = useState(3);
  
  const [notes, setNotes] = useState('Thank you for your business.');
  const [taxRate, setTaxRate] = useState(18);


  const handleAddItem = () => {
    setLineItems([...lineItems, { id: nextId, description: '', quantity: 1, price: 0 }]);
    setNextId(nextId + 1);
  };

  const handleRemoveItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
    setLineItems(
      lineItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const { subtotal, taxAmount, total } = useMemo(() => {
    const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [lineItems, taxRate]);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-8 print-hidden">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2"><FileText /> Invoice Generator</h1>
                <p className="text-muted-foreground">Create and print a professional invoice.</p>
            </div>
            <Button onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
            </Button>
        </div>

        <Card className="p-8 md:p-12 shadow-lg print-bg-white print-text-black">
            <CardContent className="p-0">
                <header className="flex justify-between items-start pb-8 border-b print-border-gray">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-primary">INVOICE</h1>
                        <div className="flex items-center">
                            <Label htmlFor="invoice-number" className="text-sm mr-2">#</Label>
                            <Input id="invoice-number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="h-8 w-32 print-border-gray" />
                        </div>
                    </div>
                    <div className="text-right">
                        <Input value={fromInfo.name} onChange={(e) => setFromInfo({...fromInfo, name: e.target.value})} className="text-2xl font-bold h-10 mb-1 text-right print-border-gray" />
                        <Textarea value={fromInfo.address} onChange={(e) => setFromInfo({...fromInfo, address: e.target.value})} className="text-sm text-right leading-tight print-border-gray" />
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground">BILL TO</h3>
                        <Input value={toInfo.name} onChange={(e) => setToInfo({...toInfo, name: e.target.value})} placeholder="Client's Company Name" className="font-bold text-lg h-9 print-border-gray" />
                        <Textarea value={toInfo.address} onChange={(e) => setToInfo({...toInfo, address: e.target.value})} placeholder="Client's Address" className="print-border-gray"/>
                    </div>
                    <div className="space-y-2 text-right md:text-left">
                        <div className="grid grid-cols-2 items-center">
                            <Label htmlFor="invoice-date" className="font-semibold">Invoice Date:</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant={'outline'} className="justify-start text-left font-normal print-border-gray">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(invoiceDate, 'PPP')}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={invoiceDate} onSelect={(d) => d && setInvoiceDate(d)} initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                         <div className="grid grid-cols-2 items-center">
                            <Label htmlFor="due-date" className="font-semibold">Due Date:</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant={'outline'} className="justify-start text-left font-normal print-border-gray">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(dueDate, 'PPP')}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dueDate} onSelect={(d) => d && setDueDate(d)} initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </section>

                <section>
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 print-bg-white">
                            <tr className="border-b print-border-gray">
                                <th className="p-2 font-semibold">Description</th>
                                <th className="p-2 font-semibold w-24 text-right">Qty</th>
                                <th className="p-2 font-semibold w-32 text-right">Price</th>
                                <th className="p-2 font-semibold w-32 text-right">Total</th>
                                <th className="p-2 w-10 print-hidden"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map(item => (
                                <tr key={item.id} className="border-b print-border-gray">
                                    <td className="p-2"><Input value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} placeholder="Item description" className="print-border-gray"/></td>
                                    <td className="p-2"><Input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} className="text-right print-border-gray" /></td>
                                    <td className="p-2"><Input type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value))} className="text-right print-border-gray" /></td>
                                    <td className="p-2 text-right font-medium">{formatCurrency(item.quantity * item.price)}</td>
                                    <td className="p-2 text-right print-hidden">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleRemoveItem(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <Button variant="outline" onClick={handleAddItem} className="mt-4 w-full print-hidden">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Item
                    </Button>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 mt-8">
                     <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes..." className="print-border-gray" />
                    </div>
                    <div className="space-y-4 pt-4 md:pt-0">
                        <div className="flex justify-between items-center pr-2 pl-2 md:pl-12">
                            <span className="font-semibold">Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center pr-2 pl-2 md:pl-12">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="tax-rate" className="font-semibold">Tax (%):</Label>
                                <Input id="tax-rate" type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} className="h-8 w-20 text-right print-border-gray" />
                            </div>
                            <span>{formatCurrency(taxAmount)}</span>
                        </div>
                         <div className="flex justify-between items-center border-t pt-4 mt-4 pr-2 pl-2 md:pl-12 font-bold text-lg text-primary print-border-gray">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </section>
                
                <footer className="text-center text-xs text-muted-foreground mt-12 pt-4 border-t print-border-gray">
                    <p>Thank you for your business!</p>
                </footer>
            </CardContent>
        </Card>
    </div>
  );
}
