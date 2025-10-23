
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { EmailSubjectLineTesterForm } from '@/components/app/email-subject-line-tester-form';
import { EmailSubjectLineTesterResults, type SubjectLineAnalysis } from '@/components/app/email-subject-line-tester-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Subject Line Tester | 99forevertools',
  description: 'Analyze your email subject lines for potential issues. Get a score based on length, spam triggers, and emotional impact to improve open rates.',
};

export default function EmailSubjectLineTesterPage() {
  const [analysis, setAnalysis] = useState<SubjectLineAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [subject, setSubject] = useState('');

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
          <EmailSubjectLineTesterForm
            setAnalysis={setAnalysis}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
            setSubject={setSubject}
          />
          <EmailSubjectLineTesterResults
            analysis={analysis}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
            subject={subject}
          />
        </div>
      </main>
    </div>
  );
}
