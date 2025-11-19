
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

// Icon mapping
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, UserIcon, Sparkles, Zap, Globe
};

const renderIcon = (name: string, className?: string) => {
    const IconComponent = iconMap[name] || Zap;
    return <IconComponent className={className} />;
};

const businessAndMarketingTools = allTools.filter(c => ['Financial Calculators', 'Content & Writing', 'SEO & Marketing'].includes(c.category));
const designAndMediaTools = allTools.filter(c => ['Branding & Design', 'Image & Video Tools'].includes(c.category));
const webAndUtilitiesTools = allTools.filter(c => ['Web & Utilities'].includes(c.category));


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
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
      </a>
    </NavigationMenuLink>
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
              <NavigationMenuTrigger>Business & Marketing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-3 gap-3 p-4">
                  {businessAndMarketingTools.map((category) => (
                     <div key={category.category}>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3 flex items-center gap-2">
                           {renderIcon(category.icon, 'h-4 w-4')}
                          <span>{category.category}</span>
                        </h3>
                        <ul className="flex flex-col gap-1">
                          {category.tools.map((tool) => (
                             <Link key={tool.href} href={tool.href} legacyBehavior passHref>
                              <ListItem title={tool.title} />
                             </Link>
                          ))}
                        </ul>
                     </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Design & Media</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <div className="grid w-[400px] grid-cols-2 gap-3 p-4">
                  {designAndMediaTools.map((category) => (
                     <div key={category.category}>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3 flex items-center gap-2">
                          {renderIcon(category.icon, 'h-4 w-4')}
                          <span>{category.category}</span>
                        </h3>
                        <ul className="flex flex-col gap-1">
                          {category.tools.map((tool) => (
                             <Link key={tool.href} href={tool.href} legacyBehavior passHref>
                              <ListItem title={tool.title} />
                             </Link>
                          ))}
                        </ul>
                     </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <NavigationMenuTrigger>Web & Utilities</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <div className="grid w-[400px] grid-cols-2 gap-3 p-4">
                  {webAndUtilitiesTools.map((category) => (
                     <div key={category.category}>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground px-3 flex items-center gap-2">
                          {renderIcon(category.icon, 'h-4 w-4')}
                          <span>{category.category}</span>
                        </h3>
                        <ul className="flex flex-col gap-1">
                          {category.tools.map((tool) => (
                             <Link key={tool.href} href={tool.href} legacyBehavior passHref>
                              <ListItem title={tool.title} />
                             </Link>
                          ))}
                        </ul>
                     </div>
                  ))}
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
                    <AccordionTrigger className="font-semibold text-sm">
                        <div className="flex items-center gap-3">
                            {renderIcon(category.icon, 'h-5 w-5 text-primary')}
                            <span>{category.category}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-4">
                        {category.tools.map((tool) => (
                          <SheetClose key={tool.href} asChild>
                            <Link href={tool.href} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground py-2.5 px-4 rounded-md hover:bg-muted">
                                {renderIcon(tool.icon, 'h-5 w-5')}
                                <span>{tool.title}</span>
                            </Link>
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
