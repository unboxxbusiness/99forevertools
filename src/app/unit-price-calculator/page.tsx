import { Header } from '@/components/app/header';
import { UnitPriceCalculator } from '@/components/app/unit-price-calculator/unit-price-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Price Calculator | 99forevertools',
  description: 'Compare two products to find the one with the better value by calculating their price per unit.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Unit Price Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to compare two products to find the one with the better value by calculating their price per unit.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function UnitPriceCalculatorPage() {
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
        <UnitPriceCalculator />
      </main>
    </div>
  );
}
