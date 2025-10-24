
'use client';
import { useState } from 'react';
import { Header } from '@/components/app/header';
import { EmailSubjectLineTesterForm } from '@/components/app/email-subject-line-tester-form';
import { EmailSubjectLineTesterResults, type SubjectLineAnalysis } from '@/components/app/email-subject-line-tester-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Email Subject Line Tester",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to analyze email subject lines for potential issues like spam triggers, length, and sentiment to improve open rates.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

function EmailSubjectLineTesterPageWrapper() {
  const [analysis, setAnalysis] = useState<SubjectLineAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [subject, setSubject] = useState('');

  return (
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
  );
}

export default function EmailSubjectLineTesterPage() {
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
        <EmailSubjectLineTesterPageWrapper />
      </main>
    </div>
  );
}
