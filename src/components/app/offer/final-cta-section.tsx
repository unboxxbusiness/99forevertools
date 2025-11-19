"use client";
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Search, Smartphone, Sparkles, Trophy, Zap } from 'lucide-react';

const finalFeatures = [
    { text: "Lifetime Hosting (never pay again — ever)", icon: <Zap/> },
    { text: "Custom Domain Setup Included", icon: <CheckCircle/> },
    { text: "Mobile-Responsive & Conversion-Optimized", icon: <Smartphone/> },
    { text: "SEO-Ready Structure to Rank Fast", icon: <Search/> },
    { text: "Up to 5 Premium-Designed Pages", icon: <Trophy/> },
    { text: "Lead Capture Forms Installed", icon: <CheckCircle/> },
    { text: "All Social Media Links Added", icon: <Sparkles/> },
    { text: "No Monthly or Yearly Fees — Permanent Access", icon: <Clock/> },
];

type FinalCTASectionProps = {
  whatsAppUrl: string;
};

export function FinalCTASection({ whatsAppUrl }: FinalCTASectionProps) {
    return (
        <>
            <div className="space-y-8">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Why Smart Business Owners Jump On This Immediately
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {finalFeatures.map((feature) => (
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
        </>
    );
}
