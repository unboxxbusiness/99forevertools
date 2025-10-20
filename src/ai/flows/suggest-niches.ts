'use server';
/**
 * @fileoverview A flow for suggesting niche markets based on a keyword.
 *
 * - suggestNiches - A function that handles the niche suggestion process.
 * - NicheSuggesterInput - The input type for the suggestNiches function.
 * - NicheSuggesterOutput - The return type for the suggestNiches function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NicheSuggesterInputSchema = z.object({
  keyword: z.string().describe('The keyword to base niche suggestions on.'),
});
export type NicheSuggesterInput = z.infer<typeof NicheSuggesterInputSchema>;

const NicheSuggestionSchema = z.object({
  title: z.string().describe('A short, catchy title for the niche market.'),
  description: z.string().describe('A one or two sentence description of the niche market and why it is promising.'),
});

const NicheSuggesterOutputSchema = z.object({
  suggestions: z.array(NicheSuggestionSchema).describe('A list of 5-10 niche market suggestions.'),
});
export type NicheSuggesterOutput = z.infer<typeof NicheSuggesterOutputSchema>;

export async function suggestNiches(input: NicheSuggesterInput): Promise<NicheSuggesterOutput> {
  return suggestNichesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNichesPrompt',
  input: { schema: NicheSuggesterInputSchema },
  output: { schema: NicheSuggesterOutputSchema },
  prompt: `You are a marketing expert who is an expert at identifying underserved or specific niche markets.
Based on the provided keyword: {{{keyword}}}, please suggest a list of 5 to 10 niche markets.

For each suggestion, provide a short title and a one or two sentence description of the niche and why it might be a good opportunity.
Focus on niches that are specific and potentially underserved.
`,
});

const suggestNichesFlow = ai.defineFlow(
  {
    name: 'suggestNichesFlow',
    inputSchema: NicheSuggesterInputSchema,
    outputSchema: NicheSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
