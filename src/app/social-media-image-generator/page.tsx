
import { Header } from '@/components/app/header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the generator component with SSR disabled
const SocialMediaImageGenerator = dynamic(
  () => import('@/components/app/social-media-image-generator/social-media-image-generator').then(mod => mod.SocialMediaImageGenerator),
  { 
    ssr: false,
    loading: () => <div className="w-full max-w-7xl mx-auto p-8"><Skeleton className="w-full h-[600px] rounded-lg" /></div>
  }
);

export const metadata: Metadata = {
  title: 'Social Media Image Generator | 99forevertools',
  description: 'Create beautiful images for your social media posts. Start with a square template perfect for Instagram.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Social Media Image Generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create images for social media posts, starting with a square template for Instagram.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function SocialMediaImageGeneratorPage() {
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
        <SocialMediaImageGenerator />
      </main>
    </div>
  );
}
