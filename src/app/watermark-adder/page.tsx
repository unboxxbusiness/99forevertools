
'use client';

import { Header } from '@/components/app/header';
import { WatermarkAdder } from '@/components/app/watermark-adder/watermark-adder';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watermark Adder | 99forevertools',
  description: 'Add a text or image watermark to your pictures. Customize opacity, size, and position to protect your images.',
};

export default function WatermarkAdderPage() {
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
        <WatermarkAdder />
      </main>
    </div>
  );
}
