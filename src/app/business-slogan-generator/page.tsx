import { Header } from '@/components/app/header';
import { BusinessSloganGenerator } from '@/components/app/business-slogan-generator/business-slogan-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Slogan Generator | 99forevertools',
  description: 'Generate catchy taglines and slogans for your business based on a keyword. Perfect for marketing and branding.',
};

export default function BusinessSloganGeneratorPage() {
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
        <BusinessSloganGenerator />
      </main>
    </div>
  );
}
