'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/app/header';
import { UtmLinkBuilderForm, type UtmParams } from '@/components/app/utm-link-builder/utm-link-builder-form';
import { UtmLinkBuilderResults } from '@/components/app/utm-link-builder/utm-link-builder-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UtmLinkBuilderPage() {
  const [utmParams, setUtmParams] = useState<UtmParams>({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });
  const [generatedUrl, setGeneratedUrl] = useState('');

  useEffect(() => {
    try {
      if (!utmParams.url) {
        setGeneratedUrl('');
        return;
      }
      
      const url = new URL(utmParams.url.startsWith('http') ? utmParams.url : `https://${utmParams.url}`);
      
      Object.entries(utmParams).forEach(([key, value]) => {
        if (key !== 'url' && value) {
          url.searchParams.set(`utm_${key}`, value);
        }
      });
      
      setGeneratedUrl(url.toString());
    } catch (error) {
      // Invalid URL, do nothing
      setGeneratedUrl('');
    }
  }, [utmParams]);


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
          <UtmLinkBuilderForm utmParams={utmParams} setUtmParams={setUtmParams} />
          <UtmLinkBuilderResults url={generatedUrl} />
        </div>
      </main>
    </div>
  );
}
