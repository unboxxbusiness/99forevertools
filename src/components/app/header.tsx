
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
        {/* Top Banner with Offer */}
        <div className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2 md:py-3 text-center">
              <Link href="#lifetime-offer" className="inline-flex items-center gap-1.5 sm:gap-2 group text-xs sm:text-xs md:text-sm flex-wrap justify-center">
                    <span className="leading-tight">Stop Paying Monthly Fees! Get a Lifetime Website for ₹10,000.</span>
                    <span className="font-bold underline underline-offset-2 flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
                        Claim Offer
                        <MoveRight className="h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 flex-shrink-0" />
                    </span>
                </Link>
            </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-border/50 bg-background/90 backdrop-blur-sm">
            <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 flex items-center justify-between gap-2 sm:gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0 min-w-0">
                <Layers className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
                <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tighter text-foreground hidden sm:block truncate">
                    99forevertools
                </h1>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold tracking-tighter text-foreground sm:hidden truncate">
                    99tools
                </h1>
                </Link>

                {/* Navigation */}
                <nav className="ml-auto flex-shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-xs sm:text-xs md:text-sm h-8 sm:h-9 md:h-10 px-2 sm:px-3 md:px-4">
                            <span className="hidden xs:inline">Categories</span>
                            <span className="xs:hidden">Menu</span>
                            <ChevronDown className="ml-1 sm:ml-1 md:ml-2 h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto w-56 sm:w-64">
                            {allTools.map((category) => (
                                <DropdownMenuItem key={category.category} asChild>
                                    <Link href={`/#${slugify(category.category)}`} className="text-xs sm:text-xs md:text-sm py-2.5">
                                        {iconMap[category.icon]}
                                        <span className="truncate">{category.category}</span>
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
