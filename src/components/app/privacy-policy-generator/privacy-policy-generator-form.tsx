
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
import { Loader2, ShieldCheck, Building, Link as LinkIcon, AtSign, Globe, Lightbulb, Briefcase } from 'lucide-react';
import { generatePrivacyPolicyAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  companyName: z.string().min(1, 'Company Name is required.'),
  websiteName: z.string().min(1, 'Website Name is required.'),
  websiteUrl: z.string().url('A valid Website URL is required.'),
  contactEmail: z.string().email('A valid Contact Email is required.'),
});

type PrivacyPolicyFormProps = {
  setPolicy: (policy: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function PrivacyPolicyGeneratorForm({ setPolicy, setIsLoading, setHasGenerated }: PrivacyPolicyFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      websiteName: '',
      websiteUrl: '',
      contactEmail: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setPolicy('');

    try {
      const result = await generatePrivacyPolicyAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setPolicy('');
      } else {
        setPolicy(result.data || '');
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setPolicy('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8'>
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Privacy Policy Generator</CardTitle>
        <CardDescription>
          Fill in your details to generate a basic privacy policy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., Acme Inc." {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Name</FormLabel>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., Acme" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., https://acme.com" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., contact@acme.com" {...field} className="pl-10" />
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
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Generate Policy
                </>
              )}
            </Button>
          </form>
        </Form>
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
                        <li>Enter your company name, website name, URL, and a contact email address.</li>
                        <li>Click the "Generate Policy" button.</li>
                        <li>The tool creates a generic, boilerplate privacy policy based on standard templates.</li>
                        <li>Copy the generated text and add it to a new privacy policy page on your website. <strong>This is not legal advice.</strong></li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>New Websites:</strong> Quickly create a starting point for a privacy policy for your new website or blog.</li>
                        <li><strong>App Development:</strong> Generate a basic policy required by app stores like Google Play or Apple App Store.</li>
                        <li><strong>Compliance Starter:</strong> Use this as a base template before having it reviewed by a legal professional to ensure it meets all legal requirements.</li>
                        <li><strong>Client Work:</strong> Provide clients with a placeholder privacy policy for their new websites while they seek legal counsel.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
