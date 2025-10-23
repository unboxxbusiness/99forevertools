import { Header } from '@/components/app/header';
import { LogoMaker } from '@/components/app/logo-maker/logo-maker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Logo Maker | 99forevertools',
  description: 'Create a simple, text-based logo for your business. Customize font, color, icon, and layout, then download as SVG or PNG.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Logo Maker",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a simple, text-based logo with customization for font, color, icon, and layout. Download as SVG or PNG.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function LogoMakerPage() {
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
        <LogoMaker />
      </main>
    </div>
  );
}
