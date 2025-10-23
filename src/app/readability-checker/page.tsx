import { Header } from '@/components/app/header';
import { ReadabilityCheckerForm } from '@/components/app/readability-checker-form';
import { ReadabilityCheckerResults, type ReadabilityAnalysis } from '@/components/app/readability-checker-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Readability Checker | 99forevertools',
  description: 'Calculate the Flesch-Kincaid readability score of your text to see how easy it is to understand.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Readability Checker",
  "applicationCategory": "TextApplication",
  "operatingSystem": "Web",
  "description": "A free tool to calculate the Flesch-Kincaid readability score of a text to determine its ease of understanding.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

function ReadabilityCheckerWrapper() {
  'use client';
  const [analysis, setAnalysis] = useState<ReadabilityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
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
  );
}

export default function ReadabilityCheckerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
        <ReadabilityCheckerWrapper />
      </main>
    </div>
  );
}
