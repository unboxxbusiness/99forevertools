
'use client';

import { Button } from "../ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function FooterOffer() {
    const features = [
        "Professional Website",
        "Lifetime Hosting Included",
        "SEO-Optimized",
        "Mobile-Responsive",
        "Lead-Capture Form",
        "One-Time Payment",
    ];

    return (
        <section id="lifetime-deal" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-background border-y border-border/50">
            <div className="mx-auto max-w-5xl space-y-8 px-6 text-center md:space-y-12">
                <div className="relative z-10 mx-auto max-w-2xl space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Stop Paying Monthly Fees
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Get your professional, lead-generating website with lifetime hosting for a single, one-time payment. No subscriptions, no recurring costs.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-primary/30 bg-card p-8 shadow-2xl shadow-primary/10">
                    <div className="grid items-center gap-6 md:grid-cols-3">
                        <div className="text-left md:col-span-2 space-y-2">
                             <p className="font-semibold text-primary">LIMITED-TIME LAUNCH OFFER</p>
                             <p className="text-4xl font-bold">Get a Lifetime Website Package</p>
                             <p className="text-muted-foreground">Includes design, development, and lifetime hosting.</p>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-lg text-muted-foreground line-through">₹25,000</p>
                            <p className="text-5xl font-extrabold text-primary">₹8,300</p>
                            <p className="text-sm font-medium">One-Time Payment</p>
                        </div>
                    </div>
                </div>

                 <div className="text-center">
                    <Button asChild size="lg" className="h-12 text-lg px-8">
                        <Link href="/offer">Claim Your Lifetime Deal</Link>
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
                </div>
            </div>
        </section>
    );
}
