import { Header } from '@/components/app/header';
import { YouTubeThumbnailPreview } from '@/components/app/youtube-thumbnail-preview/youtube-thumbnail-preview';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Preview Tool | 99forevertools',
  description: 'See how your thumbnail and video title will look on the YouTube homepage before you upload.',
};

export default function YouTubeThumbnailPreviewPage() {
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
        <YouTubeThumbnailPreview />
      </main>
    </div>
  );
}
