
"use client";

import { Button } from "./ui/button";
import {
  Download,
  Share2,
  Wand2,
  Upload,
} from "lucide-react";
import type { ResumeData } from "@/lib/types";
import Link from "next/link";
import { useState, useRef } from "react";
import AiReviewDialog from "./ai-review-dialog";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "./ui/loading-spinner";
import { parseResume } from "@/ai/flows/parse-resume";


interface ControlsProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export default function Controls({ resumeData, setResumeData }: ControlsProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    toast({ title: "Importing...", description: "AI is analyzing your resume. This may take a moment." });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        try {
           const parsedData = await parseResume({ resumeFile: dataUri });
           setResumeData(parsedData);
           toast({ title: "Success!", description: "Your resume has been imported and improved." });
        } catch (aiError) {
             console.error("Error parsing resume with AI:", aiError);
            toast({
                title: "AI Error",
                description: "The AI could not process your resume. Please try a different file.",
                variant: "destructive",
            });
        } finally {
            setIsImporting(false);
            // Reset file input value to allow re-uploading the same file
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast({ title: "File Error", description: "Could not read the selected file.", variant: "destructive" });
        setIsImporting(false);
      }
    } catch (error) {
      console.error("Error handling file change:", error);
      toast({ title: "Error", description: "An unexpected error occurred during import.", variant: "destructive" });
      setIsImporting(false);
    }
  };


  return (
    <>
      <div className="p-4 bg-card border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Resume Editor</h2>
          </div>
          <div className="flex items-center gap-2">
             <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
             <Button variant="outline" onClick={handleImportClick} disabled={isImporting}>
                {isImporting ? <LoadingSpinner className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Import
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">
                  Templates
              </Link>
            </Button>
            <Button variant="outline" onClick={() => setIsReviewOpen(true)}>
              <Wand2 className="h-4 w-4 mr-2" />
              AI Review
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
      <AiReviewDialog 
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
    </>
  );
}
