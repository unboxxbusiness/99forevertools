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
import { Loader2, KeyRound } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { generatePasswordAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
    length: z.number().min(4).max(128),
    includeUppercase: z.boolean(),
    includeLowercase: z.boolean(),
    includeNumbers: z.boolean(),
    includeSymbols: z.boolean(),
}).refine(data => data.includeUppercase || data.includeLowercase || data.includeNumbers || data.includeSymbols, {
    message: 'At least one character type must be selected.',
    path: ['includeUppercase'],
});

type PasswordGeneratorFormProps = {
  setPassword: (password: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function PasswordGeneratorForm({ setPassword, setIsLoading, setHasGenerated }: PasswordGeneratorFormProps) {
  const { toast } = useToast();
  const [length, setLength] = useState(16);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false,
    },
  });

  const { isSubmitting, watch, setValue } = form.formState;

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
        form.setError('includeUppercase', { type: 'manual', message: 'At least one character type must be selected.' });
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
    <Card className="w-full shadow-lg bg-card border-primary/20 animate-fade-in h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Password Generator</CardTitle>
        <CardDescription>
          Create a strong and secure password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password Length</FormLabel>
                    <span className="text-primary font-bold text-lg">{length}</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={4}
                      max={128}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => {
                          field.onChange(value[0]);
                          setLength(value[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="includeUppercase"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Uppercase (A-Z)</FormLabel>
                        </div>
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="includeLowercase"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Lowercase (a-z)</FormLabel>
                        </div>
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="includeNumbers"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Numbers (0-9)</FormLabel>
                        </div>
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="includeSymbols"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Symbols (!@#$..)</FormLabel>
                        </div>
                        </FormItem>
                    )}
                 />
            </div>
             {form.formState.errors.includeUppercase && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.includeUppercase.message}
              </p>
            )}

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
  );
}
