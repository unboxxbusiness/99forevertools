'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import React from 'react';

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
  );
}
