
'use client';

import { Header } from '@/components/app/header';
import { ReviewLinkGenerator } from '@/components/app/review-link-generator/review-link-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Review Link Generator | 99forevertools',
  description: 'Create a direct link for customers to leave a Google Review for your business. Requires a Google Place ID.',
};

export default function ReviewLinkGeneratorPage() {
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
        <ReviewLinkGenerator />
      </main>
    </div>
  );
}
