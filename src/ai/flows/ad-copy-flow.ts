'use server';
/**
 * @fileOverview A flow for generating ad copy.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdCopyInputSchema = z.object({
  productName: z.string().describe('The name of the product or service.'),
  description: z.string().describe('A brief description of the product or service.'),
  targetAudience: z.string().describe('The intended audience for the ad.'),
});

export type AdCopyInput = z.infer<typeof AdCopyInputSchema>;

const AdCopyOutputSchema = z.object({
  headline: z.string().describe('A catchy headline for the ad.'),
  body: z.string().describe('The main body text of the ad copy.'),
});

export type AdCopyOutput = z.infer<typeof AdCopyOutputSchema>;

export async function generateAdCopy(input: AdCopyInput): Promise<AdCopyOutput> {
  return adCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adCopyPrompt',
  input: {schema: AdCopyInputSchema},
  output: {schema: AdCopyOutputSchema},
  prompt: `You are an expert copywriter. Generate a compelling ad for the following product.

Product Name: {{{productName}}}
Description: {{{description}}}
Target Audience: {{{targetAudience}}}

Generate a catchy headline and a persuasive body for the ad.`,
});

const adCopyFlow = ai.defineFlow(
  {
    name: 'adCopyFlow',
    inputSchema: AdCopyInputSchema,
    outputSchema: AdCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
