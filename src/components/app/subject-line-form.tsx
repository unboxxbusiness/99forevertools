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
import { Loader2, MailPlus, Pencil } from 'lucide-react';
import { generateSubjectLinesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
});

type SubjectLineFormProps = {
  setSubjectLines: (subjectLines: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function SubjectLineForm({ setSubjectLines, setIsLoading, setHasGenerated }: SubjectLineFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'An introductory meeting request',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setSubjectLines([]);
    try {
      const result = await generateSubjectLinesAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setSubjectLines([]);
      } else {
        setSubjectLines(result.data);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setSubjectLines([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Craft the Perfect Subject Line</CardTitle>
        <CardDescription>
          Enter your email's topic or goal to get 10 AI-powered subject lines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic / Goal</FormLabel>
                  <div className="relative">
                    <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="e.g., collaboration, introductory meeting, feedback request" {...field} className="pl-10" />
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
                  <MailPlus className="mr-2 h-5 w-5" />
                  Generate Subjects
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
