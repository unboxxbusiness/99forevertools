
'use client';

import { Layers, MoveRight } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full print-hidden">
        {/* Top Banner with Offer */}
        <div className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2 md:py-3 text-center">
              <Link href="#lifetime-offer" className="inline-flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-xs md:text-sm flex-wrap justify-center">
                    <span className="leading-tight">Stop Paying Monthly Fees! Get a Lifetime Website for ₹10,000.</span>
                    <span className="font-bold underline underline-offset-2 flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
                        Claim Offer
                        <MoveRight className="h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 flex-shrink-0" />
                    </span>
                </Link>
            </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-border/50 bg-background/90 backdrop-blur-sm">
            <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0 min-w-0">
                <Layers className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
                <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tighter text-foreground truncate">
                    99forevertools
                </h1>
                </Link>
            </div>
        </div>
    </header>
  );
}
