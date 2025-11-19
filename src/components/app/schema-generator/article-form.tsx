
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileJson } from 'lucide-react';

const formSchema = z.object({
  headline: z.string().min(1, 'Headline is required.'),
  author: z.string().min(1, 'Author name is required.'),
  image: z.string().url('Must be a valid image URL.'),
  datePublished: z.string().min(1, 'Publication date is required.'),
});

type ArticleFormProps = {
  setSchema: (schema: string) => void;
};

export function ArticleForm({ setSchema }: ArticleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: '',
      author: '',
      image: '',
      datePublished: new Date().toISOString().split('T')[0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const schemaObject = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: values.headline,
      author: {
        '@type': 'Person',
        name: values.author,
      },
      image: [values.image],
      datePublished: values.datePublished,
    };
    setSchema(JSON.stringify(schemaObject, null, 2));
  }

  return (
    <div className="pt-6">
      <h3 className="text-lg font-medium mb-4">Article Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., The Future of AI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="datePublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Published</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <FileJson className="mr-2 h-4 w-4" />
            Generate Schema
          </Button>
        </form>
      </Form>
    </div>
  );
}
