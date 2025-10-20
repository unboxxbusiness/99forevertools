'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Link, Briefcase } from 'lucide-react';
import { suggestContactsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  companyWebsite: z.string().url({ message: 'Please enter a valid URL.' }),
  service: z.string().min(3, { message: 'Service must be at least 3 characters long.' }),
});

type WhoToContactFormProps = {
  setJobTitles: (jobTitles: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function WhoToContactForm({ setJobTitles, setIsLoading, setHasGenerated }: WhoToContactFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyWebsite: 'https://www.salesforce.com',
      service: 'AI-powered chatbots for customer support',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setJobTitles([]);
    try {
      const result = await suggestContactsAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setJobTitles([]);
      } else {
        setJobTitles(result.data);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setJobTitles([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Find the Right Contact</CardTitle>
        <CardDescription>
          Enter a company website and your service to find the right job titles to contact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., https://www.example.com" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Service</FormLabel>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., SEO services, Web design, etc." {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Users className="mr-2 h-5 w-5" />
                  Find Contacts
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
