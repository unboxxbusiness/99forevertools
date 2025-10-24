
import { Header } from '@/components/app/header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SocialMediaImageGeneratorLoader } from '@/components/app/social-media-image-generator/social-media-image-generator-loader';

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
        <SocialMediaImageGeneratorLoader />
      </main>
    </div>
  );
}
