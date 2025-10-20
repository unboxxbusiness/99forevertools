'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { PasCopywriterForm } from '@/components/app/pas-copywriter-form';
import { PasCopywriterResults } from '@/components/app/pas-copywriter-results';
import type { PasCopyGeneratorOutput } from '@/ai/flows/generate-pas-copy';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PasCopywriterPage() {
  const [copy, setCopy] = useState<PasCopyGeneratorOutput | null>(null);
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
          <PasCopywriterForm
            setCopy={setCopy}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
          />
          <PasCopywriterResults
            copy={copy}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
          />
        </div>
      </main>
    </div>
  );
}
