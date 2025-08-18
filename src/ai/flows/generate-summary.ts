
'use server';
/**
 * @fileOverview AI-powered professional summary generator for resumes.
 *
 * - generateProfessionalSummary - Generates a tailored professional summary based on the user's profession.
 */

import {ai} from '@/ai/genkit';
import { GenerateProfessionalSummaryInputSchema, GenerateProfessionalSummaryOutputSchema, type GenerateProfessionalSummaryInput } from '@/lib/types';

export async function generateProfessionalSummary(input: GenerateProfessionalSummaryInput) {
  return generateProfessionalSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalSummaryPrompt',
  input: {schema: GenerateProfessionalSummaryInputSchema},
  output: {schema: GenerateProfessionalSummaryOutputSchema},
  prompt: `You are an expert resume writer. Generate a professional summary for a resume based on the following profession: {{{profession}}}. The summary should be concise and highlight key skills and experiences. Aim for a summary that is approximately 3-4 sentences long.`,
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
