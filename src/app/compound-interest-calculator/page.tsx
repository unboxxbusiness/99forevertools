import { Header } from '@/components/app/header';
import { CompoundInterestCalculator } from '@/components/app/compound-interest-calculator/compound-interest-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | 99forevertools',
  description: 'Visualize the future value of your investments and see how compound interest works over time with our free calculator.',
};

export default function CompoundInterestCalculatorPage() {
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
        <CompoundInterestCalculator />
      </main>
    </div>
  );
}
