
"use client";

import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SpeechRecognitionButtonProps {
  onResult: (transcript: string) => void;
  tooltipContent?: string;
  className?: string;
}

export function SpeechRecognitionButton({
  onResult,
  tooltipContent = "Click and speak to fill",
  className,
}: SpeechRecognitionButtonProps) {
  const { isListening, startListening, stopListening, error } = useSpeechRecognition({
    onResult,
  });

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
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
              isListening ? "text-red-500 animate-pulse" : "text-muted-foreground"
            } ${className}`}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isListening ? "Listening..." : tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
