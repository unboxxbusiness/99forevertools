
'use client';
import { useState } from 'react';
import { Header } from '@/components/app/header';
import { KeywordDensityCheckerForm } from '@/components/app/keyword-density-checker-form';
import { KeywordDensityCheckerResults, type KeywordDensityAnalysis } from '@/components/app/keyword-density-checker-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function KeywordDensityCheckerWrapper() {
  const [analysis, setAnalysis] = useState<KeywordDensityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <div className="space-y-12">
      <KeywordDensityCheckerForm
        setAnalysis={setAnalysis}
        setIsLoading={setIsLoading}
        setHasGenerated={setHasGenerated}
        setKeyword={setKeyword}
      />
      <KeywordDensityCheckerResults
        analysis={analysis}
        isLoading={isLoading}
        hasGenerated={hasGenerated}
        keyword={keyword}
      />
    </div>
  );
}

export default function KeywordDensityCheckerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className='pl-0'>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <KeywordDensityCheckerWrapper />
      </main>
    </div>
  );
}
