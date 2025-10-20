'use server';
/**
 * @fileoverview A flow for suggesting contacts at a company.
 *
 * - suggestContacts - A function that handles the contact suggestion process.
 * - ContactSuggesterInput - The input type for the suggestContacts function.
 * - ContactSuggesterOutput - The return type for the suggestContacts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContactSuggesterInputSchema = z.object({
  companyWebsite: z.string().url().describe('The URL of the company\'s website.'),
  service: z.string().describe('The service being offered to the company.'),
});
export type ContactSuggesterInput = z.infer<typeof ContactSuggesterInputSchema>;

const ContactSuggesterOutputSchema = z.object({
  jobTitles: z.array(z.string()).describe('A list of 3-5 relevant job titles to contact.'),
});
export type ContactSuggesterOutput = z.infer<typeof ContactSuggesterOutputSchema>;

export async function suggestContacts(input: ContactSuggesterInput): Promise<ContactSuggesterOutput> {
  return suggestContactsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContactsPrompt',
  input: { schema: ContactSuggesterInputSchema },
  output: { schema: ContactSuggesterOutputSchema },
  prompt: `You are a B2B sales development expert. Your job is to identify the most relevant people to contact at a company for a specific service.

Based on the company website ({{{companyWebsite}}}) and the service being offered ({{{service}}}), please suggest a list of 3 to 5 job titles that would be the most appropriate decision-makers or influencers to contact.

Do not suggest generic titles like "Manager". Be as specific as possible. For example, instead of "Marketing Manager," suggest "Director of Demand Generation" or "Head of Growth Marketing" if appropriate.
`,
});

const suggestContactsFlow = ai.defineFlow(
  {
    name: 'suggestContactsFlow',
    inputSchema: ContactSuggesterInputSchema,
    outputSchema: ContactSuggesterOutputSchema,
  },
  async (input) => {
    // In a real application, you might scrape the website content here.
    // For this example, we'll just pass the URL and service to the AI.
    const { output } = await prompt(input);
    return output!;
  }
);
