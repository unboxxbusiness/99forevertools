'use server';
/**
 * @fileoverview A flow for generating a value proposition.
 *
 * - generateValueProposition - A function that handles the value proposition generation process.
 * - ValuePropGeneratorInput - The input type for the generateValueProposition function.
 * - ValuePropGeneratorOutput - The return type for the generateValueProposition function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ValuePropGeneratorInputSchema = z.object({
  productName: z.string().describe('The name of the product or service.'),
  targetAudience: z.string().describe('The target audience for the product.'),
  mainBenefit: z.string().describe('The main problem solved or benefit provided.'),
  differentiator: z.string().describe('What makes this product unique from competitors.'),
});
export type ValuePropGeneratorInput = z.infer<typeof ValuePropGeneratorInputSchema>;

const ValuePropGeneratorOutputSchema = z.object({
  valueProposition: z.string().describe('A single, concise value proposition statement.'),
});
export type ValuePropGeneratorOutput = z.infer<typeof ValuePropGeneratorOutputSchema>;

export async function generateValueProposition(input: ValuePropGeneratorInput): Promise<ValuePropGeneratorOutput> {
  return generateValuePropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateValuePropPrompt',
  input: { schema: ValuePropGeneratorInputSchema },
  output: { schema: ValuePropGeneratorOutputSchema },
  prompt: `You are a world-class marketing strategist specializing in creating powerful value propositions.

Your task is to generate a single, clear, and compelling value proposition statement based on the following information:

- Product/Service Name: {{{productName}}}
- Target Audience: {{{targetAudience}}}
- Main Benefit/Problem Solved: {{{mainBenefit}}}
- Unique Differentiator: {{{differentiator}}}

Use the following structure as a guideline:
For [target audience], [product name] is the [category] that [main benefit/solves a problem] unlike [competitors/alternative] because it [unique differentiator].

Craft a single, concise value proposition statement.
`,
});

const generateValuePropFlow = ai.defineFlow(
  {
    name: 'generateValuePropFlow',
    inputSchema: ValuePropGeneratorInputSchema,
    outputSchema: ValuePropGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
