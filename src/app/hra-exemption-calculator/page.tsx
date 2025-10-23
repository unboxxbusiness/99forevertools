import { Header } from '@/components/app/header';
import { HraExemptionCalculator } from '@/components/app/hra-exemption-calculator/hra-exemption-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HRA Exemption Calculator | 99forevertools',
  description: 'Calculate your House Rent Allowance (HRA) tax exemption based on your salary, rent, and city type.',
};

export default function HraExemptionCalculatorPage() {
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
        <HraExemptionCalculator />
      </main>
    </div>
  );
}
