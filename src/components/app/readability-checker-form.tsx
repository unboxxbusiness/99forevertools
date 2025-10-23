
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Glasses, Pilcrow, Lightbulb, Briefcase } from 'lucide-react';
import { calculateReadabilityAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { type ReadabilityAnalysis } from './readability-checker-results';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Text content cannot be empty.',
  }),
});

type ReadabilityFormProps = {
  setAnalysis: (analysis: ReadabilityAnalysis | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function ReadabilityCheckerForm({ setAnalysis, setIsLoading, setHasGenerated }: ReadabilityFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setAnalysis(null);

    try {
      const result = await calculateReadabilityAction(values);

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
        <CardTitle className="text-3xl font-bold tracking-tight">Readability Score Calculator</CardTitle>
        <CardDescription>
          Paste your text to calculate its Flesch-Kincaid reading score.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Text</FormLabel>
                  <div className="relative">
                    <Pilcrow className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Textarea placeholder="Paste your article, email, or any text here..." {...field} className="pl-10" rows={8} />
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
                  <Glasses className="mr-2 h-5 w-5" />
                  Calculate Score
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
                        <li>Paste your text into the text area.</li>
                        <li>Click "Calculate Score".</li>
                        <li>The tool analyzes your text's sentence length and word complexity to calculate a Flesch-Kincaid reading ease score.</li>
                        <li>Review your score and the interpretation to see how easy your text is to understand. A score of 60-70 is considered good for most web content.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Website Content:</strong> Ensure your homepage, product descriptions, and landing pages are easy for all visitors to understand.</li>
                        <li><strong>Blog Writing:</strong> Write articles that are accessible to a broad audience, improving engagement and time on page.</li>
                        <li><strong>Email Marketing:</strong> Craft clear and simple emails that get your message across quickly and effectively.</li>
                        <li><strong>Policy Documents:</strong> Simplify your terms of service or privacy policies to make them more transparent for your customers.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
