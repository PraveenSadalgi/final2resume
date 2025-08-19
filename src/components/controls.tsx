
"use client";

import { Button } from "./ui/button";
import {
  Download,
  Share2,
} from "lucide-react";
import type { ResumeData } from "@/lib/types";
import Link from "next/link";

interface ControlsProps {
  resumeData: ResumeData;
}

export default function Controls({ resumeData }: ControlsProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeDataForPreview", JSON.stringify(resumeData));
      const url = new URL("/preview", window.location.origin);
      window.open(url.toString(), "_blank");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeDataForPreview", JSON.stringify(resumeData));
      const url = new URL("/preview", window.location.origin);
      window.open(url.toString(), "_blank");
    }
  };

  return (
    <div className="p-4 bg-card border-b">
      <div className="flex flex-wrap items-center justify-between gap-2">
         <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Resume Editor</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/templates">
                Templates
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
           <Button onClick={handlePrint}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
        </div>
      </div>
    </div>
  );
}
