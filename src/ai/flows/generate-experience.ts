'use server';
/**
 * @fileOverview Generates tailored experiences and bullet points for a resume based on profession and role.
 *
 * - generateExperience - A function that handles the experience generation process.
 * - GenerateExperienceInput - The input type for the generateExperience function.
 * - GenerateExperienceOutput - The return type for the generateExperience function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExperienceInputSchema = z.object({
  profession: z
    .string()
    .describe('The profession of the user (e.g., Software Engineer).'),
  role: z.string().describe('The specific role the user is applying for.'),
  desiredExperience: z
    .string()
    .optional()
    .describe(
      'The users existing work experience they want to improve or rewrite'
    ),
});
export type GenerateExperienceInput = z.infer<typeof GenerateExperienceInputSchema>;

const GenerateExperienceOutputSchema = z.object({
  experiences: z
    .string()
    .describe(
      'Tailored experiences and bullet points for the resume, optimized for the specified profession and role.'
    ),
});
export type GenerateExperienceOutput = z.infer<typeof GenerateExperienceOutputSchema>;

export async function generateExperience(input: GenerateExperienceInput): Promise<GenerateExperienceOutput> {
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
