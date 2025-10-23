import { Header } from '@/components/app/header';
import { WatermarkAdder } from '@/components/app/watermark-adder/watermark-adder';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Watermark to Image (Text or Logo) | 99forevertools',
  description: 'Add a text or image watermark to your pictures. Customize position, opacity, size, and color.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Watermark Adder",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A free tool to add a text or image watermark to pictures with various customization options.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WatermarkAdderPage() {
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
        <WatermarkAdder />
      </main>
    </div>
  );
}
