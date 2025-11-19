
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
  name: z.string().min(1, 'Business name is required.'),
  address: z.string().min(1, 'Address is required.'),
  phone: z.string().min(1, 'Phone number is required.'),
  website: z.string().url('Must be a valid URL.'),
  hours: z.string().min(1, 'Opening hours are required.'),
});

type LocalBusinessFormProps = {
  setSchema: (schema: string) => void;
};

export function LocalBusinessForm({ setSchema }: LocalBusinessFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      website: '',
      hours: 'Mo-Fr 09:00-17:00',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const schemaObject = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: values.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: values.address,
      },
      telephone: values.phone,
      url: values.website,
      openingHours: values.hours,
    };
    setSchema(JSON.stringify(schemaObject, null, 2));
  }

  return (
    <div className="pt-6">
      <h3 className="text-lg font-medium mb-4">Local Business Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John's Pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., https://johns.pizza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opening Hours</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mo-Fr 09:00-17:00" {...field} />
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
