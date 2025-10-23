import { Header } from '@/components/app/header';
import { BusinessValuationCalculator } from '@/components/app/business-valuation-calculator/business-valuation-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Valuation Calculator | 99forevertools',
  description: 'Get a quick, simple valuation estimate for your business based on your annual revenue and industry.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Business Valuation Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to get a simple business valuation estimate based on annual revenue and industry.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function BusinessValuationCalculatorPage() {
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
        <BusinessValuationCalculator />
      </main>
    </div>
  );
}
