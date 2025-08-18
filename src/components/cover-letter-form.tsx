
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
import { Sparkles, Download } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";
import type { CoverLetterData, CoverLetterTemplate } from "@/lib/types";
import { SpeechRecognitionButton } from "./speech-recognition-button";
import { Badge } from "./ui/badge";

interface CoverLetterFormProps {
  coverLetterData: CoverLetterData;
  loading: boolean;
  onCoverLetterChange: (field: keyof CoverLetterData, value: string) => void;
  onGenerateCoverLetter: () => void;
  activeSpeechField: string | null;
  setActiveSpeechField: (field: string | null) => void;
  selectedTemplate: CoverLetterTemplate;
}

export default function CoverLetterForm({
  coverLetterData,
  loading,
  onCoverLetterChange,
  onGenerateCoverLetter,
  activeSpeechField,
  setActiveSpeechField,
  selectedTemplate
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

  const handleSpeechResult = (transcript: string) => {
    onCoverLetterChange("jobDescription", transcript);
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-2">
            <Label>Selected Template:</Label>
            <Badge variant="secondary">{selectedTemplate.name}</Badge>
        </div>
      <div className="space-y-2">
        <Label htmlFor="job-description">Job Description</Label>
        <div className="relative">
          <Textarea
            id="job-description"
            value={coverLetterData.jobDescription}
            onChange={(e) => onCoverLetterChange("jobDescription", e.target.value)}
            placeholder="Paste the job description here, or use the microphone to dictate."
            rows={8}
            className="pr-12"
          />
          <div className="absolute top-2 right-2">
            <SpeechRecognitionButton
              fieldName="jobDescription"
              onResult={handleSpeechResult}
              activeField={activeSpeechField}
              setActiveField={setActiveSpeechField}
              tooltipContent="Speak the job description."
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div className="space-y-2">
            <Label htmlFor="tone-select">Tone</Label>
            <Select
            value={coverLetterData.tone}
            onValueChange={(value) => onCoverLetterChange("tone", value)}
            >
            <SelectTrigger id="tone-select" className="w-full">
                <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <Button onClick={onGenerateCoverLetter} disabled={loading || !coverLetterData.jobDescription} className="w-full">
            {loading ? (
            <LoadingSpinner className="mr-2" />
            ) : (
            <Sparkles className="h-4 w-4 mr-2" />
            )}
            Generate with AI
        </Button>
      </div>

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
