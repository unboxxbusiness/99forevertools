import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { BackToTopButton } from '@/components/app/back-to-top-button';
import { Footer } from '@/components/app/footer';

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
        {children}
        <Toaster />
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  );
}
