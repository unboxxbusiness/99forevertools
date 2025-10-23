import { Header } from '@/components/app/header';
import { TimeZoneConverter } from '@/components/app/time-zone-converter/time-zone-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Zone Converter | 99forevertools',
  description: 'Compare the time across different cities and timezones. Add multiple locations to plan meetings and calls.',
};

export default function TimeZoneConverterPage() {
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
        <TimeZoneConverter />
      </main>
    </div>
  );
}
