import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_URL = 'https://remotive.com/api/remote-jobs';

const RequestBodySchema = z.object({
  preferences: z.object({
    keywords: z.string().min(1, 'Keywords are required for job search.'),
    count: z.number().optional(),   // how many jobs to fetch
    category: z.string().optional(), // Remotive supports categories
    company: z.string().optional(),  // filter by company name
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = RequestBodySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { preferences } = validation.data;

    // Build query string for Remotive API
    const params = new URLSearchParams();

    if (preferences.keywords) params.append('search', preferences.keywords);
    if (preferences.category) params.append('category', preferences.category);
    if (preferences.company) params.append('company_name', preferences.company);
    if (preferences.count) params.append('limit', String(preferences.count));

  const apiUrl = `${API_URL}?${params.toString()}`;

    console.log('Fetching from Remotive:', apiUrl);

    const response = await fetch(apiUrl);
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Remotive API error: ${text}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log('Remotive response:', data);

    const jobs = (data.jobs || []).map((job: any, idx: number) => ({
      id: job.id || `job-${Date.now()}-${idx}`,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || 'Remote',
      description: job.description,
      url: job.url,
      posted_at: job.publication_date,
      salary: job.salary || 'Not disclosed',
      category: job.category,
      type: job.job_type,
    }));

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('Server Error:', error?.message || error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
