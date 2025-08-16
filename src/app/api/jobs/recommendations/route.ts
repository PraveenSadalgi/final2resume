
import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_KEY = 'bffb377124msh112b4f93a104b76p17117bjsnbacec6472843';
const API_URL = 'https://active-jobs-db.p.rapidapi.com/search';
const API_HOST = 'active-jobs-db.p.rapidapi.com';

const RequestBodySchema = z.object({
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
    
    const searchParams = new URLSearchParams({
        query: preferences.keywords,
        location: preferences.location || 'United States',
        limit: '20'
    });

    const response = await fetch(`${API_URL}?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `API Error: ${response.statusText}` }));
      console.error('API Error:', errorData);
      return NextResponse.json({ error: errorData.message || 'Failed to fetch jobs from external API' }, { status: response.status });
    }

    const data = await response.json();

    if (data.status !== 'OK') {
        return NextResponse.json({ error: 'Failed to fetch jobs: API returned an error.' }, { status: 500 });
    }

    const jobs = data.data.map((job: any, index: number) => ({
      id: job.job_id || `job-${Date.now()}-${index}`,
      title: job.job_title,
      company: job.employer_name || 'N/A',
      location: [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ') || 'N/A',
      description: job.job_description,
      url: job.job_apply_link || '#',
      posted_at: new Date(job.job_posted_at_timestamp * 1000).toLocaleDateString(),
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
