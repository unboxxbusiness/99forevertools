
import { Header } from '@/components/app/header';
import { ImageToPngConverter } from '@/components/app/image-to-png-converter/image-to-png-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image to PNG Converter | 99forevertools',
  description: 'Convert JPG, WEBP, GIF, and other image formats to high-quality PNG files for free. No uploads required, your privacy is protected.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Image to PNG Converter",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A free online tool to convert various image formats like JPG, WebP, GIF, and SVG to the PNG format directly in the browser.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function ImageToPngConverterPage() {
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
        <ImageToPngConverter />
      </main>
    </div>
  );
}
