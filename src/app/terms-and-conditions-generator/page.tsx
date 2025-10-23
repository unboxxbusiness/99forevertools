import { Header } from '@/components/app/header';
import { TermsAndConditionsGeneratorForm } from '@/components/app/terms-and-conditions-generator/terms-and-conditions-generator-form';
import { TermsAndConditionsGeneratorResults } from '@/components/app/terms-and-conditions-generator/terms-and-conditions-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions Generator | 99forevertools',
  description: 'Generate a generic Terms & Conditions document for your website or app. Fill in your company details to create a template.',
};

function TermsAndConditionsWrapper() {
  'use client';
  const [terms, setTerms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <TermsAndConditionsGeneratorForm
          setTerms={setTerms}
          setIsLoading={setIsLoading}
          setHasGenerated={setHasGenerated}
        />
      </div>
      <div className="lg:col-span-2">
        <TermsAndConditionsGeneratorResults
          terms={terms}
          isLoading={isLoading}
          hasGenerated={hasGenerated}
        />
      </div>
    </div>
  );
}

export default function TermsAndConditionsGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <TermsAndConditionsWrapper />
      </main>
    </div>
  );
}
