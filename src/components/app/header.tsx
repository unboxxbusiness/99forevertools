
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

type NavItem = {
  id: number;
  label: string;
  href?: string;
  subMenus?: {
    title: string;
    items: Tool[];
  }[];
};


// Icon mapping
const iconMap: Record<string, ComponentType> = {
  Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, UserIcon, Sparkles, Zap
};

const calculatorsGroup = allTools.filter(c => ['Calculators'].includes(c.category));
const contentSeoGroup = allTools.filter(c => ['Content & SEO'].includes(c.category));
const marketingSalesGroup = allTools.filter(c => ['Marketing & Utilities', 'WhatsApp Tools'].includes(c.category));
const designBrandingGroup = allTools.filter(c => ['Branding & Design', 'Image Tools'].includes(c.category));

const desktopNavItems: NavItem[] = [
    {
        id: 1,
        label: 'Calculators',
        subMenus: calculatorsGroup.map(category => ({
            title: category.category,
            items: category.tools,
        })),
    },
    {
        id: 2,
        label: 'Content & SEO',
        subMenus: contentSeoGroup.map(category => ({
            title: category.category,
            items: category.tools,
        })),
    },
    {
        id: 3,
        label: 'Marketing & Sales',
        subMenus: marketingSalesGroup.map(category => ({
            title: category.category,
            items: category.tools,
        })),
    },
    {
        id: 4,
        label: 'Design & Branding',
        subMenus: designBrandingGroup.map(category => ({
            title: category.category,
            items: category.tools,
        })),
    },
];

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
            {desktopNavItems.map(navItem => (
              <NavigationMenuItem key={navItem.id}>
                {navItem.subMenus ? (
                  <>
                    <NavigationMenuTrigger>{navItem.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className={cn("grid gap-3 p-4", navItem.subMenus.length > 1 ? "w-[600px] grid-cols-2" : "w-[300px] grid-cols-1")}>
                        {navItem.subMenus.map((subMenu) => (
                          <div key={subMenu.title}>
                            <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3">{subMenu.title}</h3>
                            <ul className="flex flex-col gap-1">
                              {subMenu.items.map((item) => {
                                const Icon = iconMap[item.icon] || Zap;
                                return (
                                  <ListItem key={item.title} href={item.href} title={item.title}>
                                    <div className="flex items-start gap-2">
                                      <Icon className="h-5 w-5 text-primary/80" />
                                      <span className="text-xs">{item.description}</span>
                                    </div>
                                  </ListItem>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                   <Link href={navItem.href || '/'} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {navItem.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
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
