import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { BackToTopButton } from '@/components/app/back-to-top-button';
import { Footer } from '@/components/app/footer';
import { StickyBanner } from '@/components/ui/sticky-banner';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Marketing ToolKit',
  description: 'Your one-stop solution for marketing tools',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        <StickyBanner>
          <Link href="/offer" className="text-center text-sm font-medium">
              <span className="group inline-flex items-center gap-2">
                  <span>
                      Stop Paying Monthly Fees! Get a Lifetime Website for <del>₹15,000</del> just <strong>₹8,300</strong> ($99 USD).
                  </span>
                  <span className="font-bold underline underline-offset-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Claim Offer
                      <MoveRight className="h-4 w-4" />
                  </span>
              </span>
          </Link>
        </StickyBanner>
        {children}
        <Toaster />
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  );
}
