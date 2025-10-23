
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { CaseConverter } from '@/components/app/case-converter/case-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Case Converter | 99forevertools',
  description: 'Easily convert text between different cases: UPPERCASE, lowercase, Title Case, and Sentence case. A simple tool for writers and editors.',
};

export default function CaseConverterPage() {
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
        <CaseConverter />
      </main>
    </div>
  );
}
