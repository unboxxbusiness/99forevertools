"use client";
import Image from 'next/image';
import { Briefcase, Moon, Rocket, Smartphone, Zap } from 'lucide-react';

const listFeatures = [
    { text: "Works even while you're asleep", icon: <Moon />},
    { text: "Built using proven conversion principles", icon: <Rocket />},
    { text: "Fully responsive on all devices", icon: <Smartphone />},
    { text: "Loads fast (Google LOVES this)", icon: <Zap />},
    { text: "Instantly boosts your brand image", icon: <Briefcase />},
]

export function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
             <div className="mx-auto max-w-6xl px-6">
                 <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                     <div className="lg:col-span-2">
                         <div className="md:pr-6 lg:pr-0">
                             <h2 className="text-4xl font-semibold lg:text-5xl">Here’s EXACTLY What You Get</h2>
                             <p className="mt-6 text-muted-foreground">This isn’t just a website… It’s a customer-acquisition system designed to convert visitors into paying clients day and night.</p>
                         </div>
                         <ul className="mt-8 divide-y border-y">
                            {listFeatures.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 py-3">
                                    <div className="text-primary">{feature.icon}</div>
                                    {feature.text}
                                </li>
                            ))}
                         </ul>
                     </div>
                     <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                         <div className="bg-linear-to-b aspect-w-4 aspect-h-3 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                             <Image src="https://res.cloudinary.com/dhrigocvd/image/upload/v1763532779/24_7_lead_generation_g2ddnu.webp" className="rounded-[15px] shadow" alt="24/7 lead generation illustration" layout="fill" objectFit="cover" />
                         </div>
                     </div>
                 </div>
             </div>
         </section>
    );
}
