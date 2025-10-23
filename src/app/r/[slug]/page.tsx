
'use client';

import { useEffect } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting...',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedirectPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const destination = searchParams.get('to');
    
    if (destination) {
      try {
        // Basic validation for the destination URL
        const url = new URL(destination);
        if (['http:', 'https:'].includes(url.protocol)) {
            window.location.replace(destination);
        } else {
            console.error("Invalid protocol for redirection.");
            notFound();
        }
      } catch (error) {
        console.error("Invalid destination URL:", error);
        notFound();
      }
    } else {
      notFound();
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4">
        <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-lg text-muted-foreground">Redirecting...</p>
        </div>
    </div>
  );
}
