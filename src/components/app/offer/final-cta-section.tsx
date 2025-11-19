"use client";
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Search, Smartphone, Sparkles, Trophy, Zap } from 'lucide-react';
import React from 'react';
import { CountdownTimer } from './countdown-timer';

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};


type FinalCTASectionProps = {
  whatsAppUrl: string;
};

export function FinalCTASection({ whatsAppUrl }: FinalCTASectionProps) {
    const features = [
        { title: "Lifetime Hosting", description: "Never pay again — ever.", icon: <Zap /> },
        { title: "Custom Domain Setup", description: "Included with your package.", icon: <CheckCircle /> },
        { title: "Mobile-Responsive", description: "Conversion-optimized for all devices.", icon: <Smartphone /> },
        { title: "SEO-Ready Structure", description: "Built to rank fast on Google.", icon: <Search /> },
        { title: "Up to 5 Premium Pages", description: "Professionally designed pages.", icon: <Trophy /> },
        { title: "Lead Capture Forms", description: "Installed and ready to collect leads.", icon: <CheckCircle /> },
        { title: "Social Media Links", description: "All your social profiles added.", icon: <Sparkles /> },
        { title: "No Monthly Fees", description: "Permanent access with a one-time payment.", icon: <Clock /> },
    ];
    
    return (
        <>
            <div className="text-center">
                <h2 className="text-fluid-h2 font-bold tracking-tight text-white">
                    Why Smart Business Owners Jump On This Immediately
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>

            <div className="text-center border-t border-border pt-16">
                 <p className="text-yellow-400 font-bold text-fluid-lg flex items-center justify-center gap-2"><Clock /> IMPORTANT: This Price Will Increase Soon</p>
                 <CountdownTimer />
                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-fluid-base">This is a limited-time launch offer. Once the timer hits zero or the slots are gone, the one-time pricing disappears — forever. Most website owners pay monthly… for years. You pay once and own it for life.</p>
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
