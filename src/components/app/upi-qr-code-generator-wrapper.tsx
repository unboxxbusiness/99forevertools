'use client';

import { useState } from 'react';
import { QrCodeGeneratorForm, type QrCodeConfig } from '@/components/app/qr-code-generator/qr-code-generator-form';
import { QrCodeGeneratorResults } from '@/components/app/qr-code-generator/qr-code-generator-results';

export function UpiQrCodeGeneratorWrapper() {
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
