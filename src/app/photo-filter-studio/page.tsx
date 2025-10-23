
import { Header } from '@/components/app/header';
import { PhotoFilterStudio } from '@/components/app/photo-filter-studio/photo-filter-studio';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Filter Studio | 99forevertools',
  description: 'Transform your photos with professional filters and effects. Upload an image and apply stunning filters instantly.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Photo Filter Studio",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to apply a variety of professional filters and effects to photos directly in the browser.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function PhotoFilterStudioPage() {
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
        <PhotoFilterStudio />
      </main>
    </div>
  );
}
