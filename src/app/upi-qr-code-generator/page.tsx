
'use client';

import { Header } from '@/components/app/header';
import { UpiQrCodeGenerator } from '@/components/app/upi-qr-code-generator/upi-qr-code-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UpiQrCodeGeneratorPage() {
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
        <UpiQrCodeGenerator />
      </main>
    </div>
  );
}
