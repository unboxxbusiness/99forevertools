import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { BackToTopButton } from '@/components/app/back-to-top-button';
import { Footer } from '@/components/app/footer';
import { Button } from '@/components/ui/button';
import { Check, MoveRight } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Marketing ToolKit',
  description: 'Your one-stop solution for marketing tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        {children}
        <Toaster />
        <BackToTopButton />
        <footer id="lifetime-deal" className="w-full py-20 lg:py-40 print-hidden scroll-mt-20">
            <div className="container mx-auto">
                <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-3xl md:text-5xl tracking-tighter max-w-2xl font-bold text-primary">
                        Stop Paying Monthly Website Fees!
                        </h3>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                        Get Your Lead-Generation Website <span className="font-bold">FOREVER</span>. Pay once, get more customers for life.
                        </p>
                    </div>
                    
                    <div className="text-left space-y-4">
                        <h4 className="text-xl font-semibold text-center">Package Includes:</h4>
                        <ul className="space-y-2">
                        <li className="flex items-center gap-3">
                            <span className="bg-green-500/20 text-green-300 rounded-full p-1">
                            <Check className="w-4 h-4" />
                            </span>
                            <span className="font-mono">Professional Lead-Gen Website <span className="text-muted-foreground">(Value: ₹15,000)</span></span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-green-500/20 text-green-300 rounded-full p-1">
                            <Check className="w-4 h-4" />
                            </span>
                            <span className="font-mono">FREE Lifetime Hosting <span className="text-muted-foreground">(Value: ₹5,000/Year)</span></span>
                        </li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">
                            Total Value: <span className="line-through text-muted-foreground">~₹20,000~</span>
                        </p>
                        <p className="mt-2 text-4xl md:text-5xl font-bold text-primary">
                            One-Time Price: ₹10,000
                        </p>
                        <p className="text-muted-foreground">(No Monthly Fees. Ever.)</p>
                    </div>

                    <Button asChild size="lg">
                        <a
                        href="https://99foreversite.shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Claim Your ₹10,000 Offer <MoveRight className="w-5 h-5 ml-2" />
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
        <Footer />
      </body>
    </html>
  );
}
