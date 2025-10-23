import { Header } from '@/components/app/header';
import { WhatsAppBioLinkGenerator } from '@/components/app/whatsapp-bio-link/whatsapp-bio-link-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Bio Link Page Generator | 99forevertools',
  description: 'Create a Linktree-style page for your WhatsApp profile with custom call-to-action buttons.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "WhatsApp Bio Link Page Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a Linktree-style page for a WhatsApp profile with custom call-to-action buttons.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function WhatsAppBioLinkPage() {
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
        <WhatsAppBioLinkGenerator />
      </main>
    </div>
  );
}
