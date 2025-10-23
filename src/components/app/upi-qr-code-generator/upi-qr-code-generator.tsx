
'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';

export function UpiQrCodeGenerator() {
  const [upiId, setUpiId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const upiLink = useMemo(() => {
    if (!upiId || !payeeName) return '';
    const params = new URLSearchParams({
      pa: upiId,
      pn: payeeName,
    });
    return `upi://pay?${params.toString()}`;
  }, [upiId, payeeName]);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "upi-qr-code.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast({ title: 'QR Code downloaded!' });
        }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">UPI QR Code Generator</CardTitle>
        <CardDescription>
          Create a QR code for your UPI ID to accept payments easily.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="upiId">Your UPI ID *</Label>
            <Input
              id="upiId"
              placeholder="yourname@bank"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payeeName">Your Name *</Label>
            <Input
              id="payeeName"
              placeholder="e.g., John Doe"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
            />
          </div>
           {upiLink && (
            <Button onClick={downloadQRCode} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center p-4 border rounded-lg bg-white min-h-[280px]">
          {upiLink ? (
             <div ref={qrCodeRef} className="p-4 bg-white rounded-lg inline-block">
                <QRCodeCanvas
                    value={upiLink}
                    size={256}
                    includeMargin={true}
                />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Your QR code will appear here.</p>
              <p className="text-sm">Please fill in your UPI ID and Name.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
