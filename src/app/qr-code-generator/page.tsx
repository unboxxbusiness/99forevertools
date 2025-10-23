
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { QrCodeGeneratorForm, type QrCodeConfig } from '@/components/app/qr-code-generator/qr-code-generator-form';
import { QrCodeGeneratorResults } from '@/components/app/qr-code-generator/qr-code-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator | 99forevertools',
  description: 'Create custom QR codes for URLs, Wi-Fi, vCards, UPI, and more. Customize colors and download your QR code as a high-quality PNG.',
};

export default function QrCodeGeneratorPage() {
  const [qrConfig, setQrConfig] = useState<QrCodeConfig>({
    type: 'url',
    value: 'https://google.com',
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'L',
    // URL
    url: 'https://google.com',
    // WIFI
    ssid: '',
    password: '',
    encryption: 'WPA',
    // vCard
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    website: '',
    // UPI
    upiId: '',
    payeeName: '',
  });

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <QrCodeGeneratorForm config={qrConfig} setConfig={setQrConfig} />
          <QrCodeGeneratorResults config={qrConfig} />
        </div>
      </main>
    </div>
  );
}
