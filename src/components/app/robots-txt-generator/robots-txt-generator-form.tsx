'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Lightbulb, Briefcase } from 'lucide-react';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

type RobotsTxtGeneratorFormProps = {
  config: RobotsConfig;
  setConfig: (config: RobotsConfig) => void;
};

export function RobotsTxtGeneratorForm({ config, setConfig }: RobotsTxtGeneratorFormProps) {
  
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
