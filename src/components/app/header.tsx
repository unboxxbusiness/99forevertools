
'use client'
import React from "react";
import Link from "next/link";
import { allTools } from "@/lib/tools";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { Menu as MenuIcon, Activity, AudioLines, Award, BarChart, Binary, BookOpen, Bot, Briefcase, Building, Calculator, CalculatorIcon, Camera, CaseSensitive, Check, CircleDollarSign, Clapperboard, Clock, Cloud, Code, Compass, Contact, Cpu, CreditCard, Crop, Download, ExternalLink, FileJson, FileText, Flag, Gem, Gift, GitCompareArrows, GitBranch, Globe, Hash, Heart, Home as HomeIcon, Image, IndianRupee, Info, Instagram, Keyboard, Layers, LifeBuoy, Lightbulb, Link as LinkIcon, Linkedin, Lock, Mail, MapPin, Menu, MessageSquare, MessageSquarePlus, MousePointer, Package, Palette, PartyPopper, PenSquare, Percent, Phone, PieChart, Pilcrow, PlaySquare, PlusCircle, Pointer, Puzzle, QrCode, Quote, Rocket, Scaling, Scale, Search, Server, Settings, Share2, Shield, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Speaker, Star, Sun, Target, Terminal, TestTube2, ThumbsUp, TicketPercent, Train, Trash2, TrendingUp, TreePine, Truck, Umbrella, User as UserIcon, Volume2, Wallet, Watch, Wrench, Wind, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Logo } from "../logo";
import { DropdownNavigation, type NavItem } from "../ui/dropdown-navigation";
import { type ComponentType } from "react";

// Icon mapping
const iconMap: Record<string, ComponentType> = {
  Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, UserIcon, Sparkles, Zap
};


const desktopNavItems: NavItem[] = [
  {
    id: 1,
    label: "Business & Marketing",
    subMenus: allTools
      .filter(c => ['Calculators', 'Content & SEO', 'Marketing & Utilities', 'WhatsApp Tools'].includes(c.category))
      .map(category => ({
        title: category.category,
        items: category.tools.map(tool => ({
          label: tool.title,
          description: tool.description,
          href: tool.href,
          icon: iconMap[tool.icon] || Zap
        }))
      }))
  },
  {
    id: 2,
    label: "Branding & Design",
    subMenus: allTools
      .filter(c => ['Branding & Design', 'Image Tools'].includes(c.category))
      .map(category => ({
        title: category.category,
        items: category.tools.map(tool => ({
          label: tool.title,
          description: tool.description,
          href: tool.href,
          icon: iconMap[tool.icon] || Zap
        }))
      }))
  },
];


export function Header({ className }: { className?: string }) {
  
  return (
    <header className={`relative w-full flex items-center justify-center p-4 z-50 print-hidden ${className}`}>
       <div className="flex-1">
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
         <DropdownNavigation navItems={desktopNavItems} />
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
