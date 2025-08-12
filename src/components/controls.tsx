
"use client";

import { Button } from "./ui/button";
import {
  Download,
  Share2,
} from "lucide-react";
import type { ResumeData } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ControlsProps {
  resumeData: ResumeData;
}

export default function Controls({ resumeData }: ControlsProps) {
  const handlePrint = () => {
    window.print();
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
           {/* Template buttons removed from here */}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handlePrint}>
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Download DOCX (coming soon)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
