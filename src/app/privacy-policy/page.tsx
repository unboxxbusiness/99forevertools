import { Header } from '@/components/app/header';
import { PrivacyPolicyContent } from '@/components/app/privacy-policy/privacy-policy-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | 99forevertools',
  description: 'Read the privacy policy for using the 99forevertools website and its services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <PrivacyPolicyContent />
      </main>
    </>
  );
}
