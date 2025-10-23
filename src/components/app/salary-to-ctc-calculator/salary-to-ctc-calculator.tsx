
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

export function SalaryToCtcCalculator() {
  const [grossSalary, setGrossSalary] = useState<number | string>(500000);
  const [employerPf, setEmployerPf] = useState(true);
  const [employerPfContribution, setEmployerPfContribution] = useState<number | string>(21600); // 12% of 15000 basic * 12
  const [insurance, setInsurance] = useState<number | string>(5000);

  const { totalCtc, additionalCosts } = useMemo(() => {
    const gross = parseValue(grossSalary);
    const pf = employerPf ? parseValue(employerPfContribution) : 0;
    const insuranceCost = parseValue(insurance);
    
    if (isNaN(gross)) {
        return { totalCtc: 0, additionalCosts: 0 };
    }

    const additionalCosts = pf + insuranceCost;
    const totalCtc = gross + additionalCosts;

    return { totalCtc, additionalCosts };
  }, [grossSalary, employerPf, employerPfContribution, insurance]);
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Salary to CTC Calculator</CardTitle>
          <CardDescription>
            Estimate the total cost of an employee to the company (CTC).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="grossSalary" className="text-lg">Employee's Gross Annual Salary</Label>
                  <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                      id="grossSalary"
                      type="text"
                      placeholder="e.g., 5,00,000"
                      value={formatValue(grossSalary)}
                      onChange={handleInputChange(setGrossSalary)}
                      className="pl-7 text-lg h-12"
                  />
                  </div>
              </div>
          </div>

          <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center"><PlusCircle className="mr-2 h-5 w-5 text-primary" /> Additional Employer Costs</h3>
              <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="space-y-1">
                          <Label htmlFor="employerPf" className="font-medium">Employer's PF Contribution (12%)</Label>
                          <p className="text-xs text-muted-foreground">Typically 12% of basic salary, capped at ₹21,600/yr for most.</p>
                      </div>
                      <Switch
                          id="employerPf"
                          checked={employerPf}
                          onCheckedChange={setEmployerPf}
                      />
                  </div>
                  {employerPf && (
                      <div className="space-y-2 pl-4">
                          <Label htmlFor="employerPfContribution">PF Contribution Amount (Annual)</Label>
                          <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                              <Input
                                  id="employerPfContribution"
                                  type="text"
                                  placeholder="e.g., 21,600"
                                  value={formatValue(employerPfContribution)}
                                  onChange={handleInputChange(setEmployerPfContribution)}
                                  className="pl-7"
                              />
                          </div>
                      </div>
                  )}
                   <div className="space-y-2 pt-2">
                      <Label htmlFor="insurance">Medical Insurance Premium (Annual)</Label>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                          <Input
                              id="insurance"
                              type="text"
                              placeholder="e.g., 5,000"
                              value={formatValue(insurance)}
                              onChange={handleInputChange(setInsurance)}
                              className="pl-7"
                          />
                      </div>
                  </div>
              </div>
          </div>

          <div className="border-t pt-8 space-y-4 text-center bg-primary/10 p-6 rounded-lg">
             <p className="text-sm text-primary/80">Total Cost-to-Company (CTC)</p>
             <p className="text-5xl font-bold text-primary">{formatCurrency(totalCtc)}</p>
             <p className="text-muted-foreground">
                  {formatCurrency(parseValue(grossSalary))} (Gross Salary) + {formatCurrency(additionalCosts)} (Additional Costs)
             </p>
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
                        <li>Enter the employee's gross annual salary.</li>
                        <li>Toggle and input additional costs the company covers, like Provident Fund (PF) contributions and insurance premiums.</li>
                        <li>The calculator adds these costs to the gross salary to show the total Cost-to-Company (CTC).</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Hiring & Budgeting:</strong> Understand the full financial impact of a new hire beyond just their salary.</li>
                        <li><strong>Job Offers:</strong> Clearly communicate the total compensation package to potential employees.</li>
                        <li><strong>Financial Planning:</strong> Accurately forecast employee expenses for the year.</li>
                        <li><strong>Comparing Candidates:</strong> Evaluate the total cost of different candidates if benefits vary.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
