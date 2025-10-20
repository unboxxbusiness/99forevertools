'use client';

import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { FileJson, PlusCircle, Trash2 } from 'lucide-react';

const faqItemSchema = z.object({
  question: z.string().min(1, 'Question cannot be empty.'),
  answer: z.string().min(1, 'Answer cannot be empty.'),
});

const formSchema = z.object({
  faqs: z.array(faqItemSchema).min(1, 'You must add at least one FAQ.'),
});

type FaqFormProps = {
  setSchema: (schema: string) => void;
};

export function FaqForm({ setSchema }: FaqFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faqs: [{ question: '', answer: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'faqs',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const schemaObject = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: values.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    setSchema(JSON.stringify(schemaObject, null, 2));
  }

  return (
    <div className="pt-6">
      <h3 className="text-lg font-medium mb-4">FAQ Items</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                <FormField
                  control={form.control}
                  name={`faqs.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., What is your return policy?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`faqs.${index}.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer {index + 1}</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., We offer a 30-day return policy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ question: '', answer: '' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Another FAQ
          </Button>

          <Button type="submit" className="w-full">
            <FileJson className="mr-2 h-4 w-4" />
            Generate Schema
          </Button>
        </form>
      </Form>
    </div>
  );
}
