import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { BackToTopButton } from '@/components/app/back-to-top-button';
import { Footer } from '@/components/app/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Marketing ToolKit',
  description: 'Your one-stop solution for marketing tools',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
        <BackToTopButton />
        <Footer />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').catch(() => {});
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
