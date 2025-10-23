
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
import { Loader2, MailCheck, Type, Lightbulb, Briefcase } from 'lucide-react';
import { analyzeSubjectLineAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { type SubjectLineAnalysis } from './email-subject-line-tester-results';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  subject: z.string().min(3, {
    message: 'Subject line must be at least 3 characters.',
  }),
});

type SubjectLineFormProps = {
  setAnalysis: (analysis: SubjectLineAnalysis | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
  setSubject: (subject: string) => void;
};

export function EmailSubjectLineTesterForm({ setAnalysis, setIsLoading, setHasGenerated, setSubject }: SubjectLineFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setAnalysis(null);
    setSubject(values.subject);

    try {
      const result = await analyzeSubjectLineAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setAnalysis(null);
      } else {
        setAnalysis(result.data);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8'>
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Email Subject Line Tester</CardTitle>
        <CardDescription>
          Enter a subject line to analyze its potential performance and identify spam triggers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject Line</FormLabel>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., Big news about your account" {...field} className="pl-10" />
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
                  <MailCheck className="mr-2 h-5 w-5" />
                  Analyze Subject Line
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
                        <li>Enter the email subject line you want to test into the input field.</li>
                        <li>Click "Analyze Subject Line" to get an overall score and a detailed breakdown.</li>
                        <li>The tool scores your subject line based on length, spam triggers, emotional impact, and formatting.</li>
                        <li>Review the suggestions to improve your subject line for better open rates.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Improve Open Rates:</strong> Test subject lines before sending a campaign to maximize the number of people who open your email.</li>
                        <li><strong>Avoid Spam Filters:</strong> Identify and remove words that are likely to get your email sent to the spam folder.</li>
                        <li><strong>A/B Testing Ideas:</strong> Get data-driven ideas for creating different subject lines to test against each other.</li>
                        <li><strong>Content Marketing:</strong> Craft more compelling subject lines for your newsletters to increase reader engagement.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
