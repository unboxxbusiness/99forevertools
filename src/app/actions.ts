'use server';

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

const csvCleanerSchema = z.object({
  csvContent: z.string().min(1, { message: 'CSV content cannot be empty.' }),
});

const capitalize = (s: string) => {
    if (typeof s !== 'string' || !s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const formatPhoneNumber = (phone: string) => {
    if (typeof phone !== 'string') return phone;
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11 && (cleaned.startsWith('1') || cleaned.startsWith('0'))) {
        return `+${cleaned.charAt(0)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
};

export async function cleanCsvAction(values: z.infer<typeof csvCleanerSchema>) {
    try {
        const validatedFields = csvCleanerSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid input.', data: null };
        }

        const { csvContent } = validatedFields.data;
        const rows = csvContent.split('\n');
        const headers = rows[0].trim().split(',').map(h => h.trim().toLowerCase());
        
        const requiredHeaders = ['first name', 'last name', 'email'];
        if (!requiredHeaders.every(h => headers.includes(h))) {
            return { error: `CSV must include the following headers: ${requiredHeaders.join(', ')}`, data: null };
        }

        const data = rows.slice(1).map(rowStr => {
            if (!rowStr.trim()) return null;
            const rowValues = rowStr.split(',');
            const rowObject: { [key: string]: string } = {};
            headers.forEach((header, index) => {
                rowObject[header] = rowValues[index]?.trim();
            });
            return rowObject;
        }).filter(Boolean);

        const nameHeader = headers.find(h => h.includes('name'));

        const cleanedData = data.map(row => {
            const newRow = { ...row };
            
            // Capitalize names
            if (newRow['first name']) newRow['first name'] = capitalize(newRow['first name']);
            if (newRow['last name']) newRow['last name'] = capitalize(newRow['last name']);
            
            // Split full name if necessary
            if (nameHeader && !newRow['first name'] && !newRow['last name']) {
                const nameParts = newRow[nameHeader].split(' ');
                newRow['first name'] = capitalize(nameParts[0]);
                newRow['last name'] = capitalize(nameParts.slice(1).join(' '));
            }

            // Format phone numbers
            const phoneHeader = headers.find(h => h.includes('phone'));
            if (phoneHeader && newRow[phoneHeader]) {
                newRow[phoneHeader] = formatPhoneNumber(newRow[phoneHeader]);
            }
            
            return newRow;
        });

        return { data: { headers, rows: cleanedData }, error: null };

    } catch (error) {
        console.error('Error cleaning CSV:', error);
        return {
            error: 'Failed to clean CSV. Please check the file format and try again.',
            data: null,
        };
    }
}

const headlineAnalyzerSchema = z.object({
  headline: z.string().min(1, { message: 'Headline cannot be empty.' }),
});

const powerWords = [
    'amazing', 'awesome', 'best', 'brilliant', 'certified', 'discover', 'effective', 'essential', 'exclusive',
    'expert', 'free', 'guaranteed', 'incredible', 'instant', 'limited', 'new', 'now', 'proven', 'powerful',
    'revolutionary', 'secret', 'shocking', 'simple', 'step-by-step', 'successful', 'ultimate', 'unique', 'unleash'
];
const positiveWords = ['happy', 'joy', 'love', 'excellent', 'good', 'great', 'fantastic', 'wonderful', 'pleasure', 'superb'];
const negativeWords = ['sad', 'bad', 'terrible', 'horrible', 'awful', 'pain', 'fear', 'hate', 'problem', 'danger'];

export async function analyzeHeadlineAction(values: z.infer<typeof headlineAnalyzerSchema>) {
    try {
        const validatedFields = headlineAnalyzerSchema.safeParse(values);
        if (!validatedFields.success) {
            return { error: 'Invalid input.', data: null };
        }

        const { headline } = validatedFields.data;
        const words = headline.toLowerCase().split(/\s+/);
        const wordCount = words.length;

        // 1. Length Score (Optimal 6-12 words)
        let lengthScore = 0;
        if (wordCount >= 6 && wordCount <= 12) {
            lengthScore = 100;
        } else if (wordCount > 0) {
            const deviation = wordCount < 6 ? 6 - wordCount : wordCount - 12;
            lengthScore = Math.max(0, 100 - deviation * 15);
        }

        // 2. Sentiment Score
        let sentimentScore = 50; // Start neutral
        const positiveCount = words.filter(word => positiveWords.includes(word.replace(/[^a-z]/g, ''))).length;
        const negativeCount = words.filter(word => negativeWords.includes(word.replace(/[^a-z]/g, ''))).length;
        if (positiveCount > negativeCount) {
            sentimentScore = Math.min(100, 50 + positiveCount * 20);
        } else if (negativeCount > 0) {
            sentimentScore = Math.max(0, 50 - negativeCount * 20);
        }

        // 3. Power Word Score
        const powerWordCount = words.filter(word => powerWords.includes(word.replace(/[^a-z]/g, ''))).length;
        const powerWordScore = Math.min(100, powerWordCount * 25);

        // 4. Clarity (Heuristic: shorter words are clearer)
        const avgWordLength = words.reduce((acc, word) => acc + word.length, 0) / wordCount;
        const clarityScore = Math.max(0, 100 - (avgWordLength - 5) * 10);

        const totalScore = Math.round((lengthScore + sentimentScore + powerWordScore + clarityScore) / 4);

        return {
            data: {
                totalScore,
                length: { score: Math.round(lengthScore), count: wordCount },
                sentiment: { score: Math.round(sentimentScore), type: positiveCount > negativeCount ? 'Positive' : negativeCount > 0 ? 'Negative' : 'Neutral' },
                powerWords: { score: Math.round(powerWordScore), count: powerWordCount, words: words.filter(word => powerWords.includes(word.replace(/[^a-z]/g, ''))) },
                clarity: { score: Math.round(clarityScore) }
            },
            error: null
        };

    } catch (error) {
        console.error('Error analyzing headline:', error);
        return {
            error: 'Failed to analyze headline. Please try again.',
            data: null,
        };
    }
}
