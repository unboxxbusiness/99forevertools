
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { genkitEval } from 'genkitx-eval';

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
    genkitEval(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
