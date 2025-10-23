import { Header } from '@/components/app/header';
import { FaviconGenerator } from '@/components/app/favicon-generator/favicon-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favicon Generator | 99forevertools',
  description: 'Create a complete favicon pack for your website from any image. Includes favicons for all modern browsers and devices.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Favicon Generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a complete favicon pack (favicon.ico, PNGs, apple-touch-icon) for a website from any image.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function FaviconGeneratorPage() {
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
        <FaviconGenerator />
      </main>
    </div>
  );
}
