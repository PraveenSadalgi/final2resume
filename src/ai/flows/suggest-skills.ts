// src/ai/flows/suggest-skills.ts
'use server';
/**
 * @fileOverview A skill suggestion AI agent.
 *
 * - suggestRelevantSkills - A function that suggests relevant skills for a resume.
 * - SuggestRelevantSkillsInput - The input type for the suggestRelevantSkills function.
 * - SuggestRelevantSkillsOutput - The return type for the suggestRelevantSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantSkillsInputSchema = z.object({
  profession: z.string().describe('The profession of the user.'),
  chosenRoles: z.string().describe('The chosen roles or job titles the user is applying for.'),
});
export type SuggestRelevantSkillsInput = z.infer<typeof SuggestRelevantSkillsInputSchema>;

const SuggestRelevantSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('An array of relevant skills for the resume.'),
});
export type SuggestRelevantSkillsOutput = z.infer<typeof SuggestRelevantSkillsOutputSchema>;

export async function suggestRelevantSkills(input: SuggestRelevantSkillsInput): Promise<SuggestRelevantSkillsOutput> {
  return suggestRelevantSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantSkillsPrompt',
  input: {schema: SuggestRelevantSkillsInputSchema},
  output: {schema: SuggestRelevantSkillsOutputSchema},
  prompt: `You are an AI resume assistant that suggests relevant skills based on the user's profession and chosen roles.

  Profession: {{{profession}}}
  Chosen Roles: {{{chosenRoles}}}

  Suggest a list of skills that would be relevant for this user's resume, making sure to not make up any skills.
  Return the skills as a JSON array of strings.
  Example: ["Skill 1", "Skill 2", "Skill 3"]
  `,
});

const suggestRelevantSkillsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantSkillsFlow',
    inputSchema: SuggestRelevantSkillsInputSchema,
    outputSchema: SuggestRelevantSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
