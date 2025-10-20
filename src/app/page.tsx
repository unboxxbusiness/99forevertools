'use client';

import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Zap, FileSpreadsheet } from 'lucide-react';

const tools = [
  {
    title: 'Email Permutator',
    description: 'Generate all possible email combinations from a name and domain.',
    href: '/email-permutator',
    icon: <Zap className="h-8 w-8" />,
  },
  {
    title: 'Simple CRM .CSV Cleaner',
    description: 'Upload a messy CSV of leads, and the tool standardizes formatting.',
    href: '/csv-cleaner',
    icon: <FileSpreadsheet className="h-8 w-8" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Marketing Super-Tools
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of powerful, simple tools to supercharge your marketing efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${150 * (index + 1)}ms` }}>
              <ToolCard
                href={tool.href}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
              />
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground">
        More tools coming soon...
      </footer>
    </div>
  );
}
