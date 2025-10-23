import { Header } from '@/components/app/header';
import { PasswordGeneratorForm } from '@/components/app/password-generator/password-generator-form';
import { PasswordGeneratorResults } from '@/components/app/password-generator/password-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Password Generator | 99forevertools',
  description: 'Generate strong, secure, and random passwords. Customize length and character types (uppercase, numbers, symbols).',
};

function PasswordGeneratorWrapper() {
  'use client';
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <PasswordGeneratorForm
          setPassword={setPassword}
          setIsLoading={setIsLoading}
          setHasGenerated={setHasGenerated}
        />
      </div>
      <div className="lg:col-span-2">
        <PasswordGeneratorResults
          password={password}
          isLoading={isLoading}
          hasGenerated={hasGenerated}
        />
      </div>
    </div>
  );
}

export default function PasswordGeneratorPage() {
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
        <PasswordGeneratorWrapper />
      </main>
    </div>
  );
}
