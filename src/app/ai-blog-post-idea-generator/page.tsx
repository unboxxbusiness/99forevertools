import { Header } from '@/components/app/header';
import { AiBlogPostIdeaGenerator } from '@/components/app/ai-blog-post-idea-generator/ai-blog-post-idea-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Blog Post Idea Generator | 99forevertools',
  description: 'Generate a list of blog post ideas based on a topic.',
};

export default function AiBlogPostIdeaGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
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
        <AiBlogPostIdeaGenerator />
      </main>
    </div>
  );
}
