
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ReadabilityCheckerForm } from '@/components/app/readability-checker-form';
import { ReadabilityCheckerResults, type ReadabilityAnalysis } from '@/components/app/readability-checker-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Readability Score Calculator | 99forevertools',
  description: 'Check the readability of your text with the Flesch-Kincaid test. Improve your content by making it easier to understand.',
};

export default function ReadabilityCheckerPage() {
  const [analysis, setAnalysis] = useState<ReadabilityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

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
        <div className="space-y-12">
          <ReadabilityCheckerForm
            setAnalysis={setAnalysis}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
          />
          <ReadabilityCheckerResults
            analysis={analysis}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
          />
        </div>
      </main>
    </div>
  );
}
