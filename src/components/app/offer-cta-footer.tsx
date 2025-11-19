
'use client';

import { Button } from "../ui/button";
import Link from "next/link";

export function OfferCtaFooter() {
    return (
        <section className="py-12 md:py-20 border-b border-border/50 bg-card">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-semibold lg:text-5xl">Ready to Ditch Monthly Fees Forever?</h2>
                    <p className="text-muted-foreground">Get a professional, lead-generating website with lifetime hosting for a single, one-time payment. No subscriptions, no recurring costs.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-muted rounded-lg space-y-4 py-8 text-center">
                        <div className="text-5xl font-bold text-primary">₹8,300</div>
                        <p className="text-muted-foreground">One-Time Price</p>
                    </div>
                    <div className="bg-muted rounded-lg space-y-4 py-8 text-center">
                        <div className="text-5xl font-bold">60%+</div>
                        <p className="text-muted-foreground">Instant Savings</p>
                    </div>
                    <div className="bg-muted rounded-lg space-y-4 py-8 text-center">
                        <div className="text-5xl font-bold">₹0</div>
                        <p className="text-muted-foreground">Monthly Hosting Fees</p>
                    </div>
                </div>

                 <div className="text-center">
                    <Button asChild size="lg" className="text-lg">
                        <Link href="/offer">Claim Your Lifetime Website</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
