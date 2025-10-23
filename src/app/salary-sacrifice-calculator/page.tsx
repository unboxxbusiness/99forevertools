import { Header } from '@/components/app/header';
import { SalarySacrificeCalculator } from '@/components/app/salary-sacrifice-calculator/salary-sacrifice-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary Sacrifice Calculator | 99forevertools',
  description: 'Estimate your potential tax savings from pre-tax pension contributions with our simple salary sacrifice calculator.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Salary Sacrifice Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to estimate potential tax savings from pre-tax pension contributions.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function SalarySacrificeCalculatorPage() {
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
        <SalarySacrificeCalculator />
      </main>
    </div>
  );
}
