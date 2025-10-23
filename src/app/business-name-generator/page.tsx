
'use client';

import { Header } from '@/components/app/header';
import { BusinessNameGenerator } from '@/components/app/business-name-generator/business-name-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Name Generator | 99forevertools',
  description: 'Find the perfect name for your new business or product. Get instant ideas based on your keywords with our free business name generator.',
};

export default function BusinessNameGeneratorPage() {
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
        <BusinessNameGenerator />
      </main>
    </div>
  );
}
