import { Header } from '@/components/app/header';
import { WavToMp3Converter } from '@/components/app/wav-to-mp3-converter/wav-to-mp3-converter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WAV to MP3 Converter | 99forevertools',
  description: 'Convert your .wav audio files to .mp3 format directly in your browser. Fast, free, and private.',
};

export default function WavToMp3ConverterPage() {
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
        <WavToMp3Converter />
      </main>
    </div>
  );
}
