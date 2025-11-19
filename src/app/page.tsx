
'use client';

import { useState, type ComponentType } from 'react';
import { Header } from '@/components/app/header';
import { CategoryNav } from '@/components/app/category-nav';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { allTools } from '@/lib/tools';
import { Search, Star, CalculatorIcon, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon, Sparkles } from 'lucide-react';
import React from 'react';
import { HeroPill } from '@/components/ui/hero-pill';

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
      <CategoryNav />
      <main className="flex-grow">
        <section className="relative px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 pt-10 xs:pt-12 sm:pt-14 md:pt-20 lg:pt-24">
          <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background to-primary/5 px-4 xs:px-6 sm:px-8 md:px-12 py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)]">
              <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -right-16 -bottom-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                 <HeroPill 
                    href="/offer"
                    announcement="Limited Time Deal"
                    label="Get a Lifetime Website for just ₹8,300!"
                />
                <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                  Free Tools for Small Business Growth
                </h1>
                <p className="max-w-2xl text-sm xs:text-base sm:text-base md:text-lg text-muted-foreground">
                  A collection of powerful, simple tools to supercharge your marketing, finance, and sales efforts.
                </p>
                <div className="relative mt-2 w-full max-w-2xl">
                  <div className="absolute inset-0 rounded-2xl border border-primary/15 bg-background/70 backdrop-blur" />
                  <div className="relative flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)]">
                    <Search className="h-5 w-5 text-primary" />
                    <Input
                      type="search"
                      placeholder="Search for your perfect tool..."
                      className="h-10 flex-1 border-none bg-transparent p-0 text-sm xs:text-sm sm:text-base md:text-lg focus-visible:ring-0"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-[11px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground">
                  No registration required  &bull;  100% free  &bull;  More Tools Coming Soon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing between hero and featured sections */}
        <div className="h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16" />

  <section className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 pb-16 xs:pb-20 sm:pb-20 md:pb-24 lg:pb-28">
          {filteredCategories.length > 0 ? (
            <div className="space-y-10 xs:space-y-12 sm:space-y-16 md:space-y-20">
              {filteredCategories.map((category) => (
                <section
                  key={category.category}
                  id={slugify(category.category)}
                  className="group relative scroll-mt-24 xs:scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36 lg:scroll-mt-40"
                >
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      {renderIcon(category.icon, 'h-5 w-5')}
                    </span>
                    <h2 className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                      {category.category}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                    {category.tools.map((tool, index) => (
                      <ToolCard
                        key={`${tool.href}-${index}`}
                        href={tool.href}
                        title={tool.title}
                        description={tool.description}
                        icon={renderIcon(tool.icon, 'h-7 w-7')}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-dashed border-muted bg-background/80 p-8 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">No tools found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
