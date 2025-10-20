'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { SubjectLineForm } from '@/components/app/subject-line-form';
import { SubjectLineResults } from '@/components/app/subject-line-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SubjectLineGeneratorPage() {
  const [subjectLines, setSubjectLines] = useState<string[]>([]);
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
          <SubjectLineForm
            setSubjectLines={setSubjectLines}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
          />
          <SubjectLineResults
            subjectLines={subjectLines}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
          />
        </div>
      </main>
    </div>
  );
}
