'use client';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function OfferPage() {
  const features = [
    'Lifetime Hosting Included',
    'Custom Domain Name',
    'Mobile-Responsive Design',
    'SEO-Optimized Structure',
    'Up to 5 Pages',
    'Contact Form Integration',
    'Social Media Links',
    'No Monthly or Yearly Fees',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-16 md:py-24">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
              Stop Paying Monthly Fees!
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Get a stunning, professional website for your business with a single, one-time payment.
              Never worry about recurring hosting or platform fees again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-card p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-bold mb-4">What You Get</h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/10 p-8 rounded-xl border-2 border-primary shadow-2xl shadow-primary/10 text-center">
              <h2 className="text-xl font-semibold text-primary">One-Time Payment</h2>
              <p className="text-6xl font-bold my-4">
                ₹10,000
              </p>
              <p className="text-muted-foreground mb-6">+18% GST</p>
              <Button size="lg" className="w-full text-lg h-14" asChild>
                <a href="https://wa.me/919876543210?text=I'm%20interested%20in%20the%20lifetime%20website%20offer%20for%20%E2%82%B910,000." target="_blank" rel="noopener noreferrer">
                  Claim Offer on WhatsApp
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Limited Time Offer. Click to start a conversation.
              </p>
            </div>
          </div>
           <div className="text-center mt-12">
                <Button variant="ghost" asChild>
                    <Link href="/">
                        &larr; Back to Main Site
                    </Link>
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
