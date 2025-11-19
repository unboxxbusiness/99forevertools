
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { allTools } from '@/lib/tools';
import { Search, Star, CalculatorIcon, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon } from 'lucide-react';
import React from 'react';
import { HeroPill } from '@/components/ui/hero-pill';

const iconMap: { [key: string]: React.ReactNode } = {
    Star: <Star className="mr-2 h-5 w-5" />,
    CalculatorIcon: <CalculatorIcon className="mr-2 h-5 w-5" />,
    Search: <Search className="mr-2 h-5 w-5" />,
    Paintbrush: <Paintbrush className="mr-2 h-5 w-5" />,
    Image: <Image className="mr-2 h-5 w-5" />,
    MessageSquare: <MessageSquare className="mr-2 h-5 w-5" />,
    Users: <Users className="mr-2 h-5 w-5" />,
    Bot: <Bot className="mr-2 h-4 w-4" />,
    FileText: <FileText className="mr-2 h-4 w-4" />,
    Percent: <Percent className="mr-2 h-4 w-4" />,
    Briefcase: <Briefcase className="mr-2 h-4 w-4" />,
    CircleDollarSign: <CircleDollarSign className="mr-2 h-4 w-4" />,
    Scale: <Scale className="mr-2 h-4 w-4" />,
    Calculator: <Calculator className="mr-2 h-4 w-4" />,
    HomeIcon: <HomeIcon className="mr-2 h-4 w-4" />,
    Landmark: <Landmark className="mr-2 h-4 w-4" />,
    TicketPercent: <TicketPercent className="mr-2 h-4 w-4" />,
    Scaling: <Scaling className="mr-2 h-4 w-4" />,
    QrCode: <QrCode className="mr-2 h-4 w-4" />,
    Lightbulb: <Lightbulb className="mr-2 h-4 w-4" />,
    PartyPopper: <PartyPopper className="mr-2 h-4 w-4" />,
    TrendingUp: <TrendingUp className="mr-2 h-4 w-4" />,
    MapPin: <MapPin className="mr-2 h-4 w-4" />,
    Hash: <Hash className="mr-2 h-4 w-4" />,
    PenSquare: <PenSquare className="mr-2 h-4 w-4" />,
    Crop: <Crop className="mr-2 h-4 w-4" />,
    Palette: <Palette className="mr-2 h-4 w-4" />,
    Layers: <Layers className="mr-2 h-4 w-4" />,
    GitCompareArrows: <GitCompareArrows className="mr-2 h-4 w-4" />,
    Clapperboard: <Clapperboard className="mr-2 h-4 w-4" />,
    Contact: <Contact className="mr-2 h-4 w-4" />,
    PlaySquare: <PlaySquare className="mr-2 h-4 w-4" />,
    CaseSensitive: <CaseSensitive className="mr-2 h-4 w-4" />,
    Shield: <Shield className="mr-2 h-4 w-4" />,
    Info: <Info className="mr-2 h-4 w-4" />,
    Pilcrow: <Pilcrow className="mr-2 h-4 w-4" />,
    Volume2: <Volume2 className="mr-2 h-4 w-4" />,
    AudioLines: <AudioLines className="mr-2 h-4 w-4" />,
    LinkIcon: <LinkIcon className="mr-2 h-4 w-4" />,
    Activity: <Activity className="mr-2 h-4 w-4" />,
    ExternalLink: <ExternalLink className="mr-2 h-4 w-4" />,
    Camera: <Camera className="mr-2 h-4 w-4" />,
    Code: <Code className="mr-2 h-4 w-4" />,
    Network: <Network className="mr-2 h-4 w-4" />,
    Gift: <Gift className="mr-2 h-4 w-4" />,
    FileJson: <FileJson className="mr-2 h-4 w-4" />,
    TestTube2: <TestTube2 className="mr-2 h-4 w-4" />,
    Mail: <Mail className="mr-2 h-4 w-4" />,
    Clock: <Clock className="mr-2 h-4 w-4" />,
    Binary: <Binary className="mr-2 h-4 w-4" />,
    MessageSquarePlus: <MessageSquarePlus className="mr-2 h-4 w-4" />,
    BookOpen: <BookOpen className="mr-2 h-4 w-4" />,
    IndianRupee: <IndianRupee className="mr-2 h-4 w-4" />,
    UserIcon: <UserIcon className="mr-2 h-4 w-4" />,
};

const toolIconMap: { [key: string]: React.ReactNode } = Object.entries(iconMap).reduce((acc, [key, value]) => {
    acc[key] = React.cloneElement(value as React.ReactElement, { className: "w-8 h-8" });
    return acc;
}, {} as { [key: string]: React.ReactNode });

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
      <main className="flex-grow container mx-auto px-4">
        <div className="py-20 md:py-32 text-center animate-fade-in relative">
          <div 
            className="absolute inset-0 -z-10" 
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 60%)'
            }}
          />
           <div className="flex justify-center mb-8">
            <HeroPill 
                href="/offer"
                announcement="Limited Time Deal"
                label="Get a Lifetime Website for just ₹8,300!"
            />
        </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Free Tools for Small Business Growth
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of powerful, simple tools to supercharge your marketing, finance, and sales efforts.
          </p>
           <p className="mt-8 text-lg font-semibold">
              Explore our collection of {totalTools}+ powerful tools
          </p>
          <div className="mt-2 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for your perfect tool..."
              className="h-12 text-lg pl-12 bg-background/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No registration required  &bull;  100% free  &bull;  More Tools Coming Soon
          </p>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="space-y-16 pb-24">
            {filteredCategories.map((category) => (
              <section key={category.category} id={slugify(category.category)} className="animate-fade-in scroll-mt-20">
                <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                  {iconMap[category.icon]}
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.tools.map((tool, index) => (
                    <div key={`${tool.href}-${index}`}>
                      <ToolCard
                        href={tool.href}
                        title={tool.title}
                        description={tool.description}
                        icon={toolIconMap[tool.icon]}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
            <h3 className="mt-4 text-lg font-medium">No tools found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
