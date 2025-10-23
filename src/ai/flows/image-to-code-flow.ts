
'use server';

/**
 * @fileOverview An AI flow to convert an image of a website to HTML and CSS code.
 *
 * - imageToCode - A function that handles the image-to-code conversion.
 * - ImageToCodeInput - The input type for the imageToCode function.
 * - ImageToCodeOutput - The return type for the imageToCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generate } from 'genkit/ai';

const ImageToCodeInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A screenshot of a website, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageToCodeInput = z.infer<typeof ImageToCodeInputSchema>;

const ImageToCodeOutputSchema = z.object({
  html: z.string().describe('The generated HTML code as a single string.'),
  css: z
    .string()
    .describe(
      'The generated CSS, using Tailwind CSS classes, as a single string.'
    ),
});
export type ImageToCodeOutput = z.infer<typeof ImageToCodeOutputSchema>;

export async function imageToCode(input: ImageToCodeInput): Promise<ImageToCodeOutput> {
  return imageToCodeFlow(input);
}

const prompt = `You are an expert web developer. Your task is to convert the provided website screenshot into a single, clean HTML file using Tailwind CSS for styling.

Respond with a JSON object containing two keys: "html" and "css".

1.  **HTML Structure**: Create a semantic and well-structured HTML5 document.
2.  **Styling**: Use Tailwind CSS classes directly in the HTML for all styling. Do not use inline styles or a separate <style> block.
3.  **Content**: Use placeholder text and images where necessary, but try to match the structure and layout of the screenshot. For images, use placeholders from picsum.photos.
4.  **CSS Output**: In the "css" key of your JSON response, provide the Tailwind CSS classes you used. This is for reference only. The primary styling should be in the HTML.
5.  **Code Only**: Do not add any explanations, comments, or markdown formatting around the JSON object. The response should be a raw JSON object string only.`;

const imageToCodeFlow = ai.defineFlow(
  {
    name: 'imageToCodeFlow',
    inputSchema: ImageToCodeInputSchema,
    outputSchema: ImageToCodeOutputSchema,
  },
  async (input) => {
    const { output } = await generate({
      model: 'googleai/gemini-1.5-pro',
      prompt: [
        { text: prompt },
        { media: { url: input.imageDataUri } },
      ],
      output: {
        format: 'json',
        schema: ImageToCodeOutputSchema,
      },
    });

    return output;
  }
);
