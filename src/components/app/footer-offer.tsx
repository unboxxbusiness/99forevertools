'use client';

import { Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FooterOffer() {
  return (
    <div id="lifetime-offer" className="bg-gradient-to-r from-primary/95 to-primary text-primary-foreground py-6 sm:py-8 md:py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-pulse flex-shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold leading-tight">
              Limited Time Offer: Lifetime Website Package
            </h2>
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 animate-pulse flex-shrink-0" />
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-lg opacity-90 mb-4 sm:mb-6 px-2">
            Stop paying monthly fees forever! Get your professional business website with lifetime access.
          </p>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4">
              <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm md:text-base truncate">Professional Website</p>
                <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-80 line-clamp-1">Fully responsive & SEO-optimized</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4">
              <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm md:text-base truncate">50+ Free Tools</p>
                <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-80 line-clamp-1">Business calculators & generators</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 md:p-4">
              <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm md:text-base truncate">Lifetime Access</p>
                <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-80 line-clamp-1">No monthly fees, ever!</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-5 sm:mb-6 md:mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
              <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-80 line-through mb-0.5 sm:mb-1">Regular Price: ₹25,000</p>
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold">₹10,000</p>
              <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-90 mt-0.5 sm:mt-1">One-Time Payment • Lifetime Access</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 px-2">
            <a 
              href="https://99foreversite.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto max-w-md"
            >
              <Button 
                size="lg" 
                className="w-full bg-white text-primary hover:bg-white/90 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                Claim Your Lifetime Deal Now →
              </Button>
            </a>
            <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm opacity-80 text-center">
              ⚡ Limited spots available • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
