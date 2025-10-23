
'use client';

import { Header } from '@/components/app/header';
import { SalaryToCtcCalculator } from '@/components/app/salary-to-ctc-calculator/salary-to-ctc-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary to CTC Calculator | 99forevertools',
  description: 'Estimate an employee\'s total Cost-to-Company (CTC) based on their gross salary and additional employer costs like PF and insurance.',
};

export default function SalaryToCtcCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <SalaryToCtcCalculator />
      </main>
    </div>
  );
}
