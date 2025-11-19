import { Header } from '@/components/app/header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HindiTypingTool } from '@/components/app/hindi-typing/hindi-typing';

export const metadata: Metadata = {
  title: 'Hindi Typing Tool | 99forevertools',
  description: 'Type in Hindi using an on-screen Devanagari keyboard. Copy or download your text.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Hindi Typing Tool",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web",
  "description": "Type in Hindi with an on-screen Devanagari keyboard. Copy to clipboard or download as .txt.",
  "offers": { "@type": "Offer", "price": "0" }
};

export default function HindiTypingPage() {
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
        <HindiTypingTool />
      </main>
    </div>
  );
}
