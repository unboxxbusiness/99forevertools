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

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Compound Interest Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to visualize the future value of investments and see how compound interest works over time.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className='pl-0'>
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
