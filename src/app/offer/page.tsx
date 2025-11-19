
"use client";
import { Button } from "@/components/ui/button";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { AlertTriangle, ArrowRight, CheckCircle, Clock, PlayCircle, Rocket, Search, Smartphone, Sparkles, Star, Trophy, Zap, CheckCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Image from 'next/image';

export default function OfferPage() {
  const features = [
    { text: "Lifetime Hosting (never pay again — ever)", icon: <Zap/> },
    { text: "Custom Domain Setup Included", icon: <CheckCircle/> },
    { text: "Mobile-Responsive & Conversion-Optimized", icon: <Smartphone/> },
    { text: "SEO-Ready Structure to Rank Fast", icon: <Search/> },
    { text: "Up to 5 Premium-Designed Pages", icon: <Trophy/> },
    { text: "Lead Capture Forms Installed", icon: <CheckCircle/> },
    { text: "All Social Media Links Added", icon: <Sparkles/> },
    { text: "No Monthly or Yearly Fees — Permanent Access", icon: <Clock/> },
  ];

  const whatsAppUrl = "https://wa.me/918851481785?text=Hi!%20I'm%20interested%20in%20the%20Lifetime%20Website%20Offer%20for%20₹8,300.";
  const pageRef = useRef<HTMLDivElement>(null);

  const listFeatures = [
    "Works even while you're asleep 🌙",
    "Built using proven conversion principles 🚀",
    "Fully responsive on all devices 📱",
    "Loads fast (Google LOVES this) ⚡",
    "Instantly boosts your brand image 💼",
  ]

  return (
    <div className="bg-background text-foreground" ref={pageRef}>
        <section className="py-16 md:py-24">
             <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                 <Image
                     className="rounded-lg"
                     src="https://picsum.photos/seed/offer-hero/1200/600"
                     alt="Modern website on a laptop"
                     height="600"
                     width="1200"
                     data-ai-hint="website laptop"
                     loading="lazy"
                 />
                  <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                     <h2 className="text-4xl font-medium">Unlock Your Own 24/7 Lead-Generation Machine… For A Single One-Time Payment</h2>
                     <div className="space-y-6">
                         <p className="text-muted-foreground">(Never Pay Monthly Fees Again!)</p>
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

        <div className="py-24 px-4 max-w-5xl mx-auto space-y-16">
            <div className="text-center">
                 <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Here’s EXACTLY What You Get When You Order TODAY…
                 </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <TimelineContent
                        as="div"
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary"
                    >
                        <Star className="h-5 w-5" />
                        <span className="font-semibold">ITEM #1</span>
                    </TimelineContent>
                    <TimelineContent
                        as="h3"
                        className="text-3xl font-bold mt-4"
                    >
                      A Professional Lead-Generation Website
                    </TimelineContent>
                    <TimelineContent
                        as="p"
                        className="text-muted-foreground mt-2"
                    >
                        This isn’t just a website… It’s a customer-acquisition system designed to convert visitors into paying clients day and night.
                    </TimelineContent>
                    <ul className="space-y-3 pt-4">
                        {listFeatures.map((feature, i) => (
                           <TimelineContent
                            key={i}
                            as="li"
                            className="flex items-center gap-3"><CheckCheck className="h-5 w-5 text-primary" /><span>{feature}</span></TimelineContent>
                        ))}
                    </ul>
                    <TimelineContent as="p" className="text-lg font-semibold pt-4">Real Value: <span className="line-through text-muted-foreground">₹15,000</span></TimelineContent>
                </div>
                <div>
                    <Image src="https://picsum.photos/seed/offer1/600/500" alt="Professional Website Mockup" className="rounded-lg shadow-xl" data-ai-hint="website mockup" width={600} height={500} />
                </div>
            </div>

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

            <div id="pricing" className="border-2 border-primary/50 rounded-xl p-8 lg:p-12 text-center bg-card shadow-2xl shadow-primary/10 space-y-4">
                 <p className="text-lg font-semibold text-muted-foreground">Total Real Value: <span className="line-through">Over ₹20,000+</span></p>
                 <p className="text-xl font-bold">But today, because you are early…</p>
                 <h2 className="text-5xl md:text-6xl font-extrabold text-primary">You Pay ONLY ₹8,300 <span className="text-2xl">(One-Time)</span></h2>
                 <p className="text-muted-foreground max-w-md mx-auto">(One-Time $99 — No Monthly Fees. No Renewals. Nothing Ever Again.)</p>
                 <p className="text-green-400 font-semibold text-xl">🎉 You save over 60% instantly — and avoid lifetime hosting costs.</p>
                 <div className="pt-4">
                    <Button asChild size="lg" className="w-full max-w-md text-lg h-14 bg-green-600 text-white hover:bg-green-700 shadow-lg">
                        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                            Book Offer Now
                        </a>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Click the button to secure your lifetime deal.</p>
                 </div>
            </div>

            <div className="border border-border rounded-lg p-8 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 text-center">
                    <div className="inline-block bg-primary/10 p-4 rounded-full">
                        <Trophy className="h-16 w-16 text-primary"/>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold">Your 100% Satisfaction Promise</h3>
                    <p className="mt-2 text-muted-foreground">
                        You’re fully protected. If you’re not absolutely in love with your new website, we’ll revise it, polish it, and adjust it until you are. No risk. No stress. You either LOVE your website… or we work until you do.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Why Smart Business Owners Jump On This Immediately
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature) => (
                        <div key={feature.text} className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                             <div className="text-primary mt-1">{feature.icon}</div>
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center border-t border-border pt-16">
                 <p className="text-yellow-400 font-bold text-lg flex items-center justify-center gap-2"><Clock /> IMPORTANT: This Price Will Increase Soon</p>
                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">This is a limited-time launch offer. Once the timer hits zero or the slots are gone, the one-time pricing disappears — forever. Most website owners pay monthly… for years. You pay once and own it for life.</p>
                 <div className="mt-8">
                     <Button asChild size="lg" className="w-full max-w-lg text-xl h-16 bg-red-600 text-white hover:bg-red-700 shadow-lg">
                        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                           Book Offer Now
                        </a>
                    </Button>
                 </div>
            </div>
        </div>
    </div>
  );
}
