
'use server';
/**
 * @fileOverview Generates tailored experiences and bullet points for a resume based on profession and role.
 *
 * - generateExperience - A function that handles the experience generation process.
 */

import {ai} from '@/ai/genkit';
import { GenerateExperienceInputSchema, GenerateExperienceOutputSchema, type GenerateExperienceInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';


export async function generateExperience(input: GenerateExperienceInput) {
  return generateExperienceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExperiencePrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: {schema: GenerateExperienceInputSchema},
  output: {schema: GenerateExperienceOutputSchema},
  prompt: `You are an expert resume writer. Your task is to rewrite and enhance the provided resume experience description to be more professional, achievement-oriented, and impactful. Use strong action verbs and quantify results where possible.

  Also provide a brief explanation of the key changes you made and why, such as noting the addition of stronger verbs, quantifying results, or improving clarity.

  User's Profession: {{{profession}}}
  User's Role: {{{role}}}
  Existing Experience Description:
  \`\`\`
  {{{desiredExperience}}}
  \`\`\`

  Generate a new, improved description and an explanation for the changes. Focus on clarity, conciseness, and showcasing value.`,
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
