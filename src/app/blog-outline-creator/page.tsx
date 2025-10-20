'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { BlogOutlineForm } from '@/components/app/blog-outline-creator-form';
import { BlogOutlineResults } from '@/components/app/blog-outline-creator-results';
import type { BlogOutline } from '@/ai/flows/generate-blog-outline';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BlogOutlineCreatorPage() {
  const [outline, setOutline] = useState<BlogOutline | null>(null);
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
          <BlogOutlineForm
            setOutline={setOutline}
            setIsLoading={setIsLoading}
            setHasGenerated={setHasGenerated}
          />
          <BlogOutlineResults
            outline={outline}
            isLoading={isLoading}
            hasGenerated={hasGenerated}
          />
        </div>
      </main>
    </div>
  );
}
