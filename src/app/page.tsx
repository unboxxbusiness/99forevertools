'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { EmailPermutatorForm } from '@/components/app/email-permutator-form';
import { EmailPermutatorResults } from '@/components/app/email-permutator-results';

export default function Home() {
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-12">
          <EmailPermutatorForm
            setEmails={setEmails}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
          />
          <EmailPermutatorResults
            emails={emails}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
          />
        </div>
      </main>
    </div>
  );
}
