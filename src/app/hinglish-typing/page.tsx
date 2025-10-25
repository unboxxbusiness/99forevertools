import { Header } from '@/components/app/header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HinglishTypingTool } from '@/components/app/hinglish-typing/hinglish-typing';

export const metadata: Metadata = {
  title: 'Indian Language Typing Workspace | 99forevertools',
  description: 'Experience real-time phonetic transliteration across 23+ Indian languages in a clean, distraction-free editor.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Indian Language Typing Workspace",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web",
  "description": "Real-time Indian language input supporting 23+ scripts with live phonetic transliteration.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  }
};

export default function HinglishTypingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
        <HinglishTypingTool />
      </main>
    </div>
  );
}
