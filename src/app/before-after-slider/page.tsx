import { Header } from '@/components/app/header';
import { BeforeAfterSliderGenerator } from '@/components/app/before-after-slider/before-after-slider';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free "Before and After" Image Slider Generator | 99forevertools',
  description: 'Create a simple, embeddable before-and-after image slider. Perfect for showcasing transformations for service-based businesses.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Before and After Image Slider Generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create embeddable before-and-after image sliders for showcasing transformations.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function BeforeAfterSliderPage() {
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
        <BeforeAfterSliderGenerator />
      </main>
    </div>
  );
}
