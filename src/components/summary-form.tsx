
"use client";

import type { ResumeData } from "@/lib/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";
import { SpeechRecognitionButton } from "./speech-recognition-button";

interface SummaryFormProps {
  resumeData: ResumeData;
  summary: string;
  loading: boolean;
  onFieldChange: (field: "summary", value: string) => void;
  onGenerateSummary: () => Promise<void>;
  activeSpeechField: string | null;
  setActiveSpeechField: (field: string | null) => void;
}

export default function SummaryForm({
  resumeData,
  summary,
  loading,
  onFieldChange,
  onGenerateSummary,
  activeSpeechField,
  setActiveSpeechField,
}: SummaryFormProps) {
  
  const handleSpeechResult = (transcript: string) => {
    onFieldChange("summary", transcript);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="summary">
          Professional Summary
        </Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onGenerateSummary}
          disabled={loading}
          className="text-accent hover:text-accent h-auto"
        >
          {loading ? (
            <LoadingSpinner className="mr-2" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Generate with AI
        </Button>
      </div>
       <div className="relative">
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => onFieldChange("summary", e.target.value)}
          placeholder="A brief summary of your professional background, or use the microphone to dictate."
          rows={5}
          className="pr-12"
        />
         <div className="absolute top-2 right-2">
            <SpeechRecognitionButton
              fieldName="summary"
              onResult={handleSpeechResult}
              activeField={activeSpeechField}
              setActiveField={setActiveSpeechField}
              tooltipContent="Speak your professional summary."
            />
          </div>
      </div>
    </div>
  );
}
