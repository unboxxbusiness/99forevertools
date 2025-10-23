
import { Header } from '@/components/app/header';
import { WhatsAppBroadcastTemplates } from '@/components/app/whatsapp-broadcast-templates/whatsapp-broadcast-templates';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Broadcast Template Library | 99forevertools',
  description: 'Free, ready-to-use templates for WhatsApp broadcast messages for sales, support, events, and more.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WhatsApp Broadcast Template Library",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A library of free, copy-and-paste templates for WhatsApp marketing and communication messages.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WhatsAppBroadcastTemplatesPage() {
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
        <WhatsAppBroadcastTemplates />
      </main>
    </div>
  );
}
