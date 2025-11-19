import { Header } from '@/components/app/header';
import { ImageCompressor } from '@/components/app/image-compressor/image-compressor';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Image Compressor - Batch Compress & Resize | 99forevertools',
  description: 'Powerful image compression tool with batch processing, resizing, and format conversion. Compress JPG, PNG, WebP images online. Multiple files supported.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Advanced Image Compressor",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A powerful free tool to compress, resize, and convert images in batch. Supports JPG, PNG, WebP formats with advanced compression modes.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  },
  "featureList": [
    "Batch image compression",
    "Image resizing and scaling",
    "Format conversion (JPG, PNG, WebP)",
    "Multiple compression modes",
    "Before/after comparison",
    "Drag and drop support"
  ]
};

export default function ImageCompressorPage() {
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
        <ImageCompressor />
      </main>
    </div>
  );
}
