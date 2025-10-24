
import { Header } from '@/components/app/header';
import { UpiQrCodeGeneratorWrapper } from '@/components/app/upi-qr-code-generator-wrapper';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UPI QR Code Generator | 99forevertools',
  description: 'Create a custom QR code for UPI payments. Enter your UPI ID and name to generate a downloadable QR code.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "UPI QR Code Generator",
  "applicationCategory": "FinancialApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a custom QR code for UPI payments.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function QrCodeGeneratorPage() {
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
        <UpiQrCodeGeneratorWrapper />
      </main>
    </div>
  );
}

    