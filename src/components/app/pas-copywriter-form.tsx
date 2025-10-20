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
import { Loader2, BrainCircuit, AlertTriangle, Flame, Sparkles } from 'lucide-react';
import { generatePasCopyAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { PasCopyGeneratorOutput } from '@/ai/flows/generate-pas-copy';

const formSchema = z.object({
  problem: z.string().min(10, { message: 'Problem must be at least 10 characters.' }),
  agitation: z.string().min(10, { message: 'Agitation must be at least 10 characters.' }),
  solution: z.string().min(10, { message: 'Solution must be at least 10 characters.' }),
});

type PasCopywriterFormProps = {
  setCopy: (copy: PasCopyGeneratorOutput | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function PasCopywriterForm({ setCopy, setIsLoading, setHasGenerated }: PasCopywriterFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: 'Struggling to write compelling marketing copy that converts.',
      agitation: 'Wasting hours staring at a blank page, feeling uninspired, and watching potential customers slip away.',
      solution: 'An AI-powered copywriter that generates high-converting "Problem, Agitate, Solve" copy in seconds.',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setCopy(null);
    try {
      const result = await generatePasCopyAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setCopy(null);
      } else {
        setCopy(result.data);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setCopy(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">"Problem, Agitate, Solve" Copywriter</CardTitle>
        <CardDescription>
          Generate persuasive copy for your landing page or email in seconds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> The Problem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What is the core problem your audience faces?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agitation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Flame className="h-4 w-4" /> The Agitation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What makes this problem emotionally painful or frustrating?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> The Solution</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How does your product or service solve this problem?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-5 w-5" />
                  Generate Copy
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
