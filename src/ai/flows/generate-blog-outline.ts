'use server';
/**
 * @fileoverview A flow for generating a blog post outline.
 *
 * - generateBlogOutline - A function that handles the outline generation process.
 * - BlogOutlineGeneratorInput - The input type for the generateBlogOutline function.
 * - BlogOutline - The output type for the generateBlogOutline function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BlogOutlineGeneratorInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
});
export type BlogOutlineGeneratorInput = z.infer<typeof BlogOutlineGeneratorInputSchema>;

const OutlineSectionSchema = z.object({
  heading: z.string().describe('The H2 heading for a main section of the blog post.'),
  subheadings: z.array(z.string()).describe('A list of H3 subheadings for this section.'),
});

const BlogOutlineSchema = z.object({
  outline: z.array(OutlineSectionSchema).describe('A structured outline for the blog post, including an introduction and conclusion.'),
});
export type BlogOutline = z.infer<typeof BlogOutlineSchema>;

export async function generateBlogOutline(input: BlogOutlineGeneratorInput): Promise<BlogOutline> {
  return generateBlogOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogOutlinePrompt',
  input: { schema: BlogOutlineGeneratorInputSchema },
  output: { schema: BlogOutlineSchema },
  prompt: `You are a world-class content strategist and copywriter.
Your task is to generate a structured blog post outline based on the provided title: {{{title}}}.

The outline should be logical, comprehensive, and follow a clear structure.
It must include an "Introduction" section and a "Conclusion" section.
Each main section should have an H2 heading and be followed by 3-5 relevant H3 subheadings.

Generate a complete outline with several main sections.
`,
});

const generateBlogOutlineFlow = ai.defineFlow(
  {
    name: 'generateBlogOutlineFlow',
    inputSchema: BlogOutlineGeneratorInputSchema,
    outputSchema: BlogOutlineSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
