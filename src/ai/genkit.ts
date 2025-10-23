
'use server';
/**
 * @fileoverview This file exports a singleton Genkit `ai` instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { firebase } from '@genkit-ai/firebase';

if (!process.env.GENKIT_ENV) {
  process.env.GENKIT_ENV = 'dev';
}

export const ai = genkit({
  plugins: [
    firebase(),
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
