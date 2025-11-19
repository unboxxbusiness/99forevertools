
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleForm } from './article-form';
import { FaqForm } from './faq-form';
import { LocalBusinessForm } from './local-business-form';
import { Briefcase, FileText, HelpCircle, Lightbulb } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type SchemaGeneratorFormProps = {
  setSchema: (schema: string) => void;
};

export function SchemaGeneratorForm({ setSchema }: SchemaGeneratorFormProps) {
  
  return (
    <>
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
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Select the type of content you want to create schema for (e.g., Article, FAQ).</li>
                        <li>Fill in the specific details about your content in the form provided.</li>
                        <li>Click "Generate Schema" to create the JSON-LD structured data.</li>
                        <li>Copy the generated script tag and paste it into the `<head>` section of your webpage's HTML.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Blog Posts:</strong> Use "Article" schema to help Google understand your blog content, which can improve its appearance in search results.</li>
                        <li><strong>FAQ Pages:</strong> Implement "FAQ" schema to make your questions and answers eligible for display directly in Google's search results as a rich snippet.</li>
                        <li><strong>Local SEO:</strong> Use "Local Business" schema to clearly display your address, phone number, and opening hours in search results, making it easier for local customers to find you.</li>
                        <li><strong>Enhanced Search Appearance:</strong> Proper schema can lead to rich snippets, increasing click-through rates from search engine result pages.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
