// src/ai/flows/suggest-skills.ts
'use server';
/**
 * @fileOverview A skill suggestion AI agent.
 *
 * - suggestRelevantSkills - A function that suggests relevant skills for a resume.
 */

import {ai} from '@/ai/genkit';
import { SuggestRelevantSkillsInputSchema, SuggestRelevantSkillsOutputSchema, type SuggestRelevantSkillsInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';

export async function suggestRelevantSkills(input: SuggestRelevantSkillsInput) {
  return suggestRelevantSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantSkillsPrompt',
  model: googleAI.model('gemini-2.0-flash'),
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
