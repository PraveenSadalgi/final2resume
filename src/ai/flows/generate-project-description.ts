
'use server';
/**
 * @fileOverview Generates an attractive project description for a resume.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateProjectDescriptionInputSchema, GenerateProjectDescriptionOutputSchema, type GenerateProjectDescriptionInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';

export async function generateProjectDescription(input: GenerateProjectDescriptionInput) {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  model: googleAI.model('gemini-pro'),
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an expert resume writer. Based on the project name and description, generate a more attractive and professional description for a resume. Focus on highlighting the key achievements and technologies used. Keep it concise and impactful.

  Also provide a brief explanation of why the new version is more effective (e.g., "Used stronger verbs, focused on outcomes").

  Project Name: {{{projectName}}}
  Original Description: {{{projectDescription}}}

  Strictly provide an attractive description and a brief explanation for the changes.
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
