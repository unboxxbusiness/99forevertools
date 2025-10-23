import { Header } from '@/components/app/header';
import { WhatIsMyIp } from '@/components/app/what-is-my-ip/what-is-my-ip';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is My IP Address? | 99forevertools',
  description: 'A simple utility that shows your current public IP address.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "What Is My IP Address?",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "description": "A free utility that shows a user's current public IP address.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WhatIsMyIpPage() {
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
        <WhatIsMyIp />
      </main>
    </div>
  );
}
