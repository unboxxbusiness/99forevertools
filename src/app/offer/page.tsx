"use client";

import { HeroSection } from '@/components/app/offer/hero-section';
import { FeaturesSection } from '@/components/app/offer/features-section';
import { BenefitsSection } from '@/components/app/offer/benefits-section';
import { PricingSection } from '@/components/app/offer/pricing-section';
import { GuaranteeSection } from '@/components/app/offer/guarantee-section';
import { FinalCTASection } from '@/components/app/offer/final-cta-section';

export default function OfferPage() {

  const whatsAppUrl = "https://wa.me/918851481785?text=Hi!%20I'm%20interested%20in%20the%20Lifetime%20Website%20Offer%20for%20%E2%82%B98,300.";

  return (
    <div className="bg-background text-foreground">
      <HeroSection whatsAppUrl={whatsAppUrl} />
      <FeaturesSection />
      <div className="py-24 px-4 max-w-5xl mx-auto space-y-16">
        <BenefitsSection />
        <PricingSection whatsAppUrl={whatsAppUrl} />
        <GuaranteeSection />
        <FinalCTASection whatsAppUrl={whatsAppUrl} />
      </div>
    </div>
  );
}
