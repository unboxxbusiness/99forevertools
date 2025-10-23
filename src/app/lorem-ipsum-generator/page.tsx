import { Header } from '@/components/app/header';
import { LoremIpsumGeneratorForm } from '@/components/app/lorem-ipsum-generator-form';
import { LoremIpsumGeneratorResults } from '@/components/app/lorem-ipsum-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | 99forevertools',
  description: 'Generate placeholder text (Lorem Ipsum) for your mockups and designs. Specify the number of paragraphs you need.',
};

function LoremIpsumGeneratorWrapper() {
  'use client';
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <LoremIpsumGeneratorForm
          setText={setText}
          setIsLoading={setIsLoading}
          setHasGenerated={setHasGenerated}
        />
      </div>
      <div className="lg:col-span-2">
        <LoremIpsumGeneratorResults
          text={text}
          isLoading={isLoading}
          hasGenerated={hasGenerated}
        />
      </div>
    </div>
  );
}

export default function LoremIpsumGeneratorPage() {
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
        <LoremIpsumGeneratorWrapper />
      </main>
    </div>
  );
}
