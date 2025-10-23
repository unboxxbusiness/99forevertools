import { Header } from '@/components/app/header';
import { AboutUsGenerator } from '@/components/app/about-us-generator/about-us-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free "About Us" Page Generator | 99forevertools',
  description: 'Easily create a professional "About Us" page for your business. Fill in your details and get a ready-to-use template instantly.',
};

export default function AboutUsGeneratorPage() {
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
        <AboutUsGenerator />
      </main>
    </div>
  );
}
