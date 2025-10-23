import { Header } from '@/components/app/header';
import { TextToSpeechConverter } from '@/components/app/text-to-speech/text-to-speech-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text to Speech Converter | 99forevertools',
  description: 'Convert passages of text into spoken audio directly in your browser. Choose from various voices.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Text to Speech Converter",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "description": "A free tool to convert passages of text into spoken audio directly in the browser.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function TextToSpeechPage() {
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
        <TextToSpeechConverter />
      </main>
    </div>
  );
}
