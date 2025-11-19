
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

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-foreground hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-background backdrop-blur-sm rounded-2xl overflow-hidden border border-border/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className={`relative rounded-full border border-border/20 bg-background/80 shadow-input flex justify-center space-x-4 px-8 py-6 ${className}`}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-foreground">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-muted-foreground hover:text-foreground"
    >
      {children}
    </Link>
  );
};

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className={`relative w-full flex items-center justify-center p-4 z-50 print-hidden ${className}`}>
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
                <Accordion type="single" collapsible className="w-full mt-8">
                  {allTools.map((category) => (
                    <AccordionItem value={category.category} key={category.category}>
                      <AccordionTrigger className="font-semibold">{category.category}</AccordionTrigger>
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
