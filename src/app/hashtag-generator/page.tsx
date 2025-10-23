
'use client';

import { Header } from '@/components/app/header';
import { HashtagGenerator } from '@/components/app/hashtag-generator/hashtag-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Hashtag Generator | 99forevertools',
  description: 'Get popular and niche Instagram hashtags for your business category. Boost your reach with our free hashtag generator.',
};

export default function HashtagGeneratorPage() {
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
        <HashtagGenerator />
      </main>
    </div>
  );
}
