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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Gem, Target, Sparkles, Trophy } from 'lucide-react';
import { generateValuePropAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  targetAudience: z.string().min(3, { message: 'Target audience must be at least 3 characters.' }),
  mainBenefit: z.string().min(10, { message: 'Main benefit must be at least 10 characters.' }),
  differentiator: z.string().min(10, { message: 'Differentiator must be at least 10 characters.' }),
});

type ValuePropFormProps = {
  setValueProposition: (valueProp: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function ValuePropositionForm({ setValueProposition, setIsLoading, setHasGenerated }: ValuePropFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: 'SuperWidget',
      targetAudience: 'Busy professionals',
      mainBenefit: 'It automates repetitive tasks, saving hours of work each week.',
      differentiator: 'It uses advanced AI to learn and adapt to your workflow.',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setValueProposition('');
    try {
      const result = await generateValuePropAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setValueProposition('');
      } else {
        setValueProposition(result.data);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setValueProposition('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Craft Your Value Proposition</CardTitle>
        <CardDescription>
          Answer a few questions and let our AI generate a powerful value proposition for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Service Name</FormLabel>
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., 'SuperWidget'" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who is your Target Audience?</FormLabel>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., 'Small business owners', 'College students'" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainBenefit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is the Main Benefit or Problem Solved?</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea placeholder="e.g., 'Helps them save time on social media marketing.'" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="differentiator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What makes you Unique?</FormLabel>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Textarea placeholder="e.g., 'Unlike other tools, we offer a 24/7 support team.'" {...field} className="pl-10" />
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
                  <Gem className="mr-2 h-5 w-5" />
                  Generate Value Proposition
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
