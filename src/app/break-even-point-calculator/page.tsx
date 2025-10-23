
'use client';

import { Header } from '@/components/app/header';
import { BreakEvenPointCalculator } from '@/components/app/break-even-point-calculator/break-even-point-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Break-Even Point Calculator | 99forevertools',
  description: 'Find out how many units you need to sell to cover your costs with our simple break-even point calculator. Essential for business planning.',
};

export default function BreakEvenPointCalculatorPage() {
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
        <BreakEvenPointCalculator />
      </main>
    </div>
  );
}
