
'use client';

import { Header } from '@/components/app/header';
import { ImageResizer } from '@/components/app/image-resizer/image-resizer';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Image Resizer | 99forevertools',
  description: 'Resize images to any dimension you need. Perfect for social media posts, website banners, and more. Upload and resize in seconds.',
};

export default function ImageResizerPage() {
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
        <ImageResizer />
      </main>
    </div>
  );
}
