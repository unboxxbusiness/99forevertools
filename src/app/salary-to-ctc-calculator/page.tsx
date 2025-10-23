import { Header } from '@/components/app/header';
import { SalaryToCtcCalculator } from '@/components/app/salary-to-ctc-calculator/salary-to-ctc-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary to CTC Calculator | 99forevertools',
  description: 'Estimate the total cost-to-company (CTC) for an employee based on their gross salary and other employer contributions.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Salary to CTC Calculator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free calculator to estimate the total cost-to-company (CTC) for an employee based on their gross salary and other contributions.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function SalaryToCtcCalculatorPage() {
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
        <SalaryToCtcCalculator />
      </main>
    </div>
  );
}
