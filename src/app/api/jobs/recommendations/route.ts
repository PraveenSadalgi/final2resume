
import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_URL = 'https://jobicy.com/api/v2/remote-jobs';

const RequestBodySchema = z.object({
  preferences: z.object({
    keywords: z.string().min(1, 'Keywords are required for job search.'),
    count: z.number().optional(),   // how many jobs to fetch
    geo: z.string().optional(),     // region filter
    industry: z.string().optional() // industry filter
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

    // Build query string for Jobicy API
    const params = new URLSearchParams({
      count: String(preferences.count || 10),
      tag: preferences.keywords,
    });

    if (preferences.geo) params.append('geo', preferences.geo);
    if (preferences.industry) params.append('industry', preferences.industry);

    const apiUrl = `${API_URL}?${params.toString()}`;

    // Debug log
    console.log('Fetching from Jobicy:', apiUrl);

    const response = await fetch(apiUrl);
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Jobicy API error: ${text}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Debug log
    console.log('Jobicy response:', data);

    const jobs = (data.jobs || []).map((job: any, idx: number) => ({
      id: job.id || `job-${Date.now()}-${idx}`,
      title: job.jobTitle,
      company: job.companyName,
      location: job.jobGeo || 'Remote',
      description: job.jobExcerpt,
      url: job.url,
      posted_at: job.pubDate,
      salary: job.annualSalaryMin
        ? `${job.annualSalaryMin} - ${job.annualSalaryMax} ${job.salaryCurrency}`
        : 'Not disclosed',
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
