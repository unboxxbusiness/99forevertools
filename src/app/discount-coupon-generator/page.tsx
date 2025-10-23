
'use client';

import { Header } from '@/components/app/header';
import { DiscountCouponGenerator } from '@/components/app/discount-coupon-generator/discount-coupon-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Coupon Code Generator | 99forevertools',
  description: 'Generate batches of unique, random discount codes for your marketing campaigns. Customize prefix, suffix, length, and character set.',
};

export default function DiscountCouponGeneratorPage() {
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
        <DiscountCouponGenerator />
      </main>
    </div>
  );
}
