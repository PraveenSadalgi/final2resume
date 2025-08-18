
"use client";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sparkles, Download, Mic } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";
import type { CoverLetterData } from "@/lib/types";

interface CoverLetterFormProps {
  coverLetterData: CoverLetterData;
  loading: boolean;
  onCoverLetterChange: (field: keyof CoverLetterData, value: string) => void;
  onGenerateCoverLetter: () => void;
  onSpeak: () => void;
}

export default function CoverLetterForm({
  coverLetterData,
  loading,
  onCoverLetterChange,
  onGenerateCoverLetter,
  onSpeak,
}: CoverLetterFormProps) {
  
  const handleDownloadDocx = () => {
    // This is a placeholder for the DOCX download functionality.
    // In a real application, you would use a library like docx or a server-side
    // process to generate the file.
    alert("DOCX download coming soon!");
  };

  const handleDownloadPdf = () => {
    const { generatedLetter } = coverLetterData;
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write('<html><head><title>Cover Letter</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; line-height: 1.5; white-space: pre-wrap; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(generatedLetter.replace(/\n/g, '<br>'));
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="job-description" className="flex items-center justify-between">
            Job Description
            <Button variant="outline" size="sm" onClick={onSpeak} disabled={loading}>
                <Mic className="h-4 w-4 mr-2" />
                Speak to Fill
            </Button>
        </Label>
        <Textarea
          id="job-description"
          value={coverLetterData.jobDescription}
          onChange={(e) => onCoverLetterChange("jobDescription", e.target.value)}
          placeholder="Paste the job description here, or use the 'Speak to Fill' button to dictate."
          rows={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone-select">Tone</Label>
        <Select
          value={coverLetterData.tone}
          onValueChange={(value) => onCoverLetterChange("tone", value)}
        >
          <SelectTrigger id="tone-select" className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Creative">Creative</SelectItem>
            <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onGenerateCoverLetter} disabled={loading || !coverLetterData.jobDescription} className="w-full sm:w-auto">
        {loading ? (
          <LoadingSpinner className="mr-2" />
        ) : (
          <Sparkles className="h-4 w-4 mr-2" />
        )}
        Generate Cover Letter
      </Button>

      {coverLetterData.generatedLetter && (
        <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
                <Label htmlFor="generated-letter">Generated Cover Letter</Label>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadDocx}>
                        <Download className="h-4 w-4 mr-2" />
                        DOCX
                    </Button>
                </div>
            </div>
          <Textarea
            id="generated-letter"
            value={coverLetterData.generatedLetter}
            onChange={(e) => onCoverLetterChange("generatedLetter", e.target.value)}
            placeholder="Your generated cover letter will appear here..."
            rows={20}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
}
