'use server';

import { suggestNiches } from '@/ai/flows/suggest-niches';
import { generateSubjectLines } from '@/ai/flows/generate-subject-lines';
import {z} from 'zod';

const emailPermutatorSchema = z.object({
  firstName: z
    .string()
    .min(1, {message: 'First name is required.'})
    .transform(v => v.toLowerCase().replace(/[^a-z]/g, '')),
  lastName: z
    .string()
    .min(1, {message: 'Last name is required.'})
    .transform(v => v.toLowerCase().replace(/[^a-z]/g, '')),
  domain: z
    .string()
    .min(1, {message: 'Domain is required.'})
    .transform(v => v.toLowerCase()),
});

export async function generateEmailPermutationsAction(
  values: z.infer<typeof emailPermutatorSchema>
) {
  try {
    const validatedFields = emailPermutatorSchema.safeParse(values);
    if (!validatedFields.success) {
      return {error: 'Invalid input.', data: []};
    }

    const {firstName, lastName, domain} = validatedFields.data;
    const f = firstName.charAt(0);
    const l = lastName.charAt(0);

    const permutations = new Set([
      `${firstName}@${domain}`,
      `${lastName}@${domain}`,
      `${firstName}${lastName}@${domain}`,
      `${firstName}.${lastName}@${domain}`,
      `${f}${lastName}@${domain}`,
      `${f}.${lastName}@${domain}`,
      `${firstName}${l}@${domain}`,
      `${firstName}.${l}@${domain}`,
      `${f}${l}@${domain}`,
      `${f}.${l}@${domain}`,
      `${lastName}${firstName}@${domain}`,
      `${lastName}.${firstName}@${domain}`,
      `${firstName}_${lastName}@${domain}`,
      `${lastName}_${firstName}@${domain}`,
    ]);

    return {data: Array.from(permutations), error: null};
  } catch (error) {
    console.error('Error generating permutations:', error);
    return {
      error: 'Failed to generate emails. Please try again.',
      data: [],
    };
  }
}

const nicheSuggesterSchema = z.object({
  keyword: z.string().min(1, { message: 'Keyword is required.' }),
});

export async function suggestNichesAction(values: z.infer<typeof nicheSuggesterSchema>) {
  try {
    const validatedFields = nicheSuggesterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid input.', data: [] };
    }

    const { keyword } = validatedFields.data;
    const niches = await suggestNiches({ keyword });
    return { data: niches.suggestions, error: null };
  } catch (error) {
    console.error('Error suggesting niches:', error);
    return {
      error: 'Failed to suggest niches. Please try again.',
      data: [],
    };
  }
}

const subjectLineGeneratorSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters long.' }),
});

export async function generateSubjectLinesAction(values: z.infer<typeof subjectLineGeneratorSchema>) {
  try {
    const validatedFields = subjectLineGeneratorSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: 'Invalid input.', data: [] };
    }

    const { topic } = validatedFields.data;
    const result = await generateSubjectLines({ topic });
    return { data: result.subjectLines, error: null };
  } catch (error) {
    console.error('Error generating subject lines:', error);
    return {
      error: 'Failed to generate subject lines. Please try again.',
      data: [],
    };
  }
}
