
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { allTools } from '@/lib/tools';
import { Search, Star, CalculatorIcon, Paintbrush, Image, MessageSquare, Users } from 'lucide-react';
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

    