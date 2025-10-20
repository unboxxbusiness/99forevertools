'use server';
/**
 * @fileoverview A flow for generating cold email subject lines.
 *
 * - generateSubjectLines - A function that handles the subject line generation process.
 * - SubjectLineGeneratorInput - The input type for the generateSubjectLines function.
 * - SubjectLineGeneratorOutput - The return type for the generateSubjectLines function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SubjectLineGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic or goal for the email.'),
});
export type SubjectLineGeneratorInput = z.infer<typeof SubjectLineGeneratorInputSchema>;

const SubjectLineGeneratorOutputSchema = z.object({
  subjectLines: z.array(z.string()).describe('A list of 10 high-converting subject lines.'),
});
export type SubjectLineGeneratorOutput = z.infer<typeof SubjectLineGeneratorOutputSchema>;

export async function generateSubjectLines(input: SubjectLineGeneratorInput): Promise<SubjectLineGeneratorOutput> {
  return generateSubjectLinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSubjectLinesPrompt',
  input: { schema: SubjectLineGeneratorInputSchema },
  output: { schema: SubjectLineGeneratorOutputSchema },
  prompt: `You are a world-class direct response copywriter and email marketing expert.
Your task is to generate 10 high-converting cold email subject lines based on the provided topic or goal: {{{topic}}}.

The subject lines should be:
- Short and punchy
- Curiosity-driven
- Personalized (where possible, use placeholders like [Name] or [Company])
- Avoid spam triggers
- Create a sense of urgency or exclusivity

Generate exactly 10 subject lines.
`,
});

const generateSubjectLinesFlow = ai.defineFlow(
  {
    name: 'generateSubjectLinesFlow',
    inputSchema: SubjectLineGeneratorInputSchema,
    outputSchema: SubjectLineGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
