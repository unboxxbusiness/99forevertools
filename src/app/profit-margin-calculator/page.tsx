import { Header } from '@/components/app/header';
import { ProfitMarginCalculator } from '@/components/app/profit-margin-calculator/profit-margin-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator | 99forevertools',
  description: 'Calculate profit margin, markup percentage, and net profit from your cost and sale price.',
};

export default function ProfitMarginCalculatorPage() {
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
        <ProfitMarginCalculator />
      </main>
    </div>
  );
}
