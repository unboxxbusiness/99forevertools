
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, KeyRound, Lightbulb, Briefcase } from 'lucide-react';
import { generatePasswordAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  length: z.number().min(4).max(64),
  includeUppercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
});

type PasswordFormProps = {
  setPassword: (password: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function PasswordGeneratorForm({ setPassword, setIsLoading, setHasGenerated }: PasswordFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 16,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHasGenerated(true);
    setPassword('');

    try {
      const result = await generatePasswordAction(values);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setPassword('');
      } else {
        setPassword(result.data || '');
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8'>
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Password Generator</CardTitle>
        <CardDescription>
          Create a strong, secure password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Length: <span className="text-primary font-bold">{field.value}</span></FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      min={4}
                      max={64}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="includeUppercase"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">Include Uppercase (A-Z)</FormLabel>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="includeNumbers"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">Include Numbers (0-9)</FormLabel>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="includeSymbols"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal">Include Symbols (!@#$)</FormLabel>
                        </FormItem>
                    )}
                />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <KeyRound className="mr-2 h-5 w-5" />
                  Generate Password
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
                        <li>Adjust the slider to set your desired password length.</li>
                        <li>Select the character types you want to include: uppercase letters, numbers, and symbols.</li>
                        <li>Click the "Generate Password" button.</li>
                        <li>A strong, random password that meets your criteria is instantly created.</li>
                        <li>Click the password or the "Copy" button to copy it to your clipboard.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>New Account Setup:</strong> Create unique, strong passwords for every new online service your business signs up for.</li>
                        <li><strong>Employee Onboarding:</strong> Generate secure initial passwords for new employees' company accounts.</li>
                        <li><strong>Wi-Fi Passwords:</strong> Create a strong and random password for your office Wi-Fi network.</li>
                        <li><strong>Improving Security:</strong> Regularly update passwords for important accounts (like banking, social media, and email) with newly generated ones.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
