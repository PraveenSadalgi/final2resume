
"use client";

import { FileText, Columns, PanelTop, MailCheck } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ResumeData } from "@/lib/types";

interface HeaderProps {
  onSetTemplate: (template: "one-column" | "two-column") => void;
  currentTemplate: "one-column" | "two-column";
  resumeData?: ResumeData;
}

export function Header({ onSetTemplate, currentTemplate, resumeData }: HeaderProps) {
  const handleCoverLetterClick = () => {
    if (typeof window !== "undefined" && resumeData) {
      localStorage.setItem("resumeDataForCoverLetter", JSON.stringify(resumeData));
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Templates</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onSetTemplate("one-column")}
                className={cn(currentTemplate === "one-column" && "bg-accent/20")}
              >
                <PanelTop className="h-4 w-4 mr-2" />
                1-Column
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSetTemplate("two-column")}
                className={cn(currentTemplate === "two-column" && "bg-accent/20")}
              >
                <Columns className="h-4 w-4 mr-2" />
                2-Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="outline" onClick={handleCoverLetterClick}>
            <Link href="/cover-letter">
              <MailCheck className="h-4 w-4 mr-2" />
              Cover Letter
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
