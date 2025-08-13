
import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_KEY = '738e36a228b0573aedee77bf750d25457b5e72f3e0e7641063c60cd5dbe19d21';
const API_URL = 'https://api.apijobs.dev/v1/job/search';

const RequestBodySchema = z.object({
    resumeData: z.any().optional(),
    preferences: z.object({
        keywords: z.string().min(1, 'Keywords are required for job search.'),
        location: z.string().optional(),
    }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = RequestBodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.flatten() }, { status: 400 });
    }
    
    const { preferences } = validation.data;
    
    const apiRequestBody: { q: string; l?: string } = {
        q: preferences.keywords
    };

    if (preferences.location && preferences.location.trim() !== '') {
        apiRequestBody.l = preferences.location;
    }
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': API_KEY,
        },
        body: JSON.stringify(apiRequestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch jobs from external API' }, { status: response.status });
    }

    const data = await response.json();

    // Normalize the data for the frontend
    const jobs = data.jobs.map((job: any, index: number) => ({
      id: job.id || `job-${Date.now()}-${index}`, // The API doesn't seem to provide a stable ID, so we generate one.
      title: job.title,
      company: job.company?.name || 'N/A',
      location: job.location ? [job.location.city, job.location.country].filter(Boolean).join(', ') : 'N/A',
      description: job.description,
      url: job.url || '#',
      posted_at: job.posted_date || 'N/A',
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
