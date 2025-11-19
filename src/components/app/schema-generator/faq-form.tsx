
'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { FileJson, PlusCircle, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  faqs: z.array(z.object({
    question: z.string().min(1, 'Question is required.'),
    answer: z.string().min(1, 'Answer is required.'),
  })).min(1, 'At least one FAQ is required.'),
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
    name: 'faqs'
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
      <h3 className="text-lg font-medium mb-4">FAQ Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-3 relative">
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
                        <Textarea placeholder="e.g., We accept returns within 30 days..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                     <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="w-full" onClick={() => append({ question: '', answer: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Question
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
