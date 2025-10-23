
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleForm } from './article-form';
import { FaqForm } from './faq-form';
import { LocalBusinessForm } from './local-business-form';
import { Briefcase, FileText, HelpCircle } from 'lucide-react';

type SchemaGeneratorFormProps = {
  setSchema: (schema: string) => void;
};

export function SchemaGeneratorForm({ setSchema }: SchemaGeneratorFormProps) {
  
  return (
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Schema Markup Generator</CardTitle>
        <CardDescription>
          Select a schema type and fill in the details to generate JSON-LD markup.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="article" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="article"><FileText className="mr-2 h-4 w-4" />Article</TabsTrigger>
            <TabsTrigger value="faq"><HelpCircle className="mr-2 h-4 w-4" />FAQ</TabsTrigger>
            <TabsTrigger value="local"><Briefcase className="mr-2 h-4 w-4" />Local Business</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <ArticleForm setSchema={setSchema} />
          </TabsContent>
          <TabsContent value="faq">
            <FaqForm setSchema={setSchema} />
          </TabsContent>
           <TabsContent value="local">
            <LocalBusinessForm setSchema={setSchema} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

