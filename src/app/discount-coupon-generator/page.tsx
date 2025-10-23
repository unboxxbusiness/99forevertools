import { Header } from '@/components/app/header';
import { DiscountCouponGenerator } from '@/components/app/discount-coupon-generator/discount-coupon-generator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Coupon Code Generator | 99forevertools',
  description: 'Create batches of unique, random coupon codes for your marketing campaigns. Customize length, characters, prefix, and suffix.',
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Discount Coupon Code Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create batches of unique, random coupon codes for marketing campaigns with customization options.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

export default function DiscountCouponGeneratorPage() {
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
        <DiscountCouponGenerator />
      </main>
    </div>
  );
}
