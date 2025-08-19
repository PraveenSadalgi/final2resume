
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/lib/types";
import { Search, Briefcase, MapPin, Building, Calendar, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  posted_at: string;
}

export default function JobRecommendationsPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [preferences, setPreferences] = useState({
    keywords: "",
    location: "",
  });
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("resumeDataForJobs");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setResumeData(parsedData);
        // Pre-fill keywords from resume
        const initialKeywords = [
          parsedData.experience?.[0]?.role,
          ...parsedData.skills.slice(0, 2)
        ].filter(Boolean).join(', ');
        setPreferences(prev => ({ ...prev, keywords: initialKeywords, location: parsedData.location || "" }));
      } catch (error) {
        console.error("Failed to parse resume data from localStorage", error);
        setResumeData(null);
      }
    }
  }, []);

  const handlePreferenceChange = (
    field: keyof typeof preferences,
    value: string
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const fetchJobs = async () => {
    if (!preferences.keywords) {
        toast({
            title: "Keywords required",
            description: "Please enter a job title or keywords to search.",
            variant: "destructive"
        });
        return;
    }
    setLoading(true);
    setJobs(null);
    try {
      const response = await fetch("/api/jobs/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: {
            ...preferences,
            geo: preferences.location
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred" }));
        throw new Error(errorData.error || `Request failed with status: ${response.statusText}`);
      }

      const data = await response.json();
      setJobs(data.jobs);
    } catch (error: any) {
      console.error("Error fetching job recommendations:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch job recommendations.",
        variant: "destructive",
      });
      setJobs([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
            <span className="text-lg">{job.title}</span>
             <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0" disabled={!job.url || job.url === '#'}>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                </a>
            </Button>
        </CardTitle>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-2">
                <Building className="h-3.5 w-3.5" />
                <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{job.location}</span>
            </div>
             <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Posted: {job.posted_at}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4" dangerouslySetInnerHTML={{ __html: job.description }}></p>
      </CardContent>
    </Card>
  );

  if (!isClient) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-69px)] bg-background">
      <main className="flex-1 overflow-y-auto">
         <div className="bg-card border-b p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-1">Job Recommendations</h1>
              <p className="text-muted-foreground mb-6">Find your next role based on your resume and preferences.</p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="keywords">Job Title / Keywords</Label>
                  <Input
                    id="keywords"
                    value={preferences.keywords}
                    onChange={(e) => handlePreferenceChange("keywords", e.target.value)}
                    placeholder="e.g., Software Engineer, React"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={preferences.location}
                    onChange={(e) => handlePreferenceChange("location", e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <Button onClick={fetchJobs} disabled={loading} className="w-full md:w-auto">
                  {loading ? (
                    <LoadingSpinner className="mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  Find Jobs
                </Button>
              </div>
            </div>
         </div>

         <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <LoadingSpinner className="h-8 w-8" />
                    </div>
                )}

                {!loading && jobs && jobs.length > 0 && (
                    <div className="space-y-4">
                        {jobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                )}
                
                {!loading && jobs && jobs.length === 0 && (
                     <div className="text-center py-20">
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h2 className="mt-4 text-xl font-semibold">No jobs found</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search criteria to find job recommendations.</p>
                    </div>
                )}

                {!loading && jobs === null && (
                    <div className="text-center py-20">
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h2 className="mt-4 text-xl font-semibold">Find your next opportunity</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Enter your preferences above and click "Find Jobs" to start.</p>
                    </div>
                )}
            </div>
         </div>
      </main>
    </div>
  );
}
