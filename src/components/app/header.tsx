
'use client'
import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { allTools } from "@/lib/tools";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split('#');
    if (window.location.pathname === path || (window.location.pathname === '/' && path === '')) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };


  return (
    <header className={cn("relative w-full flex items-center justify-center p-4 z-50 print-hidden", className)}>
       <div className="flex-1">
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
         <Menu setActive={setActive}>
            {allTools.map((category, index) => (
                <div key={`${category.category}-${index}`} onClick={(e) => e.stopPropagation()}>
                    <MenuItem setActive={setActive} active={active} item={category.category}>
                        <div className="grid grid-cols-2 gap-10 p-4">
                            {category.tools.map((tool) => (
                                <HoveredLink key={tool.href} href={tool.href}>{tool.title}</HoveredLink>
                            ))}
                        </div>
                    </MenuItem>
                </div>
            ))}
        </Menu>
      </div>

       <div className="flex-1 flex justify-end items-center gap-4">
         <Button asChild size="sm">
            <Link href="/offer">Lifetime Website Offer</Link>
         </Button>

         {/* Mobile Menu */}
         <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><MenuIcon /></Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {allTools.map((category) => (
                    <div key={category.category}>
                       <h3 className="font-semibold mb-2">{category.category}</h3>
                       <div className="flex flex-col gap-2 pl-2 border-l">
                         {category.tools.map((tool) => (
                           <SheetClose key={tool.href} asChild>
                              <Link href={tool.href} className="text-sm text-muted-foreground hover:text-foreground py-1">{tool.title}</Link>
                           </SheetClose>
                         ))}
                       </div>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
         </div>
      </div>

    </header>
  );
}