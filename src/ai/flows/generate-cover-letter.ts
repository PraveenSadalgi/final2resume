
'use server';
/**
 * @fileOverview AI-powered cover letter generator.
 *
 * - generateCoverLetter - Generates a tailored cover letter based on resume data, a job description, and desired tone.
 */

import {ai} from '@/ai/genkit';
import { GenerateCoverLetterInputSchema, GenerateCoverLetterOutputSchema, type GenerateCoverLetterInput } from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';

export async function generateCoverLetter(input: GenerateCoverLetterInput) {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  model: 'googleai/gemini-2.0-flash',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career coach and resume writer. Your task is to generate a personalized and compelling cover letter for a user based on their resume, a specific job description, and a chosen template structure.

  **Instructions:**
  1.  **Analyze the Resume:** Carefully review the provided resume data to understand the user's skills, experience, accomplishments, and career trajectory.
  2.  **Analyze the Job Description:** Deconstruct the job description to identify the key requirements, responsibilities, and desired qualifications.
  3.  **Follow the Template:** Adhere to the structure provided in the 'Cover Letter Template' section. This defines the flow and key points to include.
  4.  **Synthesize and Connect:** Write a cover letter that masterfully connects the user's qualifications from their resume to the requirements of the job description, following the chosen template. Highlight the most relevant experiences and skills. Do not just repeat the resume; explain *how* the user's background makes them a perfect fit for the role.
  5.  **Adopt the Tone:** Adjust the language and style of the letter to match the requested tone: '{{{tone}}}'.
      *   **Professional:** Formal, concise, and focused on qualifications and experience.
      *   **Creative:** More storytelling, showcasing personality and unique problem-solving skills.
      *   **Enthusiastic:** High-energy, showing genuine passion for the company and the role.
  6.  **Structure:** The final output should be a well-structured letter with an introduction, body paragraphs, and a conclusion with a strong call to action.

  **Input Data:**

  **User's Resume (JSON):**
  \`\`\`json
  {{{resumeData}}}
  \`\`\`

  **Job Description:**
  \`\`\`
  {{{jobDescription}}}
  \`\`\`
  
  **Cover Letter Template:**
  \`\`\`
  {{{template}}}
  \`\`\`

  Generate the cover letter text based on these inputs. Ensure it is well-written, professional, and tailored to the specific job application.
  `,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
