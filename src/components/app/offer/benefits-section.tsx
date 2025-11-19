"use client";
import Image from 'next/image';
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Star } from 'lucide-react';

export function BenefitsSection() {
    return (
         <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
                <Image src="https://picsum.photos/seed/offer2/600/500" alt="Secure Hosting Graphic" className="rounded-lg shadow-xl" data-ai-hint="server security" width={600} height={500} />
            </div>
            <div className="order-1 md:order-2">
                <TimelineContent
                      as="div"
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary"
                  >
                      <Star className="h-5 w-5" />
                      <span className="font-semibold">ITEM #2</span>
                  </TimelineContent>
                  <TimelineContent
                      as="h3"
                      className="text-3xl font-bold mt-4"
                  >
                    FREE Lifetime “Business-Class” Hosting
                  </TimelineContent>
                  <TimelineContent
                      as="p"
                      className="text-muted-foreground mt-2"
                  >
                      Say goodbye to monthly and yearly hosting bills — forever. Your site stays fast, secure, and live without you ever paying again.
                  </TimelineContent>
                <TimelineContent as="p" className="text-lg font-semibold pt-4">Real Value: <span className="line-through text-muted-foreground">₹5,000 every year — for life</span></TimelineContent>
            </div>
        </div>
    );
}
