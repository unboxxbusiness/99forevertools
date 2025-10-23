
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { SchemaGeneratorForm } from '@/components/app/schema-generator/schema-generator-form';
import { SchemaResults } from '@/components/app/schema-generator/schema-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Markup Generator (FAQ, Article) | 99forevertools',
  description: 'Generate structured data (JSON-LD) for your website. Create schema for articles, FAQs, and local businesses to improve your SEO.',
};

export default function SchemaGeneratorPage() {
  const [schema, setSchema] = useState<string>('');

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SchemaGeneratorForm setSchema={setSchema} />
          <SchemaResults schema={schema} />
        </div>
      </main>
    </div>
  );
}
