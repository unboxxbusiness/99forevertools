
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/app/header';
import { RobotsTxtGeneratorForm, type RobotsConfig } from '@/components/app/robots-txt-generator-form';
import { RobotsTxtGeneratorResults } from '@/components/app/robots-txt-generator-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RobotsTxtGeneratorPage() {
  const [config, setConfig] = useState<RobotsConfig>({
    defaultPolicy: 'allowAll',
    sitemap: '',
    customRules: [{ userAgent: '*', rule: 'disallow', path: '' }],
  });
  const [robotsTxt, setRobotsTxt] = useState('');

  useEffect(() => {
    let content = '';
    const rulesByAgent: { [key: string]: string[] } = {};

    // Default policy
    if (config.defaultPolicy === 'disallowAll') {
      content += 'User-agent: *\nDisallow: /\n\n';
    } else {
      content += 'User-agent: *\nAllow: /\n\n';
    }

    // Custom rules
    config.customRules.forEach(r => {
      if (r.userAgent && r.path) {
        if (!rulesByAgent[r.userAgent]) {
          rulesByAgent[r.userAgent] = [];
        }
        const formattedRule = r.rule === 'allow' ? 'Allow' : 'Disallow';
        rulesByAgent[r.userAgent].push(`${formattedRule}: ${r.path}`);
      }
    });

    for (const agent in rulesByAgent) {
      content += `User-agent: ${agent}\n`;
      content += rulesByAgent[agent].join('\n');
      content += '\n\n';
    }

    // Sitemap
    if (config.sitemap) {
      content += `Sitemap: ${config.sitemap}\n`;
    }

    setRobotsTxt(content.trim());
  }, [config]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RobotsTxtGeneratorForm config={config} setConfig={setConfig} />
          <RobotsTxtGeneratorResults content={robotsTxt} />
        </div>
      </main>
    </div>
  );
}
