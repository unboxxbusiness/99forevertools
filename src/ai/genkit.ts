
'use server';
/**
 * @fileoverview This file exports a singleton Genkit `ai` instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

if (!process.env.GENKIT_ENV) {
  process.env.GENKIT_ENV = 'dev';
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
