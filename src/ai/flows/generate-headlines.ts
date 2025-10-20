'use server';
/**
 * @fileoverview A flow for generating catchy headlines.
 *
 * - generateHeadlines - A function that handles the headline generation process.
 * - HeadlineGeneratorInput - The input type for the generateHeadlines function.
 * - HeadlineGeneratorOutput - The return type for the generateHeadlines function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HeadlineGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post or landing page.'),
});
export type HeadlineGeneratorInput = z.infer<typeof HeadlineGeneratorInputSchema>;

const HeadlineGeneratorOutputSchema = z.object({
  headlines: z.array(z.string()).describe('A list of 10 catchy headlines.'),
});
export type HeadlineGeneratorOutput = z.infer<typeof HeadlineGeneratorOutputSchema>;

export async function generateHeadlines(input: HeadlineGeneratorInput): Promise<HeadlineGeneratorOutput> {
  return generateHeadlinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeadlinesPrompt',
  input: { schema: HeadlineGeneratorInputSchema },
  output: { schema: HeadlineGeneratorOutputSchema },
  prompt: `You are a world-class copywriter specializing in creating viral headlines for blog posts and landing pages.
Your task is to generate 10 catchy headlines based on the provided topic: {{{topic}}}.

The headlines should be:
- Attention-grabbing and intriguing.
- Clear and concise.
- Use strong, emotional, or power words.
- Create a sense of curiosity or urgency.
- Optimized for clicks and shares.

Generate exactly 10 headlines.
`,
});

const generateHeadlinesFlow = ai.defineFlow(
  {
    name: 'generateHeadlinesFlow',
    inputSchema: HeadlineGeneratorInputSchema,
    outputSchema: HeadlineGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
