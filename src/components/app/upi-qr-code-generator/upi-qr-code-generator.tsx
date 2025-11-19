'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, QrCode, Lightbulb, Briefcase, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type UpiConfig = {
  upiId: string;
  payeeName: string;
};

export function UpiQrCodeGenerator() {
  const [config, setConfig] = useState<UpiConfig>({
    upiId: '',
    payeeName: '',
  });

  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof UpiConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, [field]: e.target.value });
  };

  const upiUri = useMemo(() => {
    if (!config.upiId || !config.payeeName) {
      return '';
    }
    const params = new URLSearchParams({
      pa: config.upiId,
      pn: config.payeeName,
    });
    return `upi://pay?${params.toString()}`;
  }, [config]);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
        const canvas = qrCodeRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "upi-qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast({ title: 'QR Code downloaded!' });
        }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">UPI QR Code Generator</CardTitle>
          <CardDescription>
            Create a custom QR code for UPI payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <div className="space-y-2">
                <Label htmlFor="upiId">Your UPI ID *</Label>
                 <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="upiId"
                        placeholder="yourname@bank"
                        value={config.upiId}
                        onChange={handleInputChange('upiId')}
                        className="pl-10"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payeeName">Your Name (Payee) *</Label>
                <Input
                  id="payeeName"
                  placeholder="e.g., John Doe"
                  value={config.payeeName}
                  onChange={handleInputChange('payeeName')}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 bg-muted/30 p-6 rounded-lg">
              {upiUri ? (
                <>
                  <div ref={qrCodeRef} className="p-4 bg-white rounded-lg inline-block">
                    <QRCodeCanvas
                      value={upiUri}
                      size={256}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"
                      includeMargin={true}
                    />
                  </div>
                  <Button onClick={downloadQRCode}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                </>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted w-full h-full justify-center flex flex-col">
                  <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Your QR code will appear here</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in your UPI details to generate a QR code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Enter your UPI ID (e.g., yourname@oksbi) and the name you want to appear as the payee.</li>
                        <li>The tool instantly generates a QR code.</li>
                        <li>Anyone who scans this QR code with a UPI app (like Google Pay, PhonePe, etc.) will be able to pay you directly.</li>
                        <li>Click "Download PNG" to save the QR code for printing or digital use.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>In-Store Payments:</strong> Print the QR code and display it at your checkout counter for quick, cashless payments.</li>
                        <li><strong>On Invoices:</strong> Add the QR code to your invoices so clients can easily pay their bills.</li>
                        <li><strong>Home Delivery:</strong> Delivery personnel can carry a printout of the QR code to accept payments on the go.</li>
                        <li><strong>Freelancers:</strong> Share your QR code with clients to receive payments for your services.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
