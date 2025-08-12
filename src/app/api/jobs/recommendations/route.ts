
import { NextResponse } from 'next/server';
import type { ResumeData } from '@/lib/types';
import { z } from 'zod';

const API_KEY = '5a95420550040c1608d253e5dbb5cff8244608e3d0fd9b0b448b993111f6b8f2';
const API_URL = 'https://app.apijobs.dev/api/jobs/search';

const JobPreferencesSchema = z.object({
    keywords: z.string(),
    location: z.string().optional(),
});

const RequestBodySchema = z.object({
    resumeData: z.any().optional(),
    preferences: JobPreferencesSchema,
});


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = RequestBodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.flatten() }, { status: 400 });
    }
    
    const { resumeData, preferences } = validation.data;
    
    // In a real app, we'd do more sophisticated keyword extraction from resumeData
    const keywords = preferences.keywords;

    if (!keywords) {
      return NextResponse.json({ error: 'Keywords are required for job search.' }, { status: 400 });
    }

    const apiParams = new URLSearchParams({
      q: keywords,
      'api-key': API_KEY,
    });

    if (preferences.location) {
      apiParams.append('l', preferences.location);
    }
    
    const response = await fetch(`${API_URL}?${apiParams.toString()}`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch jobs from external API' }, { status: response.status });
    }

    const data = await response.json();

    // Normalize the data for the frontend
    const jobs = data.jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company.name,
      location: job.location,
      description: job.description,
      url: job.url,
      posted_at: job.posted_at,
    }));
    
    return NextResponse.json({ jobs });

  } catch (error) {
    console.error('Server Error:', error);
    if (error instanceof z.ZodError) {
        return NextResponse.json({ error: 'Invalid request body', details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
