

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
import { Loader2, Activity, Type, Lightbulb, Briefcase } from 'lucide-react';
import { analyzeHeadlineAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { type HeadlineAnalysis } from './headline-analyzer-results';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  headline: z.string().min(3, {
    message: 'Headline must be at least 3 characters.',
  }),
});

type HeadlineFormProps = {
  setAnalysis: (analysis: HeadlineAnalysis | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
  setHeadline: (headline: string) => void;
};

export function HeadlineAnalyzerForm({ setAnalysis, setIsLoading, setHasGenerated, setHeadline }: HeadlineFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setAnalysis(null);
    setHeadline(values.headline);

    try {
      const result = await analyzeHeadlineAction(values);

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
        <CardTitle className="text-3xl font-bold tracking-tight">Headline Analyzer</CardTitle>
        <CardDescription>
          Enter a headline to score its effectiveness and get suggestions for improvement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Headline</FormLabel>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., The Ultimate Guide to..." {...field} className="pl-10" />
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
                  <Activity className="mr-2 h-5 w-5" />
                  Analyze Headline
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
                        <li>Enter your blog or article headline into the input field.</li>
                        <li>Click "Analyze Headline" to get an instant score and detailed feedback.</li>
                        <li>The tool evaluates your headline based on word count, emotional sentiment, clarity, and the use of powerful, attention-grabbing words.</li>
                        <li>Review the suggestions to refine your headline for maximum impact.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Content Marketing:</strong> Write blog post titles that grab attention and increase click-through rates from search engines.</li>
                        <li><strong>Email Newsletters:</strong> Craft subject lines that stand out in a crowded inbox.</li>
                        <li><strong>Social Media Posts:</strong> Create compelling headlines for your social media updates to boost engagement.</li>
                        <li><strong>Ad Copy:</strong> Write powerful headlines for your Google or Facebook ads to improve conversion rates.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
