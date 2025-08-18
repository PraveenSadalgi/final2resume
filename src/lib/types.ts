
import { z } from 'zod';

export interface WorkProject {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  projects?: WorkProject[];
}

export interface Education {
  id:string;
  school: string;
  degree: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface CoverLetterData {
  jobDescription: string;
  tone: 'Professional' | 'Creative' | 'Enthusiastic';
  generatedLetter: string;
}

export interface CoverLetterTemplate {
    id: string;
    name: string;
    description: string;
    prompt: string;
    component: string;
}

export type Template = 'one-column' | 'two-column' | 'modern' | 'creative' | 'minimalist' | 'technical' | 'executive';

export interface ResumeData {
  template: Template;
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

// AI Flow Types

export const GenerateCoverLetterInputSchema = z.object({
  resumeData: z
    .string()
    .describe('The user\'s resume data in JSON format.'),
  jobDescription: z.string().describe('The job description the user is applying for.'),
  tone: z.string().describe('The desired tone of the cover letter (e.g., Professional, Creative, Enthusiastic).'),
  template: z.string().describe('The prompt for the selected cover letter template.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

export const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export const GenerateExperienceInputSchema = z.object({
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

export const GenerateExperienceOutputSchema = z.object({
  experiences: z
    .string()
    .describe(
      'Tailored experiences and bullet points for the resume, optimized for the specified profession and role.'
    ),
});
export type GenerateExperienceOutput = z.infer<typeof GenerateExperienceOutputSchema>;


export const GenerateProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectDescription: z
    .string()
    .describe('The user-provided description of the project.'),
});
export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

export const GenerateProjectDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A generated, attractive description of the project.'),
});
export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

export const GenerateProfessionalSummaryInputSchema = z.object({
  profession: z.string().describe('The profession of the user.'),
  summary: z.string().describe('The user\'s existing professional summary to be improved.'),
});
export type GenerateProfessionalSummaryInput = z.infer<typeof GenerateProfessionalSummaryInputSchema>;

export const GenerateProfessionalSummaryOutputSchema = z.object({
  summary: z.string().describe('An improved and professional summary for the resume.'),
});
export type GenerateProfessionalSummaryOutput = z.infer<typeof GenerateProfessionalSummaryOutputSchema>;

export const GenerateWorkProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  role: z.string().describe('The user\'s role in the project.'),
  projectDescription: z
    .string()
    .describe('The user-provided description of the project.'),
});
export type GenerateWorkProjectDescriptionInput = z.infer<typeof GenerateWorkProjectDescriptionInputSchema>;

export const GenerateWorkProjectDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A generated, attractive description of the project for a work experience entry.'),
});
export type GenerateWorkProjectDescriptionOutput = z.infer<typeof GenerateWorkProjectDescriptionOutputSchema>;


export const SuggestRelevantSkillsInputSchema = z.object({
  profession: z.string().describe('The profession of the user.'),
  chosenRoles: z.string().describe('The chosen roles or job titles the user is applying for.'),
});
export type SuggestRelevantSkillsInput = z.infer<typeof SuggestRelevantSkillsInputSchema>;

export const SuggestRelevantSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('An array of relevant skills for the resume.'),
});
export type SuggestRelevantSkillsOutput = z.infer<typeof SuggestRelevantSkillsOutputSchema>;
