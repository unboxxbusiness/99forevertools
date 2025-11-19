
'use client';
import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Lightbulb, Briefcase, Copy, Check, Bot } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

type CustomRule = {
  userAgent: string;
  rule: 'allow' | 'disallow';
  path: string;
};

export type RobotsConfig = {
  defaultPolicy: 'allowAll' | 'disallowAll';
  sitemap: string;
  customRules: CustomRule[];
};

function RobotsTxtGeneratorForm({ config, setConfig }: { config: RobotsConfig; setConfig: (config: RobotsConfig) => void; }) {
  const handleDefaultPolicyChange = (value: 'allowAll' | 'disallowAll') => {
    setConfig({ ...config, defaultPolicy: value });
  };
  
  const handleSitemapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, sitemap: e.target.value });
  };

  const handleRuleChange = (index: number, field: keyof CustomRule, value: string) => {
    const newRules = [...config.customRules];
    newRules[index] = { ...newRules[index], [field]: value };
    setConfig({ ...config, customRules: newRules });
  };
  
  const addRule = () => {
    setConfig({ 
        ...config, 
        customRules: [...config.customRules, { userAgent: '*', rule: 'disallow', path: '' }] 
    });
  };
  
  const removeRule = (index: number) => {
    const newRules = config.customRules.filter((_, i) => i !== index);
    setConfig({ ...config, customRules: newRules });
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Robots.txt Generator</CardTitle>
          <CardDescription>
            Configure rules for search engine crawlers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
              <Label>Default Policy for All Crawlers (*)</Label>
              <Select onValueChange={handleDefaultPolicyChange} value={config.defaultPolicy}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select default policy" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="allowAll">Allow All</SelectItem>
                      <SelectItem value="disallowAll">Disallow All</SelectItem>
                  </SelectContent>
              </Select>
              <p className='text-xs text-muted-foreground'>This sets the base rule for all user-agents not specifically mentioned.</p>
          </div>
          <div className="space-y-2">
              <Label htmlFor="sitemap">Sitemap URL (Optional)</Label>
              <Input id="sitemap" placeholder="https://www.example.com/sitemap.xml" value={config.sitemap} onChange={handleSitemapChange} />
          </div>
          <div className="space-y-4">
              <Label>Custom Rules</Label>
              {config.customRules.map((r, index) => (
                  <div key={index} className="flex gap-2 items-end p-3 border rounded-lg">
                      <div className='grid gap-1.5 flex-grow'>
                          <Label htmlFor={`ua-${index}`} className='text-xs'>User-Agent</Label>
                          <Input id={`ua-${index}`} value={r.userAgent} onChange={e => handleRuleChange(index, 'userAgent', e.target.value)} placeholder="e.g. Googlebot" />
                      </div>
                       <div className='grid gap-1.5'>
                          <Label htmlFor={`rule-${index}`} className='text-xs'>Rule</Label>
                          <Select onValueChange={(v: 'allow' | 'disallow') => handleRuleChange(index, 'rule', v)} value={r.rule}>
                              <SelectTrigger id={`rule-${index}`} className="w-[120px]">
                                  <SelectValue/>
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="disallow">Disallow</SelectItem>
                                  <SelectItem value="allow">Allow</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                       <div className='grid gap-1.5 flex-grow'>
                          <Label htmlFor={`path-${index}`} className='text-xs'>Path</Label>
                          <Input id={`path-${index}`} value={r.path} onChange={e => handleRuleChange(index, 'path', e.target.value)} placeholder="/private/"/>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeRule(index)} className="shrink-0 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
              ))}
               <Button variant="outline" className="w-full" onClick={addRule}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Rule
              </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Set a default policy to either allow or block all search engine crawlers.</li>
                        <li>Optionally, add the full URL to your sitemap to help crawlers find all your pages.</li>
                        <li>Add custom rules for specific crawlers (like "Googlebot") to block them from certain parts of your site (like `/admin/`).</li>
                        <li>The tool generates the `robots.txt` file content, which you can copy and save to the root of your website.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Improve SEO:</strong> Guide Google to crawl your important pages and ignore unimportant ones, optimizing your "crawl budget."</li>
                        <li><strong>Block Private Areas:</strong> Prevent search engines from indexing admin dashboards, user profile pages, or thank-you pages.</li>
                        <li><strong>Prevent Duplicate Content:</strong> Use `Disallow` rules to stop crawlers from indexing pages with duplicate content, such as print-friendly versions.</li>
                        <li><strong>Sitemap Submission:</strong> Ensure all search engines can easily find your sitemap by including its location in your `robots.txt` file.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function RobotsTxtGeneratorResults({ content }: { content: string; }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in h-full" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Generated robots.txt</CardTitle>
            <CardDescription>Save this content as `robots.txt` in your site's root.</CardDescription>
          </div>
          {content && (
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy File'}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {content ? (
            <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm h-96">
              <code>{content}</code>
            </pre>
          ) : (
             <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-full flex flex-col justify-center">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Your robots.txt content will appear here</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure the rules on the left to get started.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Robots.txt Generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "A free tool to create a robots.txt file to guide search engine crawlers, with options for default policies and custom rules.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
};

function RobotsTxtGeneratorWrapper() {
  const [config, setConfig] = useState<RobotsConfig>({
    defaultPolicy: 'allowAll',
    sitemap: '',
    customRules: [{ userAgent: '*', rule: 'disallow', path: '' }],
  });

  let content = '';
  const rulesByAgent: { [key: string]: string[] } = {};

  if (config.defaultPolicy === 'disallowAll') {
    content += 'User-agent: *\nDisallow: /\n\n';
  } else {
    content += 'User-agent: *\nAllow: /\n\n';
  }

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

  if (config.sitemap) {
    content += `Sitemap: ${config.sitemap}\n`;
  }

  const robotsTxt = content.trim();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <RobotsTxtGeneratorForm config={config} setConfig={setConfig} />
      <RobotsTxtGeneratorResults content={robotsTxt} />
    </div>
  );
}

export default function RobotsTxtGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className='pl-0'>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <RobotsTxtGeneratorWrapper />
      </main>
    </div>
  );
}
