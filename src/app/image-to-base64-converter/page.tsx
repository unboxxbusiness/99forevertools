import { Header } from '@/components/app/header';
import { ImageToBase64Converter } from '@/components/app/image-to-base64-converter/image-to-base64-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image to Base64 Converter | 99forevertools',
  description: 'Convert images (PNG, JPG, GIF, etc.) to Base64 encoding instantly. A free online tool for developers and designers.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Image to Base64 Converter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "description": "A free tool to convert image files into Base64 encoded strings directly in the browser.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function ImageToBase64ConverterPage() {
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
        <ImageToBase64Converter />
      </main>
    </div>
  );
}
