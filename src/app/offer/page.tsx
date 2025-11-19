
"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, CheckCircle, Clock, PlayCircle, Rocket, Search, Smartphone, Sparkles, Star, Trophy, Zap } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="bg-background text-foreground animate-fade-in">
        <div className="relative isolate overflow-hidden bg-gray-900">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="flex justify-center items-center gap-2 text-yellow-400">
                        <AlertTriangle className="h-5 w-5" />
                        <h2 className="text-lg font-semibold uppercase tracking-wider">
                           This Special Launch Offer Is Ending Soon
                        </h2>
                    </div>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Unlock Your Own 24/7 Lead-Generation Machine… For A Single One-Time Payment
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        (Never Pay Monthly Fees Again!)
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
                        <div className="w-full max-w-xl aspect-video bg-black rounded-lg border border-primary/20 flex items-center justify-center flex-col gap-2">
                           <PlayCircle className="h-16 w-16 text-primary" />
                           <p className="text-primary/70">▶️ Press PLAY on the video below to discover how this can change your business…</p>
                        </div>
                         <Button asChild size="lg" className="w-full max-w-md text-lg h-14 bg-green-600 text-white hover:bg-green-700">
                            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                                Book Offer Now
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
             <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>

        <div className="py-24 px-4 max-w-5xl mx-auto space-y-16">
            <div className="text-center">
                 <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Here’s EXACTLY What You Get When You Order TODAY…
                 </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary">
                        <Star className="h-5 w-5" />
                        <span className="font-semibold">ITEM #1</span>
                    </div>
                    <h3 className="text-3xl font-bold">A Professional Lead-Generation Website</h3>
                    <p className="text-muted-foreground">
                        This isn’t just a website… It’s a customer-acquisition system designed to convert visitors into paying clients day and night.
                    </p>
                    <ul className="space-y-3 pt-2">
                        <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>Works even while you're asleep 🌙</span></li>
                        <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>Built using proven conversion principles 🚀</span></li>
                        <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>Fully responsive on all devices 📱</span></li>
                        <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>Loads fast (Google LOVES this) ⚡</span></li>
                        <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /><span>Instantly boosts your brand image 💼</span></li>
                    </ul>
                    <p className="text-lg font-semibold pt-2">Real Value: <span className="line-through text-muted-foreground">₹15,000</span></p>
                </div>
                <div>
                    <img src="https://picsum.photos/seed/offer1/600/500" alt="Professional Website Mockup" className="rounded-lg shadow-xl" data-ai-hint="website mockup" />
                </div>
            </div>

             <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="order-2 md:order-1">
                    <img src="https://picsum.photos/seed/offer2/600/500" alt="Secure Hosting Graphic" className="rounded-lg shadow-xl" data-ai-hint="server security" />
                </div>
                <div className="space-y-4 order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-primary">
                        <Star className="h-5 w-5" />
                        <span className="font-semibold">ITEM #2</span>
                    </div>
                    <h3 className="text-3xl font-bold">FREE Lifetime “Business-Class” Hosting</h3>
                    <p className="text-muted-foreground">
                        Say goodbye to monthly and yearly hosting bills — forever. Your site stays fast, secure, and live without you ever paying again.
                    </p>
                    <p className="text-lg font-semibold pt-2">Real Value: <span className="line-through text-muted-foreground">₹5,000 every year — for life</span></p>
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
    
