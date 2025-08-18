
"use client";

import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SpeechRecognitionButtonProps {
  fieldName: string;
  onResult: (transcript: string) => void;
  activeField: string | null;
  setActiveField: (fieldName: string | null) => void;
  tooltipContent?: string;
  className?: string;
}

export function SpeechRecognitionButton({
  fieldName,
  onResult,
  activeField,
  setActiveField,
  tooltipContent = "Click and speak to fill",
  className,
}: SpeechRecognitionButtonProps) {
  const { isListening, transcript, startListening, stopListening, error } = useSpeechRecognition({
    onResult,
    onEnd: () => setActiveField(null),
  });

  const isActive = isListening && activeField === fieldName;

  const handleClick = () => {
    if (isActive) {
      stopListening();
    } else {
      setActiveField(fieldName);
      startListening();
    }
  };

  if (error === 'unsupported') {
    return null; // Or some fallback UI
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className={`h-8 w-8 transition-colors ${
              isActive ? "text-red-500 animate-pulse" : "text-muted-foreground"
            } ${className}`}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isActive ? "Listening..." : tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

    