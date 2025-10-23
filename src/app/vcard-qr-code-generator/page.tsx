import { Header } from '@/components/app/header';
import { VCardQrCodeGenerator } from '@/components/app/vcard-qr-code-generator/vcard-qr-code-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'vCard QR Code Generator for Business Cards | 99forevertools',
  description: 'Generate a QR code containing your contact information (vCard). Perfect for digital and physical business cards.',
};

export default function VCardQrCodeGeneratorPage() {
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
        <VCardQrCodeGenerator />
      </main>
    </div>
  );
}
