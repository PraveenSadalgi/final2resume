
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/loading-spinner";
import { improveResume } from "@/ai/flows/improve-resume";
import type { ImproveResumeOutput, ResumeData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Check, Copy, Wand2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface AiReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

export default function AiReviewDialog({
  isOpen,
  onClose,
  resumeData,
  setResumeData,
}: AiReviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ImproveResumeOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateReview = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await improveResume({
        resumeData: JSON.stringify(resumeData),
      });
      setSuggestions(result);
    } catch (error) {
      console.error("Error generating resume review:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = (
    section: keyof ResumeData,
    index: number | null,
    newValue: string
  ) => {
    setResumeData({
        ...resumeData,
        [section]: index !== null
            ? resumeData[section].map((item, i) => i === index ? { ...item, description: newValue } : item)
            : newValue
    });
    toast({ title: "Success", description: "Suggestion applied to your resume." });
  };
  
  const applySummary = (newSummary: string) => {
    setResumeData({ ...resumeData, summary: newSummary });
    toast({ title: "Success", description: "Summary updated." });
  }

  const applySkills = (newSkills: string[]) => {
    const updatedSkills = [...new Set([...resumeData.skills, ...newSkills])];
    setResumeData({ ...resumeData, skills: updatedSkills });
     toast({ title: "Success", description: "New skills added." });
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>AI Resume Review</DialogTitle>
          <DialogDescription>
            Get instant feedback and suggestions to improve your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Wand2 className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-muted-foreground">Analyzing your resume...</p>
          </div>
        ) : suggestions ? (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              <SuggestionCard
                title="Professional Summary"
                original={resumeData.summary}
                suggestion={suggestions.summary}
                onApply={() => applySummary(suggestions.summary)}
              />
              {suggestions.experience.map((expSuggestion, index) => (
                <SuggestionCard
                  key={`exp-${index}`}
                  title={`Experience: ${resumeData.experience[index].role}`}
                  original={resumeData.experience[index].description}
                  suggestion={expSuggestion}
                  onApply={() => applySuggestion('experience', index, expSuggestion)}
                />
              ))}
              {suggestions.projects.map((projSuggestion, index) => (
                 <SuggestionCard
                  key={`proj-${index}`}
                  title={`Project: ${resumeData.projects[index].name}`}
                  original={resumeData.projects[index].description}
                  suggestion={projSuggestion}
                  onApply={() => applySuggestion('projects', index, projSuggestion)}
                />
              ))}
              {suggestions.suggestedSkills.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Suggested Skills</h3>
                   <Alert>
                    <AlertTitle>New Skills to Add</AlertTitle>
                    <AlertDescription className="flex justify-between items-center">
                      <p>{suggestions.suggestedSkills.join(", ")}</p>
                       <Button size="sm" onClick={() => applySkills(suggestions.suggestedSkills)}>Add Skills</Button>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <Wand2 className="h-12 w-12 text-muted-foreground" />
            <h3 className="font-semibold">Ready for a professional opinion?</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Our AI will review your entire resume and provide suggestions for making it more impactful and ATS-friendly.
            </p>
            <Button onClick={handleGenerateReview}>
              <Wand2 className="mr-2 h-4 w-4" />
              Analyze My Resume
            </Button>
          </div>
        )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function SuggestionCard({ title, original, suggestion, onApply }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(suggestion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-1">Current</h4>
                    <pre className="text-xs p-3 bg-muted rounded-md whitespace-pre-wrap font-sans">{original}</pre>
                </div>
                <div>
                     <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold uppercase text-accent mb-1">Suggestion</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                    <pre className="text-xs p-3 bg-green-500/10 text-green-900 rounded-md whitespace-pre-wrap font-sans">{suggestion}</pre>
                </div>
            </div>
            <div className="text-right mt-2">
                <Button size="sm" onClick={onApply}>Use this suggestion</Button>
            </div>
        </div>
    )
}
