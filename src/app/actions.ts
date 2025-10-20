'use server';

import { z } from 'zod';
import { qualifyLeads, QualifyLeadsInput } from '@/ai/flows/qualify-leads';
import { mockLeads } from '@/lib/mock-leads';

const formSchema = z.object({
  businessType: z.string().min(2, { message: 'Business type must be at least 2 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
});

export async function getQualifiedLeadsAction(values: z.infer<typeof formSchema>) {
  try {
    const validatedFields = formSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid input.', data: [] };
    }

    // In a real application, you would scrape Google Maps here.
    // For this demo, we filter from a static list based on city.
    const { city } = validatedFields.data;
    const scrapedLeads = mockLeads.filter(lead => 
      lead.city.toLowerCase() === city.toLowerCase()
    );

    if (scrapedLeads.length === 0) {
      return { data: [], error: null };
    }

    const aiInput: QualifyLeadsInput = {
      leads: scrapedLeads,
    };

    const result = await qualifyLeads(aiInput);
    return { data: result.qualifiedLeads, error: null };
  } catch (error) {
    console.error('Error qualifying leads:', error);
    return { error: 'Failed to qualify leads. Please try again.', data: [] };
  }
}
