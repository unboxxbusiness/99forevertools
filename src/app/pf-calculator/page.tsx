import { Header } from '@/components/app/header';
import { PfCalculator } from '@/components/app/pf-calculator/pf-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Provident Fund (PF) Calculator | 99forevertools',
  description: 'Calculate employee and employer contributions to your EPF and EPS based on your monthly basic salary.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Provident Fund (PF) Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to determine employee and employer Provident Fund (PF) contributions based on basic salary.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function PfCalculatorPage() {
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
        <PfCalculator />
      </main>
    </div>
  );
}
