
'use client';

import { useState, type ComponentType } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { allTools } from '@/lib/tools';
import { Search, Star, CalculatorIcon, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon, Sparkles } from 'lucide-react';

const iconComponents: Record<string, ComponentType<{ className?: string }>> = {
  Star,
  CalculatorIcon,
  Search,
  Paintbrush,
  Image,
  MessageSquare,
  Users,
  Bot,
  FileText,
  Percent,
  Briefcase,
  CircleDollarSign,
  Scale,
  Calculator,
  HomeIcon,
  Landmark,
  TicketPercent,
  Scaling,
  QrCode,
  Lightbulb,
  PartyPopper,
  TrendingUp,
  MapPin,
  Hash,
  PenSquare,
  Crop,
  Palette,
  Layers,
  GitCompareArrows,
  Clapperboard,
  Contact,
  PlaySquare,
  CaseSensitive,
  Shield,
  Info,
  Pilcrow,
  Volume2,
  AudioLines,
  LinkIcon,
  Activity,
  ExternalLink,
  Camera,
  Code,
  Network,
  Gift,
  FileJson,
  TestTube2,
  Mail,
  Clock,
  Binary,
  MessageSquarePlus,
  BookOpen,
  IndianRupee,
  UserIcon,
  Sparkles,
};

const renderIcon = (name: string, className: string) => {
  const IconComponent = iconComponents[name] ?? iconComponents['Star'];
  return <IconComponent className={className} />;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const totalTools = allTools.reduce((acc, category) => acc + category.tools.length, 0);

  const filteredCategories = allTools
    .map(category => ({
      ...category,
      tools: category.tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.tools.length > 0);
    
  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-3 xs:px-4 sm:px-4">
        <div className="py-8 xs:py-10 sm:py-12 md:py-20 lg:py-32 text-center animate-fade-in relative">
          <div 
            className="absolute inset-0 -z-10" 
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 60%)'
            }}
          />
          <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-primary leading-tight px-2">
            Free Tools for Small Business Growth
          </h1>
          <p className="mt-2 xs:mt-3 sm:mt-3 md:mt-4 max-w-2xl mx-auto text-sm xs:text-base sm:text-base md:text-lg text-muted-foreground px-3 sm:px-2 leading-relaxed">
            A collection of powerful, simple tools to supercharge your marketing, finance, and sales efforts.
          </p>
           <p className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 text-sm xs:text-base sm:text-base md:text-lg font-semibold px-2">
              Explore our collection of {totalTools}+ powerful tools
          </p>
          <div className="mt-2 xs:mt-3 sm:mt-2 md:mt-4 max-w-xl mx-auto relative px-3 sm:px-2">
            <Search className="absolute left-6 xs:left-6 sm:left-6 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 xs:h-5 xs:w-5 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
            <Input
              type="search"
              placeholder="Search for your perfect tool..."
              className="h-10 xs:h-11 sm:h-11 md:h-12 text-sm xs:text-sm sm:text-sm md:text-lg pl-10 xs:pl-12 sm:pl-12 pr-4 bg-background/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="mt-2 xs:mt-3 sm:mt-3 md:mt-4 text-[10px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground px-3 sm:px-2">
            No registration required  &bull;  100% free  &bull;  More Tools Coming Soon
          </p>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="space-y-8 xs:space-y-10 sm:space-y-12 md:space-y-16 pb-16 xs:pb-20 sm:pb-24">
            {filteredCategories.map((category) => (
              <section key={category.category} id={slugify(category.category)} className="animate-fade-in scroll-mt-16 xs:scroll-mt-20 sm:scroll-mt-20">
                <h2 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-3 xs:mb-4 sm:mb-4 md:mb-6 flex items-center gap-1.5 xs:gap-2 sm:gap-2 md:gap-3 px-1">
                  {renderIcon(category.icon, 'mr-2 h-5 w-5')}
                  <span className="truncate">{category.category}</span>
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-3 md:gap-4">
                  {category.tools.map((tool, index) => (
                    <div key={`${tool.href}-${index}`}>
                      <ToolCard
                        href={tool.href}
                        title={tool.title}
                        description={tool.description}
                        icon={renderIcon(tool.icon, 'w-8 h-8')}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 xs:py-10 sm:py-12 md:py-16 border-2 border-dashed rounded-lg border-muted mx-2 xs:mx-3 sm:mx-2">
            <h3 className="mt-4 text-base xs:text-lg sm:text-lg font-medium">No tools found</h3>
            <p className="mt-1 text-xs xs:text-sm sm:text-sm text-muted-foreground">
              Try adjusting your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
