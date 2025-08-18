
'use server';
/**
 * @fileOverview AI-powered speech-to-text and information extraction for resumes.
 *
 * - speechToResume - Transcribes audio and extracts resume information.
 */

import {ai} from '@/ai/genkit';
import {
  SpeechToCoverLetterInputSchema,
  SpeechToCoverLetterOutputSchema,
  SpeechToPersonalDetailsInputSchema,
  SpeechToPersonalDetailsOutputSchema,
  SpeechToSummaryInputSchema,
  SpeechToSummaryOutputSchema,
  type SpeechToCoverLetterInput,
  type SpeechToPersonalDetailsInput,
  type SpeechToSummaryInput,
} from '@/lib/types';
import {googleAI} from '@genkit-ai/googleai';
import wav from 'wav';
import {z} from 'zod';

const SpeechInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A recording of the user's speech, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:audio/wav;base64,<encoded_data>'."
    ),
});

// Personal Details Flow
export async function speechToPersonalDetails(
  input: SpeechToPersonalDetailsInput
) {
  return speechToPersonalDetailsFlow(input);
}

const personalDetailsPrompt = ai.definePrompt({
  name: 'speechToPersonalDetailsPrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: SpeechInputSchema},
  output: {schema: SpeechToPersonalDetailsOutputSchema},
  prompt: `You are a resume assistant. A user has provided an audio recording containing their personal information. Your task is to transcribe the audio and extract the following fields: name, email, phone, location, GitHub URL, and LinkedIn URL.

  Audio Transcription:
  {{media url=audioDataUri}}

  Extract the information and return it in the specified JSON format. If a field is not mentioned, leave it as an empty string.
  `,
});

const speechToPersonalDetailsFlow = ai.defineFlow(
  {
    name: 'speechToPersonalDetailsFlow',
    inputSchema: SpeechToPersonalDetailsInputSchema,
    outputSchema: SpeechToPersonalDetailsOutputSchema,
  },
  async input => {
    const {output} = await personalDetailsPrompt(input);
    return output!;
  }
);

// Summary Flow
export async function speechToSummary(input: SpeechToSummaryInput) {
  return speechToSummaryFlow(input);
}

const summaryPrompt = ai.definePrompt({
  name: 'speechToSummaryPrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: SpeechInputSchema},
  output: {schema: SpeechToSummaryOutputSchema},
  prompt: `You are a resume assistant. A user has provided an audio recording of their professional summary. Your task is to transcribe the audio and return the summary as a single string.

  Audio Transcription:
  {{media url=audioDataUri}}

  Return the transcribed summary text.
  `,
});

const speechToSummaryFlow = ai.defineFlow(
  {
    name: 'speechToSummaryFlow',
    inputSchema: SpeechToSummaryInputSchema,
    outputSchema: SpeechToSummaryOutputSchema,
  },
  async input => {
    const {output} = await summaryPrompt(input);
    return output!;
  }
);

// Cover Letter Flow
export async function speechToCoverLetter(input: SpeechToCoverLetterInput) {
  return speechToCoverLetterFlow(input);
}

const coverLetterPrompt = ai.definePrompt({
  name: 'speechToCoverLetterPrompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {schema: SpeechInputSchema},
  output: {schema: SpeechToCoverLetterOutputSchema},
  prompt: `You are a helpful assistant. A user has provided an audio recording containing the job description for a cover letter they want to write. Your task is to transcribe the audio and return the job description as a single string.

  Audio Transcription:
  {{media url=audioDataUri}}

  Return the transcribed job description text.
  `,
});

const speechToCoverLetterFlow = ai.defineFlow(
  {
    name: 'speechToCoverLetterFlow',
    inputSchema: SpeechToCoverLetterInputSchema,
    outputSchema: SpeechToCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await coverLetterPrompt(input);
    return output!;
  }
);
