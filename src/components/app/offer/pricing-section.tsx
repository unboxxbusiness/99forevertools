"use client";
import { Button } from '@/components/ui/button';

type PricingSectionProps = {
  whatsAppUrl: string;
};

export function PricingSection({ whatsAppUrl }: PricingSectionProps) {
    return (
        <div id="pricing" className="border-2 border-primary/50 rounded-xl p-8 lg:p-12 text-center bg-card shadow-2xl shadow-primary/10 space-y-4">
             <p className="text-fluid-lg font-semibold text-muted-foreground">Total Real Value: <span className="line-through">Over ₹20,000+</span></p>
             <p className="text-fluid-xl font-bold">But today, because you are early…</p>
             <h2 className="text-fluid-h1 font-extrabold text-primary">You Pay ONLY ₹8,300 <span className="text-2xl">(One-Time)</span></h2>
             <p className="text-muted-foreground max-w-md mx-auto text-fluid-base">(One-Time $99 — No Monthly Fees. No Renewals. Nothing Ever Again.)</p>
             <p className="text-green-400 font-semibold text-fluid-xl">🎉 You save over 60% instantly — and avoid lifetime hosting costs.</p>
             <div className="pt-4">
                <Button asChild size="lg" className="w-full max-w-md text-lg h-14 bg-green-600 text-white hover:bg-green-700 shadow-lg">
                    <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                       Book Offer Now
                    </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Click the button to secure your lifetime deal.</p>
             </div>
        </div>
    );
}
