
'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { allTools } from "@/lib/tools";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { Menu as MenuIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Logo } from "../logo";
import { MenuItem, Menu, ProductItem, HoveredLink } from "../ui/navbar-menu";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const businessTools = allTools.filter(category => 
    ['Calculators', 'Content & SEO', 'Marketing & Utilities', 'WhatsApp Tools'].includes(category.category)
  );

  const designTools = allTools.filter(category => 
    ['Branding & Design', 'Image Tools'].includes(category.category)
  );
  
  const featuredTools = allTools.find(category => category.category === 'Featured');

  return (
    <header className={`relative w-full flex items-center justify-center p-4 z-50 print-hidden ${className}`}>
       <div className="flex-1">
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
         <Menu setActive={setActive}>
            {featuredTools && (
                 <MenuItem setActive={setActive} active={active} item="Featured">
                    <div className="flex flex-col space-y-4 text-sm">
                      {featuredTools.tools.map(tool => (
                          <HoveredLink key={tool.href} href={tool.href}>{tool.title}</HoveredLink>
                      ))}
                    </div>
                 </MenuItem>
            )}

            <MenuItem setActive={setActive} active={active} item="Business & Marketing">
              <div className="grid grid-cols-2 gap-10 p-4">
                {businessTools.map(category => (
                  <div key={category.category} className="flex flex-col space-y-2">
                    <h3 className="font-bold text-foreground">{category.category}</h3>
                    {category.tools.map(tool => (
                      <HoveredLink key={tool.href} href={tool.href}>{tool.title}</HoveredLink>
                    ))}
                  </div>
                ))}
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Branding & Design">
               <div className="grid grid-cols-2 gap-10 p-4">
                {designTools.map(category => (
                  <div key={category.category} className="flex flex-col space-y-2">
                    <h3 className="font-bold text-foreground">{category.category}</h3>
                    {category.tools.map(tool => (
                      <HoveredLink key={tool.href} href={tool.href}>{tool.title}</HoveredLink>
                    ))}
                  </div>
                ))}
              </div>
            </MenuItem>
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
                <Accordion type="single" collapsible className="w-full mt-8">
                  {allTools.map((category) => (
                    <AccordionItem value={category.category} key={category.category}>
                      <AccordionTrigger className="font-semibold text-sm">{category.category}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                         {category.tools.map((tool) => (
                           <SheetClose key={tool.href} asChild>
                              <Link href={tool.href} className="text-sm text-muted-foreground hover:text-foreground py-1.5">{tool.title}</Link>
                           </SheetClose>
                         ))}
                       </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </SheetContent>
            </Sheet>
         </div>
      </div>

    </header>
  );
}
