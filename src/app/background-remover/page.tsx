import { Header } from '@/components/app/header';
import { BackgroundRemover } from '@/components/app/background-remover/background-remover';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Background Remover - Remove Image Backgrounds Instantly | 99forevertools',
  description: 'Erase backgrounds from product shots, portraits, and social images instantly. Powered by Transformers.js and RMBG-1.4 running fully in your browser—no uploads required.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: 'AI Background Remover',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description: 'Free AI-powered background remover that runs in your browser with no uploads. Great for eCommerce, marketing, social media, and personal projects.',
  offers: {
    "@type": 'Offer',
    price: '0',
  },
  featureList: [
    'Transformer-powered RMBG-1.4 model',
    'On-device processing for privacy',
    'Transparent PNG downloads',
    'Custom colour backdrops',
    'Sample image to try instantly',
    'Works on PNG and JPG files'
  ],
};

export default function BackgroundRemoverPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <BackgroundRemover />
      </main>
    </div>
  );
}
