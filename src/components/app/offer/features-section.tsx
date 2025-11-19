'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Briefcase, CheckCheck, Moon, Rocket, Smartphone, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '@/components/ui/border-beam';

export function FeaturesSection() {
    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4' | 'item-5';
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1');

    const images = {
        'item-1': {
            image: 'https://picsum.photos/seed/item1/1207/929',
            alt: 'Person sleeping peacefully',
        },
        'item-2': {
            image: 'https://picsum.photos/seed/item2/1207/929',
            alt: 'Rocket launching',
        },
        'item-3': {
            image: 'https://picsum.photos/seed/item3/1207/929',
            alt: 'Smartphone displaying a responsive website',
        },
        'item-4': {
            image: 'https://picsum.photos/seed/item4/1207/929',
            alt: 'Lightning bolt for speed',
        },
        'item-5': {
            image: 'https://picsum.photos/seed/item5/1207/929',
            alt: 'Professional briefcase',
        },
    };
    
    const features = [
        {
            id: 'item-1',
            icon: Moon,
            title: "Works even while you're asleep",
            description: "Your website works 24/7 to attract and capture leads, so you can wake up to new business opportunities.",
        },
        {
            id: 'item-2',
            icon: Rocket,
            title: "Built using proven conversion principles",
            description: "We use design and copy that is psychologically proven to encourage visitors to take action.",
        },
        {
            id: 'item-3',
            icon: Smartphone,
            title: "Fully responsive on all devices",
            description: "Your website will look perfect and function flawlessly on desktops, tablets, and smartphones.",
        },
        {
            id: 'item-4',
            icon: Zap,
            title: "Loads fast (Google LOVES this)",
            description: "A fast-loading site provides a better user experience and can improve your search engine ranking.",
        },
        {
            id: 'item-5',
            icon: Briefcase,
            title: "Instantly boosts your brand image",
            description: "A professional, modern website establishes credibility and makes a great first impression.",
        },
    ];

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-6xl">Here’s EXACTLY What You Get</h2>
                    <p className="text-muted-foreground">This isn’t just a website… It’s a customer-acquisition system designed to convert visitors into paying clients day and night.</p>
                </div>

                <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value as ImageKey)}
                        className="w-full">
                        {features.map((feature) => (
                           <AccordionItem value={feature.id} key={feature.id}>
                             <AccordionTrigger>
                                 <div className="flex items-center gap-2 text-base">
                                     <feature.icon className="size-4 text-primary" />
                                     {feature.title}
                                 </div>
                             </AccordionTrigger>
                             <AccordionContent>{feature.description}</AccordionContent>
                         </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="bg-card relative flex overflow-hidden rounded-3xl border p-2">
                        <div className="w-15 absolute inset-0 right-0 ml-auto border-l border-border/20 bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_8px)]"></div>
                        <div className="aspect-[76/59] bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeItem}-id`}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md">
                                    <Image
                                        src={images[activeItem].image}
                                        className="size-full object-cover object-left-top"
                                        alt={images[activeItem].alt}
                                        width={1207}
                                        height={929}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <BorderBeam
                            duration={6}
                            size={200}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
