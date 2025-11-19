
'use client';

import { Layers, MoveRight, ChevronDown, Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { allTools } from '@/lib/tools';
import React from 'react';

const iconMap: { [key: string]: React.ReactNode } = {
    Star: <Star className="mr-2 h-4 w-4" />,
    CalculatorIcon: <CalculatorIcon className="mr-2 h-4 w-4" />,
    Search: <Search className="mr-2 h-4 w-4" />,
    Paintbrush: <Paintbrush className="mr-2 h-4 w-4" />,
    Image: <Image className="mr-2 h-4 w-4" />,
    MessageSquare: <MessageSquare className="mr-2 h-4 w-4" />,
    Users: <Users className="mr-2 h-4 w-4" />,
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full print-hidden">
        <div className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-2 text-center text-sm font-medium">
                <Link href="/offer" className="inline-flex items-center gap-2 group">
                    <span>
                        Stop Paying Monthly Fees! Get a Lifetime Website for <del>₹15,000</del> just <strong>₹8,300</strong> ($99 USD).
                    </span>
                    <span className="font-bold underline underline-offset-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Claim Offer
                        <MoveRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>
        </div>
        <div className="border-b border-border/50 bg-background/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3">
                <Layers className="h-7 w-7 text-primary" />
                <h1 className="text-2xl font-bold tracking-tighter text-foreground">
                    99forevertools
                </h1>
                </Link>
                <nav>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                            Categories <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {allTools.map((category) => (
                                <DropdownMenuItem key={category.category} asChild>
                                    <Link href={`/#${slugify(category.category)}`}>
                                        {iconMap[category.icon]}
                                        {category.category}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        </div>
    </header>
  );
}
