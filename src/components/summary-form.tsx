"use client";

import type { ResumeData } from "@/lib/types";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Sparkles } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";

interface SummaryFormProps {
  resumeData: ResumeData;
  loading: boolean;
  onFieldChange: (field: "summary", value: string) => void;
  onGenerateSummary: () => void;
}

export default function SummaryForm({
  resumeData,
  loading,
  onFieldChange,
  onGenerateSummary,
}: SummaryFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="summary" className="flex items-center justify-between">
        Professional Summary
        <Button
          variant="ghost"
          size="sm"
          onClick={onGenerateSummary}
          disabled={loading}
          className="text-accent hover:text-accent"
        >
          {loading ? (
            <LoadingSpinner className="mr-2" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Generate with AI
        </Button>
      </Label>
      <Textarea
        id="summary"
        value={resumeData.summary}
        onChange={(e) => onFieldChange("summary", e.target.value)}
        placeholder="A brief summary of your professional background..."
        rows={5}
      />
    </div>
  );
}
