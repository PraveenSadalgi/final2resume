
'use server';
/**
 * @fileOverview AI-powered resume parser and improver.
 *
 * - parseResume - Parses an uploaded resume, improves its content, and returns structured data.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'zod';
import type {ResumeData} from '@/lib/types';
import {classicTemplate} from '@/lib/mock-data';

// Define the structured output we want from the AI.
const ParsedResumeOutputSchema = z.object({
  name: z.string().describe('The full name of the individual.'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  location: z.string().describe('The city and state, e.g., "San Francisco, CA".'),
  github: z.string().optional().describe('The GitHub profile URL.'),
  linkedin: z.string().optional().describe('The LinkedIn profile URL.'),
  summary: z
    .string()
    .describe('An improved, professional summary based on the resume content.'),
  experience: z
    .array(
      z.object({
        id: z.string(),
        role: z.string().describe('The job title or role.'),
        company: z.string().describe('The name of the company.'),
        date: z.string().describe('The employment dates, e.g., "Jan 2021 - Present".'),
        description: z
          .string()
          .describe(
            'An improved, bulleted list of responsibilities and achievements, starting each line with "•".'
          ),
      })
    )
    .describe('The professional work experience.'),
  education: z
    .array(
      z.object({
        id: z.string(),
        school: z.string().describe('The name of the school or university.'),
        degree: z.string().describe('The degree or certification obtained.'),
        date: z.string().describe('The dates of attendance, e.g., "2014 - 2018".'),
      })
    )
    .describe('The educational background.'),
  skills: z
    .array(z.string())
    .describe(
      'A list of relevant technical and professional skills, including suggested skills.'
    ),
  projects: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().describe('The name of the personal project.'),
        description: z
          .string()
          .describe(
            'An improved, concise description of the project and its outcomes.'
          ),
      })
    )
    .describe('A list of personal or academic projects.'),
  achievements: z.array(z.string()).optional().describe('A list of key achievements, awards, or other sections, rewritten to be concise and impactful.'),
});

// Define the input for our flow
const ParseResumeInputSchema = z.object({
  resumeFile: z
    .string()
    .describe(
      "The user's resume file as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type ParseResumeInput = z.infer<typeof ParseResumeInputSchema>;

export async function parseResume(input: ParseResumeInput): Promise<ResumeData> {
  const structuredData = await parseResumeFlow(input);
  
  // Combine the AI-parsed data with a default template structure.
  return {
    ...classicTemplate, // Use a base template for any missing fields
    ...structuredData,
  };
}

const prompt = ai.definePrompt({
  name: 'parseResumePrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: ParseResumeInputSchema},
  output: {schema: ParsedResumeOutputSchema},
  prompt: `You are an expert resume analyst and writer. Your task is to parse the provided resume file, extract all structured information, and simultaneously improve the content of every section. Do not discard any sections.

  **Instructions:**
  1.  **Parse ALL Sections:** Analyze the resume file. Extract every section you find, including standard sections (Contact Info, Summary, Experience, etc.) and any other sections like "Awards", "Publications", "Certifications", or "Achievements".
  2.  **Extract Structured Data:** Identify and extract the following:
      *   Contact Information (name, email, phone, location, GitHub, LinkedIn).
      *   Professional Summary.
      *   Work Experience (role, company, dates, description).
      *   Education (school, degree, dates).
      *   Skills.
      *   Personal Projects.
      *   **Achievements / Other Sections**: Group any additional sections like "Awards", "Honors", "Publications", or "Certifications" into the 'achievements' field. Extract the content from these sections.
  3.  **Improve ALL Content:** As you extract the data, improve it.
      *   **Summary:** Rewrite the professional summary to be more concise and impactful.
      *   **Experience:** Rephrase experience descriptions into strong, achievement-oriented bullet points. Start each bullet with an action verb.
      *   **Projects:** Make project descriptions more professional and results-focused.
      *   **Skills:** Extract all listed skills and suggest 3-5 additional relevant skills based on the content.
      *   **Achievements/Other:** For any other section found, rewrite each point to be a crisp, short, and effective sentence. Do not remove them.
  4.  **Assign IDs:** For each entry in experience, education, and projects, generate a unique string ID (e.g., "exp1", "edu1").
  5.  **Format Output:** Return all extracted and improved data in the specified JSON format. If a section is not found, return an empty string or an empty array for that field, but ensure all information from the original resume is captured and improved in some field.

  **Resume File:**
  {{media url=resumeFile}}
  `,
});

const parseResumeFlow = ai.defineFlow(
  {
    name: 'parseResumeFlow',
    inputSchema: ParseResumeInputSchema,
    outputSchema: ParsedResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
