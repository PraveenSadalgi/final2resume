
"use client";

import { useEffect, useState } from "react";
import ResumePreview from "@/components/resume-preview";
import type { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PreviewPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("resumeDataForPreview");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setResumeData(parsedData);
        // Automatically trigger print once data is loaded
        setTimeout(() => window.print(), 500);
      } catch (error) {
        console.error("Failed to parse resume data from localStorage", error);
        setResumeData(null);
      }
    }
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading Preview...
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Could not load resume data for preview.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-4 right-4 no-print">
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print / Save PDF
        </Button>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[8.5in] aspect-[8.5/11]">
            <ResumePreview resumeData={resumeData} isPrintMode={true} />
        </div>
      </div>
    </div>
  );
}
