'use server';
/**
 * @fileoverview A flow for generating "Problem, Agitate, Solve" copy.
 *
 * - generatePasCopy - A function that handles the PAS copy generation process.
 * - PasCopyGeneratorInput - The input type for the generatePasCopy function.
 * - PasCopyGeneratorOutput - The return type for the generatePasCopy function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PasCopyGeneratorInputSchema = z.object({
  problem: z.string().describe('The core problem the target audience faces.'),
  agitation: z.string().describe('The emotional pain or frustration caused by the problem.'),
  solution: z.string().describe('The solution you offer that resolves the problem.'),
});
export type PasCopyGeneratorInput = z.infer<typeof PasCopyGeneratorInputSchema>;

const PasCopyGeneratorOutputSchema = z.object({
  copy: z.object({
    problem: z.string().describe('A paragraph describing the problem.'),
    agitate: z.string().describe('A paragraph agitating the problem.'),
    solve: z.string().describe('A paragraph presenting the solution.'),
  }),
});
export type PasCopyGeneratorOutput = z.infer<typeof PasCopyGeneratorOutputSchema>;

export async function generatePasCopy(input: PasCopyGeneratorInput): Promise<PasCopyGeneratorOutput> {
  return generatePasCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePasCopyPrompt',
  input: { schema: PasCopyGeneratorInputSchema },
  output: { schema: PasCopyGeneratorOutputSchema },
  prompt: `You are a world-class direct response copywriter who specializes in the "Problem, Agitate, Solve" (PAS) framework.
Your task is to write compelling copy based on the user's input.

- Problem: {{{problem}}}
- Agitate: {{{agitation}}}
- Solution: {{{solution}}}

For each section (Problem, Agitate, Solve), write one engaging paragraph that flows smoothly into the next.
The tone should be persuasive, empathetic, and clear.
Focus on creating a strong emotional connection with the reader.
`,
});

const generatePasCopyFlow = ai.defineFlow(
  {
    name: 'generatePasCopyFlow',
    inputSchema: PasCopyGeneratorInputSchema,
    outputSchema: PasCopyGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
