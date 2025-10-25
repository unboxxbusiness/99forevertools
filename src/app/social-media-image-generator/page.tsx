import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'This tool has been retired.',
  robots: { index: false, follow: false },
};

export default function Page() {
  notFound();
}
