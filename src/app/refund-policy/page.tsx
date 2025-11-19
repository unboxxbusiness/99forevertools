
import { Header } from '@/components/app/header';
import { RefundPolicyContent } from '@/components/app/refund-policy/refund-policy-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | 99forevertools',
  description: 'Read the refund policy for 99forevertools services.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <RefundPolicyContent />
      </main>
    </>
  );
}
