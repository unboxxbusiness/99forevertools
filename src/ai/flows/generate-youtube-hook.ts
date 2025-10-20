'use server';
/**
 * @fileoverview A flow for generating a YouTube video script hook.
 *
 * - generateYoutubeHook - A function that handles the hook generation process.
 * - YoutubeHookGeneratorInput - The input type for the generateYoutubeHook function.
 * - YoutubeHookGeneratorOutput - The return type for the generateYoutubeHook function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const YoutubeHookGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic of the YouTube video.'),
});
export type YoutubeHookGeneratorInput = z.infer<typeof YoutubeHookGeneratorInputSchema>;

const YoutubeHookGeneratorOutputSchema = z.object({
  hook: z.string().describe('A 15-second script hook designed to grab viewer attention.'),
});
export type YoutubeHookGeneratorOutput = z.infer<typeof YoutubeHookGeneratorOutputSchema>;

export async function generateYoutubeHook(input: YoutubeHookGeneratorInput): Promise<YoutubeHookGeneratorOutput> {
  return generateYoutubeHookFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateYoutubeHookPrompt',
  input: { schema: YoutubeHookGeneratorInputSchema },
  output: { schema: YoutubeHookGeneratorOutputSchema },
  prompt: `You are an expert YouTube scriptwriter with a talent for creating viral-worthy hooks.
Your task is to write the first 15 seconds (approximately 30-50 words) of a YouTube video script based on the provided topic: {{{topic}}}.

The hook should be:
- Extremely attention-grabbing and create immediate curiosity.
- Directly address a pain point or a strong desire of the target audience.
- Be fast-paced and energetic.
- End with a question or a bold statement that makes the viewer want to know more.

Generate a single, powerful hook.
`,
});

const generateYoutubeHookFlow = ai.defineFlow(
  {
    name: 'generateYoutubeHookFlow',
    inputSchema: YoutubeHookGeneratorInputSchema,
    outputSchema: YoutubeHookGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
