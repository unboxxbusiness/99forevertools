import { Header } from '@/components/app/header';
import { ManualSalesTracker } from '@/components/app/manual-sales-tracker/manual-sales-tracker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manual Sales Tracker | 99forevertools',
  description: 'A simple, private dashboard to manually track your daily sales and revenue. All data is saved in your browser.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Manual Sales Tracker",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A simple, private dashboard to manually track your daily sales and revenue. All data is saved in the user's browser.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function ManualSalesTrackerPage() {
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
        <ManualSalesTracker />
      </main>
    </div>
  );
}
