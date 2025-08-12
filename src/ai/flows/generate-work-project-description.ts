
'use server';
/**
 * @fileOverview Generates an attractive project description for a resume's work experience section.
 *
 * - generateWorkProjectDescription - A function that handles the project description generation process.
 * - GenerateWorkProjectDescriptionInput - The input type for the generateWorkProjectDescription function.
 * - GenerateWorkProjectDescriptionOutput - The return type for the generateWorkProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorkProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  role: z.string().describe('The user\'s role in the project.'),
  projectDescription: z
    .string()
    .describe('The user-provided description of the project.'),
});
export type GenerateWorkProjectDescriptionInput = z.infer<typeof GenerateWorkProjectDescriptionInputSchema>;

const GenerateWorkProjectDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A generated, attractive description of the project for a work experience entry.'),
});
export type GenerateWorkProjectDescriptionOutput = z.infer<typeof GenerateWorkProjectDescriptionOutputSchema>;

export async function generateWorkProjectDescription(input: GenerateWorkProjectDescriptionInput): Promise<GenerateWorkProjectDescriptionOutput> {
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

    