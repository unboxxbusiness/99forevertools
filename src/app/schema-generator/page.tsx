
'use client';
import { useState } from 'react';
import { Header } from '@/components/app/header';
import { SchemaGeneratorForm } from '@/components/app/schema-generator/schema-generator-form';
import { SchemaResults } from '@/components/app/schema-generator/schema-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const schemaJson = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Schema Markup Generator (JSON-LD)",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to generate structured data markup (JSON-LD) for Articles, FAQs, and Local Businesses.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

function SchemaGeneratorWrapper() {
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
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
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
        <SchemaGeneratorWrapper />
      </main>
    </div>
  );
}
