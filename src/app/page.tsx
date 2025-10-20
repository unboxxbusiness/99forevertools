'use client';

import type { QualifiedLead } from '@/ai/flows/qualify-leads';
import { useState } from 'react';
import { Header } from '@/components/app/header';
import { LeadForm } from '@/components/app/lead-form';
import { LeadResults } from '@/components/app/lead-results';

export default function Home() {
  const [leads, setLeads] = useState<QualifiedLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-12">
          <LeadForm
            setLeads={setLeads}
            setIsLoading={setIsLoading}
            setHasSearched={setHasSearched}
          />
          <LeadResults
            leads={leads}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />
        </div>
      </main>
    </div>
  );
}
