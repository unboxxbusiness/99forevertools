
import { Header } from '@/components/app/header';
import { WhatsAppWidgetGenerator } from '@/components/app/whatsapp-widget-generator/whatsapp-widget-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Chat Widget Generator for Websites | 99forevertools',
  description: 'Create a free floating WhatsApp chat button for your website. Customize the message, button text, and position to engage visitors.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WhatsApp Chat Widget Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create and customize a floating WhatsApp chat widget for any website.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WhatsAppWidgetGeneratorPage() {
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
        <WhatsAppWidgetGenerator />
      </main>
    </div>
  );
}
