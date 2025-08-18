
'use server';
/**
 * @fileOverview Generates an attractive project description for a resume's work experience section.
 *
 * - generateWorkProjectDescription - A function that handles the project description generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateWorkProjectDescriptionInputSchema, GenerateWorkProjectDescriptionOutputSchema, type GenerateWorkProjectDescriptionInput } from '@/lib/types';

export async function generateWorkProjectDescription(input: GenerateWorkProjectDescriptionInput) {
  return generateWorkProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWorkProjectDescriptionPrompt',
  input: {schema: GenerateWorkProjectDescriptionInputSchema},
  output: {schema: GenerateWorkProjectDescriptionOutputSchema},
  prompt: `You are an expert resume writer. Based on the project name, the user's role, and the description, generate a more attractive and professional description for a resume's work experience section. Focus on highlighting the key achievements and technologies used. Keep it concise and impactful.

  Project Name: {{{projectName}}}
  Role: {{{role}}}
  Original Description: {{{projectDescription}}}

  Strictly provide an attractive description based on the provided details.
  `,
});

const generateWorkProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateWorkProjectDescriptionFlow',
    inputSchema: GenerateWorkProjectDescriptionInputSchema,
    outputSchema: GenerateWorkProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
