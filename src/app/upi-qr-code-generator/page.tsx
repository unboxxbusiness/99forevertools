import { Header } from '@/components/app/header';
import { QrCodeGeneratorForm, type QrCodeConfig } from '@/components/app/qr-code-generator/qr-code-generator-form';
import { QrCodeGeneratorResults } from '@/components/app/qr-code-generator/qr-code-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UPI QR Code Generator | 99forevertools',
  description: 'Create a custom QR code for UPI payments. Enter your UPI ID and name to generate a downloadable QR code.',
};

function QrCodeGeneratorWrapper() {
  'use client';
  const [qrConfig, setQrConfig] = useState<QrCodeConfig>({
    type: 'upi', // Default to UPI
    value: '',
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'M',
    // ... other fields
    url: '',
    ssid: '',
    password: '',
    encryption: 'WPA',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    website: '',
    upiId: '',
    payeeName: '',
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <QrCodeGeneratorForm config={qrConfig} setConfig={setQrConfig} />
      <QrCodeGeneratorResults config={qrConfig} />
    </div>
  );
}

export default function QrCodeGeneratorPage() {
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
        <QrCodeGeneratorWrapper />
      </main>
    </div>
  );
}
