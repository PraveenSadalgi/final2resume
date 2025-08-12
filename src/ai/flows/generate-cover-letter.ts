
'use server';
/**
 * @fileOverview AI-powered cover letter generator.
 *
 * - generateCoverLetter - Generates a tailored cover letter based on resume data, a job description, and desired tone.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resumeData: z
    .string()
    .describe('The user\'s resume data in JSON format.'),
  jobDescription: z.string().describe('The job description the user is applying for.'),
  tone: z.string().describe('The desired tone of the cover letter (e.g., Professional, Creative, Enthusiastic).'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career coach and resume writer. Your task is to generate a personalized and compelling cover letter for a user based on their resume and a specific job description.

  **Instructions:**
  1.  **Analyze the Resume:** Carefully review the provided resume data to understand the user's skills, experience, accomplishments, and career trajectory.
  2.  **Analyze the Job Description:** Deconstruct the job description to identify the key requirements, responsibilities, and desired qualifications.
  3.  **Synthesize and Connect:** Write a cover letter that masterfully connects the user's qualifications from their resume to the requirements of the job description. Highlight the most relevant experiences and skills. Do not just repeat the resume; explain *how* the user's background makes them a perfect fit for the role.
  4.  **Adopt the Tone:** Adjust the language, style, and structure of the letter to match the requested tone: '{{{tone}}}'.
      *   **Professional:** Formal, concise, and focused on qualifications and experience.
      *   **Creative:** More storytelling, showcasing personality and unique problem-solving skills.
      *   **Enthusiastic:** High-energy, showing genuine passion for the company and the role.
  5.  **Structure:** The cover letter should have a clear structure: an introduction that grabs attention, a body that details the user's fit for the role with specific examples, and a conclusion with a strong call to action.

  **Input Data:**

  **User's Resume (JSON):**
  \`\`\`json
  {{{resumeData}}}
  \`\`\`

  **Job Description:**
  \`\`\`
  {{{jobDescription}}}
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
