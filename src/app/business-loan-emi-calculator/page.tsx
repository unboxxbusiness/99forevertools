import { Header } from '@/components/app/header';
import { BusinessLoanEMICalculator } from '@/components/app/business-loan-emi-calculator/business-loan-emi-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Loan EMI Calculator | 99forevertools',
  description: 'Calculate your monthly EMI for business loans. Includes amortization schedule and a breakdown of principal vs. interest.',
};

export default function BusinessLoanEMICalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <BusinessLoanEMICalculator />
      </main>
    </div>
  );
}
