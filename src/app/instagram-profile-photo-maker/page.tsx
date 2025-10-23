
import { Header } from '@/components/app/header';
import { InstagramProfilePhotoMaker } from '@/components/app/instagram-profile-photo-maker/instagram-profile-photo-maker';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram Profile Photo Maker | 99forevertools',
  description: 'Create a circular profile picture with a gradient story ring for Instagram. Add your photo and text to stand out.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Instagram Profile Photo Maker",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a circular profile picture for Instagram with a custom gradient story ring and text overlay.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function InstagramProfilePhotoMakerPage() {
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
        <InstagramProfilePhotoMaker />
      </main>
    </div>
  );
}
