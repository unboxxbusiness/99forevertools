'use client';

import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Zap, FileSpreadsheet, Activity, Tag, SearchCheck, Glasses, FileJson, Bot, ClipboardType, Link as LinkIcon, MailCheck, QrCode, Clock } from 'lucide-react';

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
  {
    title: 'Headline Analyzer',
    description: 'Scores headlines on length, sentiment, and power words.',
    href: '/headline-analyzer',
    icon: <Activity className="h-8 w-8" />,
  },
  {
    title: 'Meta Tag Generator',
    description: 'Create optimized meta titles and descriptions for Google search.',
    href: '/meta-tag-generator',
    icon: <Tag className="h-8 w-8" />,
  },
  {
    title: 'Keyword Density Checker',
    description: 'Check the frequency of specific keywords in your text to avoid over-optimization.',
    href: '/keyword-density-checker',
    icon: <SearchCheck className="h-8 w-8" />,
  },
  {
    title: 'Readability Score Calculator',
    description: 'Analyze text and score it based on Flesch-Kincaid Reading Ease.',
    href: '/readability-checker',
    icon: <Glasses className="h-8 w-8" />,
  },
  {
    title: 'Schema Markup Generator',
    description: 'Generate structured data for local businesses, articles, or FAQs.',
    href: '/schema-generator',
    icon: <FileJson className="h-8 w-8" />,
  },
  {
    title: 'Robots.txt Generator',
    description: 'Create a properly formatted robots.txt file to guide search engine crawlers.',
    href: '/robots-txt-generator',
    icon: <Bot className="h-8 w-8" />,
  },
  {
    title: 'Lorem Ipsum Generator',
    description: 'Creates customizable placeholder text for design mockups.',
    href: '/lorem-ipsum-generator',
    icon: <ClipboardType className="h-8 w-8" />,
  },
  {
    title: 'UTM Link Builder',
    description: 'A simple form to add UTM parameters to URLs for precise campaign tracking.',
    href: '/utm-link-builder',
    icon: <LinkIcon className="h-8 w-8" />,
  },
  {
    title: 'Email Subject Line Tester',
    description: 'Analyzes subject lines for potential spam triggers, length, and emotional impact.',
    href: '/email-subject-line-tester',
    icon: <MailCheck className="h-8 w-8" />,
  },
  {
    title: 'QR Code Generator',
    description: 'Create a customizable QR code that links to a website, Wi-Fi, or contact card.',
    href: '/qr-code-generator',
    icon: <QrCode className="h-8 w-8" />,
  },
   {
    title: 'Time Zone Converter',
    description: 'A visual tool to compare time zones and schedule international meetings easily.',
    href: '/time-zone-converter',
    icon: <Clock className="h-8 w-8" />,
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
