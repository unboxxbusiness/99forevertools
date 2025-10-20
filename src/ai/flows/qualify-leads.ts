'use server';

/**
 * @fileOverview AI-powered lead qualification flow.
 *
 * This file defines a Genkit flow that uses AI to analyze scraped business leads and qualify them based on
 * predefined criteria such as the presence of a website or basic online information.
 *
 * @exports qualifyLeads - The main function to qualify a list of leads.
 * @exports QualifyLeadsInput - The input type for the qualifyLeads function.
 * @exports QualifyLeadsOutput - The output type for the qualifyLeads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LeadSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  websiteStatus: z
    .string()
    .describe(
      'The status of the website.  Valid values are \"exists\", \"missing\".'
    ),
  country: z.string().describe('The country the business is located in.'),
  city: z.string().describe('The city the business is located in.'),
  pincode: z.string().describe('The pincode the business is located in.'),
});

export type Lead = z.infer<typeof LeadSchema>;

const QualifyLeadsInputSchema = z.object({
  leads: z.array(LeadSchema).describe('An array of business leads to qualify.'),
});
export type QualifyLeadsInput = z.infer<typeof QualifyLeadsInputSchema>;

const QualifiedLeadSchema = LeadSchema.extend({
  qualification: z
    .string()
    .describe(
      'The qualification status of the lead. Valid values are \"qualified\", \"unqualified\".'
    ),
  reason: z.string().describe('The reason for the qualification status.'),
});

export type QualifiedLead = z.infer<typeof QualifiedLeadSchema>;

const QualifyLeadsOutputSchema = z.object({
  qualifiedLeads: z
    .array(QualifiedLeadSchema)
    .describe('An array of business leads that have been qualified.'),
});
export type QualifyLeadsOutput = z.infer<typeof QualifyLeadsOutputSchema>;

export async function qualifyLeads(input: QualifyLeadsInput): Promise<QualifyLeadsOutput> {
  return qualifyLeadsFlow(input);
}

const qualifyLeadsPrompt = ai.definePrompt({
  name: 'qualifyLeadsPrompt',
  input: {schema: QualifyLeadsInputSchema},
  output: {schema: QualifyLeadsOutputSchema},
  prompt: `You are an expert lead qualifier for local businesses.

You will receive a list of business leads, each with a business name, website status (\"exists\" or \"missing\"), and location details.

Your job is to qualify each lead based on the following criteria:

*   A lead is considered \"qualified\" if the websiteStatus is \"missing\".
*   A lead is considered \"unqualified\" if the websiteStatus is \"exists\".

For each lead, determine its qualification status and provide a brief reason for the qualification.

Return the results in a JSON format.

Here is the list of leads:

{{#each leads}}
Business Name: {{{businessName}}}
Website Status: {{{websiteStatus}}}
Country: {{{country}}}
City: {{{city}}}
Pincode: {{{pincode}}}
{{/each}}`,
});

const qualifyLeadsFlow = ai.defineFlow(
  {
    name: 'qualifyLeadsFlow',
    inputSchema: QualifyLeadsInputSchema,
    outputSchema: QualifyLeadsOutputSchema,
  },
  async input => {
    const {output} = await qualifyLeadsPrompt(input);
    return output!;
  }
);
