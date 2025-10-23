import { Header } from '@/components/app/header';
import { FestivalWishGenerator } from '@/components/app/festival-wish-generator/festival-wish-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festival Wish Generator (Diwali, Holi, Eid) | 99forevertools',
  description: 'Create pre-written messages for festivals like Diwali, Holi, Eid, Christmas, and New Year to send to customers and friends.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Festival Wish Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create pre-written messages for festivals like Diwali, Holi, Eid, Christmas, and New Year.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function FestivalWishGeneratorPage() {
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
        <FestivalWishGenerator />
      </main>
    </div>
  );
}
