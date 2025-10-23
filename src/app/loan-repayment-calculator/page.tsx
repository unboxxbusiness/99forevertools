
'use client';

import { Header } from '@/components/app/header';
import { LoanRepaymentCalculator } from '@/components/app/loan-repayment-calculator/loan-repayment-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Repayment & EMI Calculator | 99forevertools',
  description: 'Estimate your monthly loan payments (EMI) for personal, car, or home loans. See a full amortization schedule to understand principal vs. interest.',
};

export default function LoanRepaymentCalculatorPage() {
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
        <LoanRepaymentCalculator />
      </main>
    </div>
  );
}
