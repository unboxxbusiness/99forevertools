import { Header } from '@/components/app/header';
import { InvoiceGenerator } from '@/components/app/invoice-generator/invoice-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Invoice Generator | 99forevertools',
  description: 'Quickly generate a clean, professional invoice for your business. Add line items, tax, and print or save as a PDF.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Invoice Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to quickly generate a clean, professional invoice with line items and tax.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 print-hidden">
          <Button asChild variant="ghost" className='pl-0'>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <InvoiceGenerator />
      </main>
    </div>
  );
}
