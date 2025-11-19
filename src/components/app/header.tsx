
'use client';
import React from 'react';
import Link from 'next/link';
import { allTools } from '@/lib/tools';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import {
  Menu as MenuIcon,
  Activity,
  AudioLines,
  Award,
  BarChart,
  Binary,
  BookOpen,
  Bot,
  Briefcase,
  Building,
  Calculator,
  CalculatorIcon,
  Camera,
  CaseSensitive,
  Check,
  CircleDollarSign,
  Clapperboard,
  Clock,
  Cloud,
  Code,
  Compass,
  Contact,
  Cpu,
  CreditCard,
  Crop,
  Download,
  ExternalLink,
  FileJson,
  FileText,
  Flag,
  Gem,
  Gift,
  GitCompareArrows,
  GitBranch,
  Globe,
  Hash,
  Heart,
  Home as HomeIcon,
  Image,
  IndianRupee,
  Info,
  Instagram,
  Keyboard,
  Landmark,
  Layers,
  LifeBuoy,
  Lightbulb,
  Link as LinkIcon,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  MousePointer,
  Network,
  Package,
  Palette,
  PartyPopper,
  PenSquare,
  Percent,
  Phone,
  PieChart,
  Pilcrow,
  PlaySquare,
  PlusCircle,
  Pointer,
  Puzzle,
  QrCode,
  Quote,
  Rocket,
  Scaling,
  Scale,
  Search,
  Server,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Speaker,
  Star,
  Sun,
  Target,
  Terminal,
  TestTube2,
  ThumbsUp,
  TicketPercent,
  Train,
  Trash2,
  TrendingUp,
  TreePine,
  Truck,
  Umbrella,
  User as UserIcon,
  Users,
  Volume2,
  Wallet,
  Watch,
  Wrench,
  Wind,
  Zap,
  Paintbrush,
  Shield,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Logo } from '../logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import { type ComponentType } from 'react';

type Tool = {
  href: string;
  title: string;
  description: string;
  icon: string;
};

type ToolCategory = {
  category: string;
  icon: string;
  tools: Tool[];
};

// Icon mapping
const iconMap: Record<string, ComponentType> = {
  Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, UserIcon, Sparkles, Zap
};

const calculatorTools = allTools.find(c => c.category === 'Calculators')?.tools || [];
const contentSeoTools = allTools.find(c => c.category === 'Content & SEO')?.tools || [];
const marketingUtilitiesTools = allTools.find(c => c.category === 'Marketing & Utilities')?.tools || [];
const whatsappTools = allTools.find(c => c.category === 'WhatsApp Tools')?.tools || [];
const brandingDesignTools = allTools.find(c => c.category === 'Branding & Design')?.tools || [];
const imageTools = allTools.find(c => c.category === 'Image Tools')?.tools || [];


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("relative w-full flex items-center justify-between p-4 z-50 print-hidden", className)}>
      <div className="flex-1 lg:flex-none">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#featured" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Featured
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[250px] gap-3 p-4">
                  {calculatorTools.map((tool) => (
                    <ListItem key={tool.title} title={tool.title} href={tool.href}>
                      {tool.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <NavigationMenuTrigger>Content & SEO</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[250px] gap-3 p-4">
                  {contentSeoTools.map((tool) => (
                    <ListItem key={tool.title} title={tool.title} href={tool.href}>
                      {tool.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketing</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <div className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3">Utilities</h3>
                      <ul>
                        {marketingUtilitiesTools.map((tool) => (
                          <ListItem key={tool.title} title={tool.title} href={tool.href}>
                            {tool.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3">WhatsApp</h3>
                       <ul>
                        {whatsappTools.map((tool) => (
                          <ListItem key={tool.title} title={tool.title} href={tool.href}>
                            {tool.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                 </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Design</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <div className="grid w-[500px] grid-cols-2 gap-3 p-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3">Branding</h3>
                      <ul>
                        {brandingDesignTools.map((tool) => (
                          <ListItem key={tool.title} title={tool.title} href={tool.href}>
                            {tool.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3">Image Tools</h3>
                       <ul>
                        {imageTools.map((tool) => (
                          <ListItem key={tool.title} title={tool.title} href={tool.href}>
                            {tool.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                 </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
