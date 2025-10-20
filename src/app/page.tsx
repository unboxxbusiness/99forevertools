'use client';

import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Zap, Lightbulb, MailPlus, Users, FileSpreadsheet, PenSquare, Gem, ListTree } from 'lucide-react';

const tools = [
  {
    title: 'Email Permutator',
    description: 'Generate all possible email combinations from a name and domain.',
    href: '/email-permutator',
    icon: <Zap className="h-8 w-8" />,
  },
  {
    title: 'Niche Market Suggester',
    description: 'Get AI-powered niche market suggestions based on a keyword.',
    href: '/niche-suggester',
    icon: <Lightbulb className="h-8 w-8" />,
  },
  {
    title: 'Subject Line Generator',
    description: 'Generate 10 high-converting email subject lines for any topic.',
    href: '/subject-line-generator',
    icon: <MailPlus className="h-8 w-8" />,
  },
  {
    title: 'Who to Contact Finder',
    description: 'Find the right job titles to contact at a company for your service.',
    href: '/who-to-contact',
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: 'Simple CRM .CSV Cleaner',
    description: 'Upload a messy CSV of leads, and the tool standardizes formatting.',
    href: '/csv-cleaner',
    icon: <FileSpreadsheet className="h-8 w-8" />,
  },
  {
    title: 'AI Headline Generator',
    description: 'Generate 10 catchy headlines for blog posts or landing pages.',
    href: '/ai-headline-generator',
    icon: <PenSquare className="h-8 w-8" />,
  },
  {
    title: 'Value Proposition Generator',
    description: 'Guides users through questions to generate a clear value proposition.',
    href: '/value-proposition-generator',
    icon: <Gem className="h-8 w-8" />,
  },
  {
    title: 'Blog Post Outline Creator',
    description: 'Generate a structured outline for your blog post with H2 and H3 headings.',
    href: '/blog-outline-creator',
    icon: <ListTree className="h-8 w-8" />,
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
