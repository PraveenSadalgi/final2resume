
"use client";

import { FileText, LayoutTemplate, MailCheck, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import type { ResumeData } from "@/lib/types";

interface HeaderProps {
  resumeData?: ResumeData;
}

export function Header({ resumeData }: HeaderProps) {
  const handleCoverLetterClick = () => {
    if (typeof window !== "undefined" && resumeData) {
      localStorage.setItem("resumeDataForCoverLetter", JSON.stringify(resumeData));
    }
  };

  const handleJobSearchClick = () => {
    if (typeof window !== "undefined" && resumeData) {
      localStorage.setItem("resumeDataForJobs", JSON.stringify(resumeData));
    }
  };

  return (
    <header className="no-print bg-card border-b p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">ResuAI</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
           <Button asChild variant="outline">
            <Link href="/templates">
              <LayoutTemplate className="h-4 w-4 mr-2" />
              Templates
            </Link>
          </Button>

          <Button asChild variant="outline" onClick={handleCoverLetterClick}>
            <Link href="/cover-letter">
              <MailCheck className="h-4 w-4 mr-2" />
              Cover Letter
            </Link>
          </Button>

          <Button asChild variant="default" onClick={handleJobSearchClick}>
            <Link href="/job-recommendations">
              <Briefcase className="h-4 w-4 mr-2" />
              Find Jobs
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
