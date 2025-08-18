
'use server';
/**
 * @fileOverview Generates tailored experiences and bullet points for a resume based on profession and role.
 *
 * - generateExperience - A function that handles the experience generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateExperienceInputSchema, GenerateExperienceOutputSchema, type GenerateExperienceInput } from '@/lib/types';


export async function generateExperience(input: GenerateExperienceInput) {
  return generateExperienceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExperiencePrompt',
  input: {schema: GenerateExperienceInputSchema},
  output: {schema: GenerateExperienceOutputSchema},
  prompt: `You are an expert resume writer, specializing in tailoring experiences to specific roles and professions.

  Based on the user's profession: {{{profession}}}, and the role they are applying for: {{{role}}},
  generate tailored experiences and bullet points for their resume.

  Consider these existing experiences if the user is trying to improve them: {{{desiredExperience}}}

  Focus on showcasing relevant skills and accomplishments effectively.
  Return a set of experiences with bullet points. Be concise and professional.
  `,
});

const generateExperienceFlow = ai.defineFlow(
  {
    name: 'generateExperienceFlow',
    inputSchema: GenerateExperienceInputSchema,
    outputSchema: GenerateExperienceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
