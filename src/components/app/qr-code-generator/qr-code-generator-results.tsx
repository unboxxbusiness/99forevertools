'use client';

import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { type QrCodeConfig } from './qr-code-generator-form';

type QrCodeGeneratorResultsProps = {
  config: QrCodeConfig;
};

export function QrCodeGeneratorResults({ config }: QrCodeGeneratorResultsProps) {
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  const isValidContent = config.value && (
    config.type !== 'wifi' || (config.type === 'wifi' && config.ssid)
  );

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast({ title: 'QR Code downloaded!' });
        }
    }
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated QR Code</CardTitle>
            <CardDescription>Your QR code is ready to be downloaded.</CardDescription>
          </div>
          {isValidContent && (
            <Button variant="secondary" onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          {isValidContent ? (
             <div ref={qrCodeRef} className="p-4 bg-white rounded-lg inline-block">
                <QRCodeCanvas
                    value={config.value}
                    size={256}
                    bgColor={config.bgColor}
                    fgColor={config.fgColor}
                    level={config.level}
                    includeMargin={true}
                />
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted w-full h-full justify-center flex flex-col">
              <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your QR code will appear here</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure the options on the left to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
