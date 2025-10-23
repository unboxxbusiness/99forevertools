import { Header } from '@/components/app/header';
import { GstCalculator } from '@/components/app/gst-calculator/gst-calculator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GST Calculator for India | 99forevertools',
  description: 'Easily add or remove GST from any amount. Our calculator supports all Indian GST rates (5%, 12%, 18%, 28%) for accurate calculations.',
};

export default function GstCalculatorPage() {
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
        <GstCalculator />
      </main>
    </div>
  );
}
