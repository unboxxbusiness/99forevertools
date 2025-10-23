import { Header } from '@/components/app/header';
import { DigitalBusinessCardGenerator } from '@/components/app/digital-business-card/digital-business-card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Business Card Generator | 99forevertools',
  description: 'Create a modern, shareable digital business card with a QR code. Instantly generate a vCard for easy contact sharing.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Digital Business Card Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a modern, shareable digital business card with a QR code and vCard.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function DigitalBusinessCardPage() {
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
        <DigitalBusinessCardGenerator />
      </main>
    </div>
  );
}
