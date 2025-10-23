import { Header } from '@/components/app/header';
import { MetaTagGeneratorForm } from '@/components/app/meta-tag-generator-form';
import { MetaTagGeneratorResults } from '@/components/app/meta-tag-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERP Preview & Meta Tag Generator | 99forevertools',
  description: 'Preview how your meta title and description will look on a Google search result page (SERP) and generate the HTML tags.',
};

function MetaTagGeneratorWrapper() {
  'use client';
  const [title, setTitle] = useState('Example Title | Brand Name');
  const [description, setDescription] = useState('This is an example of a meta description. It should be concise and relevant to the page content, aiming for around 155 characters.');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <MetaTagGeneratorForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      <MetaTagGeneratorResults
        title={title}
        description={description}
      />
    </div>
  );
}

export default function MetaTagGeneratorPage() {
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
        <MetaTagGeneratorWrapper />
      </main>
    </div>
  );
}
