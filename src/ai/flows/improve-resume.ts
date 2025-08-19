
'use server';
/**
 * @fileOverview AI-powered resume improvement suggestions.
 *
 * - improveResume - Analyzes a resume and provides suggestions for improvement.
 */

import {ai} from '@/ai/genkit';
import { ImproveResumeInputSchema, ImproveResumeOutputSchema, type ImproveResumeInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';

export async function improveResume(input: ImproveResumeInput) {
  return improveResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResumePrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: ImproveResumeInputSchema},
  output: {schema: ImproveResumeOutputSchema},
  prompt: `You are an expert resume writer and career coach. Your task is to analyze the provided resume data and generate specific, actionable improvements for each section.

  **Instructions:**
  1.  **Review Each Section:** Go through the summary, each experience entry, each project, and the skills list.
  2.  **Provide Constructive Feedback:** For each section, provide clear and concise suggestions.
      *   **Summary:** Rewrite the summary to be more impactful. Make it a strong, concise pitch.
      *   **Experience:** For each experience entry, rewrite the description. Convert paragraphs into powerful, achievement-oriented bullet points. Start each bullet point with a strong action verb. Quantify achievements with metrics where possible (e.g., "Increased sales by 20%").
      *   **Projects:** Rewrite the project descriptions to be more results-focused. Highlight the technologies used and the key outcomes.
      *   **Skills:** Suggest 3-5 additional relevant skills based on the user's profession and experience. Do not repeat existing skills.
  3.  **Maintain Professional Tone:** All suggestions should be professional and suitable for a job application.
  4.  **Format Output:** Return the suggestions in the specified JSON format. If a section has no suggested improvements, return the original text.

  **Resume Data (JSON):**
  \`\`\`json
  {{{resumeData}}}
  \`\`\`

  Generate the improved resume content.
  `,
});

const improveResumeFlow = ai.defineFlow(
  {
    name: 'improveResumeFlow',
    inputSchema: ImproveResumeInputSchema,
    outputSchema: ImproveResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
