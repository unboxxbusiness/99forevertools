
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SocialMediaImageGenerator = dynamic(
  () => import('@/components/app/social-media-image-generator/social-media-image-generator').then(mod => mod.SocialMediaImageGenerator),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                 <Skeleton className="w-full h-24 rounded-lg" />
                 <Skeleton className="w-full h-48 rounded-lg" />
                 <Skeleton className="w-full h-64 rounded-lg" />
            </div>
            <div className="lg:col-span-2 space-y-4">
                 <Skeleton className="w-full h-[600px] rounded-lg" />
            </div>
        </div>
      </div>
    )
  }
);

export function SocialMediaImageGeneratorLoader() {
    return <SocialMediaImageGenerator />;
}
