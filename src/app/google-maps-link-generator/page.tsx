import { Header } from '@/components/app/header';
import { GoogleMapsLinkGenerator } from '@/components/app/google-maps-link-generator/google-maps-link-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Maps Link Generator | 99forevertools',
  description: 'Create a direct, shareable link to any business address on Google Maps. Easy to share with customers.',
};

export default function GoogleMapsLinkGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <GoogleMapsLinkGenerator />
      </main>
    </div>
  );
}
