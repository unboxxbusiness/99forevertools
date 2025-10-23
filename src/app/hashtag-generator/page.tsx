import { Header } from '@/components/app/header';
import { HashtagGenerator } from '@/components/app/hashtag-generator/hashtag-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Hashtag Generator | 99forevertools',
  description: 'Suggests relevant and popular hashtags for your social media posts based on your business category.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Instagram Hashtag Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool that suggests relevant and popular Instagram hashtags based on a business category.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function HashtagGeneratorPage() {
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
        <HashtagGenerator />
      </main>
    </div>
  );
}
