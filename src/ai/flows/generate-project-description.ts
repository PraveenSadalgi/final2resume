
'use server';
/**
 * @fileOverview Generates an attractive project description for a resume.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateProjectDescriptionInputSchema, GenerateProjectDescriptionOutputSchema, type GenerateProjectDescriptionInput } from '@/lib/types';

export async function generateProjectDescription(input: GenerateProjectDescriptionInput) {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an expert resume writer. Based on the project name and description, generate a more attractive and professional description for a resume. Focus on highlighting the key achievements and technologies used. Keep it concise and impactful.

  Project Name: {{{projectName}}}
  Original Description: {{{projectDescription}}}

  Strictly provide an attractive description based on the project description.
  `,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
