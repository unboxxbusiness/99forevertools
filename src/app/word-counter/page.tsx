import { Header } from '@/components/app/header';
import { WordCounter } from '@/components/app/word-counter/word-counter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word and Character Counter | 99forevertools',
  description: 'Instantly count the number of words, characters, sentences, and paragraphs in your text.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Word and Character Counter",
  "applicationCategory": "TextApplication",
  "operatingSystem": "Web",
  "description": "A free tool to instantly count the number of words, characters, sentences, and paragraphs in a text.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WordCounterPage() {
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
        <WordCounter />
      </main>
    </div>
  );
}
