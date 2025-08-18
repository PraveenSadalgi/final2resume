
"use client";

import type { ResumeData } from "@/lib/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Sparkles } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";
import { SpeechRecognitionButton } from "./speech-recognition-button";
import { Button } from "./ui/button";

interface SummaryFormProps {
  summary: string;
  setSummary: (summary: string) => void;
  isLoading: boolean;
  onGenerateSummary: () => Promise<void>;
}

export default function SummaryForm({
  resumeData,
  loading,
  onFieldChange,
  onGenerateSummary,
  summary,
  setSummary,
}: SummaryFormProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="summary">
          Professional Summary
        </Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onGenerateSummary()}
          disabled={isLoading}
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
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="A brief summary of your professional background, or use the microphone to dictate."
          rows={5}
        />
      </div>
    </div>
  );
}

    