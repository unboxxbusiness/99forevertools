import { Header } from '@/components/app/header';
import { TermsContent } from '@/components/app/terms/terms-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | 99forevertools',
  description: 'Read the terms and conditions for using the 99forevertools website and its services.',
};

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <TermsContent />
      </main>
    </>
  );
}
