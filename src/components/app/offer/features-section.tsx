'use client';
import { Briefcase, Moon, Rocket, Smartphone, Zap } from 'lucide-react';
import Image from 'next/image';

export function FeaturesSection() {
    
    const features = [
        {
            icon: <Moon className="size-5" />,
            title: "Works even while you're asleep",
        },
        {
            icon: <Rocket className="size-5" />,
            title: "Built using proven conversion principles",
        },
        {
            icon: <Smartphone className="size-5" />,
            title: "Fully responsive on all devices",
        },
        {
            icon: <Zap className="size-5" />,
            title: "Loads fast (Google LOVES this)",
        },
        {
            icon: <Briefcase className="size-5" />,
            title: "Instantly boosts your brand image",
        },
    ];

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl">⭐ ITEM #1: A Professional Lead-Generation Website</h2>
                            <p className="mt-6 text-muted-foreground">This isn’t just a website… It’s a customer-acquisition system designed to convert visitors into paying clients day and night.</p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                            {features.map((feature, index) => (
                                <li key={index}>
                                    {feature.icon}
                                    {feature.title}
                                </li>
                            ))}
                        </ul>
                         <div className="pt-6 text-xl font-semibold text-primary">
                            Real Value: ₹15,000
                        </div>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                             <Image src="https://res.cloudinary.com/dhrigocvd/image/upload/v1763532779/24_7_lead_generation_g2ddnu.webp" className="rounded-[15px] shadow" alt="Lead Generation Website" width={1207} height={929} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
