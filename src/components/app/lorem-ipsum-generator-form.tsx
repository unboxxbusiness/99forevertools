
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
import { Loader2, ClipboardType, Pilcrow, Lightbulb, Briefcase } from 'lucide-react';
import { generateLoremIpsumAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  paragraphs: z.coerce.number().min(1, {
    message: 'Must be at least 1.',
  }).max(50, {
    message: 'Cannot be more than 50.',
  }),
});

type LoremIpsumFormProps = {
  setText: (text: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function LoremIpsumGeneratorForm({ setText, setIsLoading, setHasGenerated }: LoremIpsumFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paragraphs: 5,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setText('');

    try {
      const result = await generateLoremIpsumAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setText('');
      } else {
        setText(result.data || '');
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setText('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8'>
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Lorem Ipsum</CardTitle>
        <CardDescription>
          Generate placeholder text for your mockups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <FormField
              control={form.control}
              name="paragraphs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Paragraphs</FormLabel>
                  <div className="relative">
                    <Pilcrow className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5" {...field} className="pl-10" />
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
                  <ClipboardType className="mr-2 h-5 w-5" />
                  Generate Text
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
                        <li>Enter the number of paragraphs of Lorem Ipsum text you need.</li>
                        <li>Click the "Generate Text" button.</li>
                        <li>The tool instantly creates the specified number of paragraphs.</li>
                        <li>Click "Copy Text" to copy the result to your clipboard for use in your designs.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Website Mockups:</strong> Fill your website design mockups with placeholder text to visualize the final layout.</li>
                        <li><strong>Brochure & Flyer Design:</strong> Use Lorem Ipsum to lay out print materials before the final copy is ready.</li>
                        <li><strong>Presentation Slides:</strong> Add placeholder text to your presentation slides to get a feel for the design.</li>
                        <li><strong>App Development:</strong> Fill UI elements in your app prototype with text to test spacing and readability.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
