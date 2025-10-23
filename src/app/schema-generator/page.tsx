import { Header } from '@/components/app/header';
import { SchemaGeneratorForm } from '@/components/app/schema-generator/schema-generator-form';
import { SchemaResults } from '@/components/app/schema-generator/schema-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Markup Generator (JSON-LD) | 99forevertools',
  description: 'Generate structured data markup for Articles, FAQs, and Local Businesses to improve your SEO and get rich snippets.',
};

function SchemaGeneratorWrapper() {
  'use client';
  const [schema, setSchema] = useState<string>('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <SchemaGeneratorForm setSchema={setSchema} />
      <SchemaResults schema={schema} />
    </div>
  );
}

export default function SchemaGeneratorPage() {
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
        <SchemaGeneratorWrapper />
      </main>
    </div>
  );
}
