'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocalBusinessForm } from './local-business-form';
import { ArticleForm } from './article-form';
import { FaqForm } from './faq-form';

type SchemaGeneratorFormProps = {
  setSchema: (schema: string) => void;
};

export function SchemaGeneratorForm({ setSchema }: SchemaGeneratorFormProps) {
  return (
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Schema Markup Generator</CardTitle>
        <CardDescription>
          Select a schema type and fill out the form to generate JSON-LD structured data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="local">Local Business</TabsTrigger>
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <LocalBusinessForm setSchema={setSchema} />
          </TabsContent>
          <TabsContent value="article">
            <ArticleForm setSchema={setSchema} />
          </TabsContent>
          <TabsContent value="faq">
            <FaqForm setSchema={setSchema} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
