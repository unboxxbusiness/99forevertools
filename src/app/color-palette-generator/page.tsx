
'use client';

import { Header } from '@/components/app/header';
import { ColorPaletteGenerator } from '@/components/app/color-palette-generator/color-palette-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ColorPaletteGeneratorPage() {
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
        <ColorPaletteGenerator />
      </main>
    </div>
  );
}
