'use server';
/**
 * @fileOverview A flow for generating a business story.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StoryInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The company\'s industry.'),
  values: z.string().describe('The core values of the company.'),
});

export type StoryInput = z.infer<typeof StoryInputSchema>;

const StoryOutputSchema = z.object({
  story: z.string().describe('A compelling brand story.'),
});

export type StoryOutput = z.infer<typeof StoryOutputSchema>;

export async function generateStory(input: StoryInput): Promise<StoryOutput> {
  return storyGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'storyGeneratorPrompt',
  input: {schema: StoryInputSchema},
  output: {schema: StoryOutputSchema},
  prompt: `You are a branding expert. Write a short, compelling brand story for the following company.

Company Name: {{{companyName}}}
Industry: {{{industry}}}
Core Values: {{{values}}}

The story should be engaging and reflect the company's values.`,
});

const storyGeneratorFlow = ai.defineFlow(
  {
    name: 'storyGeneratorFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
