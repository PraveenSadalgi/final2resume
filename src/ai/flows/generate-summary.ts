
'use server';
/**
 * @fileOverview AI-powered professional summary generator for resumes.
 *
 * - generateProfessionalSummary - Generates a tailored professional summary based on the user's profession.
 */

import {ai} from '@/ai/genkit';
import { GenerateProfessionalSummaryInputSchema, GenerateProfessionalSummaryOutputSchema, type GenerateProfessionalSummaryInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';

export async function generateProfessionalSummary(input: GenerateProfessionalSummaryInput) {
  return generateProfessionalSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalSummaryPrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: GenerateProfessionalSummaryInputSchema},
  output: {schema: GenerateProfessionalSummaryOutputSchema},
  prompt: `You are an expert resume writer. Rephrase and improve the following professional summary to make it more impactful and professional. If the summary is empty, generate a new one based on the user's profession.

  Profession: {{{profession}}}
  Existing Summary: {{{summary}}}

  The summary should be concise and highlight key skills and experiences. Aim for a summary that is approximately 3-4 sentences long.`,
});

const generateProfessionalSummaryFlow = ai.defineFlow(
  {
    name: 'generateProfessionalSummaryFlow',
    inputSchema: GenerateProfessionalSummaryInputSchema,
    outputSchema: GenerateProfessionalSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
