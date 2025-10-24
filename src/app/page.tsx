
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { allTools } from '@/lib/tools';
import { Search, Star, CalculatorIcon, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';

const iconMap: { [key: string]: React.ReactNode } = {
    Star: <Star className="mr-2 h-4 w-4" />,
    CalculatorIcon: <CalculatorIcon className="mr-2 h-4 w-4" />,
    Search: <Search className="mr-2 h-4 w-4" />,
    Paintbrush: <Paintbrush className="mr-2 h-4 w-4" />,
    Image: <Image className="mr-2 h-4 w-4" />,
    MessageSquare: <MessageSquare className="mr-2 h-4 w-4" />,
    Users: <Users className="mr-2 h-4 w-4" />,
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const activeCategory = searchParams.get('category') || 'All';
  const totalTools = allTools.reduce((acc, category) => acc + category.tools.length, 0);

  const setActiveCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  const categories = allTools.map(category => ({
      name: category.category,
      icon: iconMap[category.icon]
  }));

  const filteredTools = (
    activeCategory === 'All'
      ? allTools.flatMap(category => category.tools)
      : allTools.find(c => c.category === activeCategory)?.tools || []
  ).filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          <Button 
            variant={activeCategory === 'All' ? 'default' : 'secondary'}
            onClick={() => setActiveCategory('All')}
            className="rounded-full"
          >
            All Tools
          </Button>
          {categories.map(category => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? 'default' : 'secondary'}
              onClick={() => setActiveCategory(category.name)}
              className="rounded-full gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
            {filteredTools.map((tool, index) => (
              <div key={`${tool.href}-${index}`} className="animate-fade-in" style={{ animationDelay: `${50 * (index % 12)}ms` }}>
                <ToolCard
                  href={tool.href}
                  title={tool.title}
                  description={tool.description}
                  icon={toolIconMap[tool.icon]}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
            <h3 className="mt-4 text-lg font-medium">No tools found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

    
