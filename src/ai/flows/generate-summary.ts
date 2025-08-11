'use server';
/**
 * @fileOverview AI-powered professional summary generator for resumes.
 *
 * - generateProfessionalSummary - Generates a tailored professional summary based on the user's profession.
 * - GenerateProfessionalSummaryInput - The input type for the generateProfessionalSummary function.
 * - GenerateProfessionalSummaryOutput - The return type for the generateProfessionalSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfessionalSummaryInputSchema = z.object({
  profession: z.string().describe('The profession of the user.'),
});
export type GenerateProfessionalSummaryInput = z.infer<typeof GenerateProfessionalSummaryInputSchema>;

const GenerateProfessionalSummaryOutputSchema = z.object({
  summary: z.string().describe('A professional summary for the resume.'),
});
export type GenerateProfessionalSummaryOutput = z.infer<typeof GenerateProfessionalSummaryOutputSchema>;

export async function generateProfessionalSummary(input: GenerateProfessionalSummaryInput): Promise<GenerateProfessionalSummaryOutput> {
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
