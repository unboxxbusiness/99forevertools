import { Header } from '@/components/app/header';
import { ImageCompressor } from '@/components/app/image-compressor/image-compressor';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image Compressor | 99forevertools',
  description: 'Reduce image file sizes for faster web loading and sharing. Compress JPG, PNG, and other formats online.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Image Compressor",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A free tool to reduce image file sizes for faster web loading and sharing. Compresses JPG, PNG, and other formats.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
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
