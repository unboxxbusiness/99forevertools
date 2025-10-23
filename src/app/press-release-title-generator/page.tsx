import { Header } from '@/components/app/header';
import { PressReleaseTitleGenerator } from '@/components/app/press-release-title-generator/press-release-title-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Release Title Generator | 99forevertools',
  description: 'Craft compelling and professional headlines for your press releases and announcements based on your topic.',
};

export default function PressReleaseTitleGeneratorPage() {
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
        <PressReleaseTitleGenerator />
      </main>
    </div>
  );
}
