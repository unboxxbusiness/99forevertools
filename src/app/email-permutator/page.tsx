import { Header } from '@/components/app/header';
import { EmailPermutatorForm } from '@/components/app/email-permutator-form';
import { EmailPermutatorResults } from '@/components/app/email-permutator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Permutator: Find Any Email Address | 99forevertools',
  description: 'Generate a list of possible email addresses for a person based on their first name, last name, and a domain.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Email Permutator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to generate a list of possible email addresses for a person based on their first name, last name, and a domain.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

function EmailPermutatorPageWrapper() {
  'use client';
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
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
  );
}

export default function EmailPermutatorPage() {
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
        <EmailPermutatorPageWrapper />
      </main>
    </div>
  );
}
