import { Header } from '@/components/app/header';
import { WhatsAppLinkGenerator } from '@/components/app/whatsapp-link-generator/whatsapp-link-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Link Generator | 99forevertools',
  description: 'Create a wa.me link with a pre-filled message to make it easier for customers to contact you on WhatsApp.',
};

export default function WhatsAppLinkGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <WhatsAppLinkGenerator />
      </main>
    </div>
  );
}
