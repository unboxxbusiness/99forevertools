import { Header } from '@/components/app/header';
import { GifMaker } from '@/components/app/gif-maker/gif-maker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online GIF Maker | 99forevertools',
  description: 'Convert a series of images or a short video clip into an animated GIF right in your browser. Customize size, speed, and text.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Online GIF Maker",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A free tool to convert a series of images or a short video clip into an animated GIF.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function GifMakerPage() {
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
        <GifMaker />
      </main>
    </div>
  );
}
