
'use client';

import { Header } from '@/components/app/header';
import { URLShortener } from '@/components/app/url-shortener/url-shortener';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Redirect & Shortener Tool | 99forevertools',
  description: 'Create a short, custom link on your own domain that redirects to a long URL. Perfect for cleaner links in marketing materials.',
};

export default function URLShortenerPage() {
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
        <URLShortener />
      </main>
    </div>
  );
}
