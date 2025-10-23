import { Header } from '@/components/app/header';
import { AboutUsGenerator } from '@/components/app/about-us-generator/about-us-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free "About Us" Page Generator | 99forevertools',
  description: 'Easily create a professional "About Us" page for your business. Fill in your details and get a ready-to-use template instantly.',
};

const aboutUsSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "About Us Page Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to generate a professional 'About Us' page for any business by filling in company details.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function AboutUsGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutUsSchema) }}
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
        <AboutUsGenerator />
      </main>
    </div>
  );
}
