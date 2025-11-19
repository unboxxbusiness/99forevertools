
'use client';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { BackToTopButton } from '@/components/app/back-to-top-button';
import { Footer } from '@/components/app/footer';
import React from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// We can't export metadata from a client component, but we can keep it here for reference
// export const metadata: Metadata = {
//   title: 'Marketing ToolKit',
//   description: 'Your one-stop solution for marketing tools',
//   icons: {
//     icon: '/favicon.svg',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        {children}
        <Toaster />
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  );
}
