"use client";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type HeroSectionProps = {
  whatsAppUrl: string;
};

export function HeroSection({ whatsAppUrl }: HeroSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <Image
          className="rounded-lg"
          src="https://res.cloudinary.com/dhrigocvd/image/upload/v1763533783/99foreversite_lead_gen_wwo4wz.webp"
          alt="Modern website on a laptop"
          height={600}
          width={1200}
          data-ai-hint="website laptop"
          loading="lazy"
        />
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-fluid-h2 font-medium">Unlock Your Own 24/7 Lead-Generation Machine… For A Single One-Time Payment</h2>
          <div className="space-y-6">
            <p className="font-semibold text-primary text-fluid-lg">This is a limited-time launch offer.</p>
            <p className="text-muted-foreground text-fluid-base">(Never Pay Monthly Fees Again!)</p>
            <Button
              asChild
              size="lg"
              className="gap-1 h-12 text-lg">
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <span>Book Offer Now</span>
                <ChevronRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
