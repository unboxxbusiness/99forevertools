import { Header } from '@/components/app/header';
import { DiscountCalculator } from '@/components/app/discount-calculator/discount-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator | 99forevertools',
  description: 'Quickly calculate the final price after a percentage discount and see the total amount saved.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Discount Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to quickly determine the final price after a percentage discount and see the total amount saved.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function DiscountCalculatorPage() {
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
        <DiscountCalculator />
      </main>
    </div>
  );
}
