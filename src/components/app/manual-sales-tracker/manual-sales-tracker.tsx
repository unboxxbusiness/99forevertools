'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, IndianRupee, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Sale = {
  id: number;
  description: string;
  amount: number;
  time: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function ManualSalesTracker() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedSales = localStorage.getItem('manualSalesTracker');
      if (savedSales) {
        const parsedSales = JSON.parse(savedSales);
        const today = new Date().toLocaleDateString();
        // Filter for today's sales
        const todaySales = parsedSales.filter((sale: any) => new Date(sale.time).toLocaleDateString() === today);
        setSales(todaySales);
      }
    } catch (error) {
      console.error("Failed to load sales from localStorage", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load saved sales data.' });
    }
  }, [toast]);

  useEffect(() => {
    try {
      const today = new Date().toLocaleDateString();
      const otherDaysSales = JSON.parse(localStorage.getItem('manualSalesTracker') || '[]').filter((sale: any) => new Date(sale.time).toLocaleDateString() !== today);
      const salesToSave = [...otherDaysSales, ...sales];
      localStorage.setItem('manualSalesTracker', JSON.stringify(salesToSave));
    } catch (error) {
      console.error("Failed to save sales to localStorage", error);
    }
  }, [sales]);

  const handleAddSale = () => {
    const numAmount = parseFloat(amount);
    if (!description.trim() || isNaN(numAmount) || numAmount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid input', description: 'Please enter a valid description and amount.' });
      return;
    }
    const newSale: Sale = {
      id: Date.now(),
      description,
      amount: numAmount,
      time: new Date().toISOString(),
    };
    setSales([...sales, newSale]);
    setDescription('');
    setAmount('');
  };

  const handleDeleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
    toast({ title: 'Sale deleted' });
  };
  
  const clearAllSales = () => {
    setSales([]);
    toast({ title: "Today's sales cleared", description: "All entries for today have been removed." });
  };

  const totalRevenue = useMemo(() => sales.reduce((total, sale) => total + sale.amount, 0), [sales]);

  const chartData = useMemo(() => {
    return sales.map(sale => ({
      name: sale.description,
      amount: sale.amount,
      time: new Date(sale.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }));
  }, [sales]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
        <Card className="shadow-lg bg-card border-primary/20">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">Manual Sales Tracker</CardTitle>
                <CardDescription>A simple dashboard to manually track your daily revenue. All data is saved in your browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="p-8 text-center bg-primary/10 rounded-lg">
                    <Label className="text-lg text-primary/80">Today's Total Revenue</Label>
                    <p className="text-6xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                         <Card>
                            <CardHeader><CardTitle>Add New Sale</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" placeholder="e.g., Service, Product Name" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="amount" type="number" placeholder="e.g., 500" value={amount} onChange={(e) => setAmount(e.target.value)} className="pl-10" />
                                    </div>
                                </div>
                                <Button onClick={handleAddSale} className="w-full">
                                    <Plus className="mr-2" /> Add Sale
                                </Button>
                            </CardContent>
                        </Card>
                         {sales.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Today's Sales Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                            <Tooltip
                                                cursor={{fill: 'hsl(var(--muted))'}}
                                                contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                            />
                                            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                         )}
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Sales List ({sales.length})</CardTitle>
                                {sales.length > 0 && (
                                     <Button variant="destructive" size="sm" onClick={clearAllSales}>
                                        <Trash2 className="mr-2 h-4 w-4"/> Clear All
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="h-96 overflow-y-auto pr-2">
                                {sales.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sales.slice().reverse().map(sale => (
                                            <TableRow key={sale.id}>
                                                <TableCell className="text-xs text-muted-foreground">{new Date(sale.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                                <TableCell>{sale.description}</TableCell>
                                                <TableCell className="text-right font-medium">{formatCurrency(sale.amount)}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteSale(sale.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-8">
                                        <p>No sales logged for today yet.</p>
                                        <p className="text-sm">Use the form to add your first sale.</p>
                                    </div>
                                )}
                                </div>
                            </CardContent>
                        </Card>
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
                            <li>Enter a description and amount for each sale you make and click "Add Sale".</li>
                            <li>Your daily revenue total updates instantly at the top.</li>
                            <li>All sales are listed in the table and visualized in the chart.</li>
                            <li>Your data is automatically saved in your browser's local storage for the current day. It will be there when you return.</li>
                            <li>Past days' data is preserved but not shown. The dashboard resets to zero for each new day.</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="use-cases">
                    <AccordionTrigger>
                        <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Cash Businesses:</strong> Perfect for food trucks, market stalls, or cash-based services to quickly tally up the day's earnings.</li>
                            <li><strong>Offline Sales:</strong> Track sales from events, trade shows, or in-person consultations without needing a complex POS system.</li>
                            <li><strong>Simple Daily Snapshot:</strong> Get a quick, no-fuss overview of your daily income to stay motivated and track progress toward goals.</li>
                            <li><strong>Freelancers:</strong> Log payments as they come in throughout the day to keep a real-time pulse on your finances.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  );
}
