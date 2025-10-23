import { Header } from '@/components/app/header';
import { LogoMaker } from '@/components/app/logo-maker/logo-maker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Logo Maker | 99forevertools',
  description: 'Create a simple, text-based logo for your business. Customize font, color, icon, and layout, then download as SVG or PNG.',
};

export default function LogoMakerPage() {
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
        <LogoMaker />
      </main>
    </div>
  );
}
