
"use client";

import { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { ResumeData } from "@/lib/types";
import { SpeechRecognitionButton } from "./speech-recognition-button";
import { Button } from "./ui/button";
import { UploadCloud, UserCircle } from "lucide-react";

interface PersonalDetailsFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  onFieldChange: (field: keyof ResumeData, value: string) => void;
}

export default function PersonalDetailsForm({
  resumeData,
  setResumeData,
  onFieldChange,
}: PersonalDetailsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSpeechResult = (field: keyof ResumeData, transcript: string) => {
    let formattedTranscript = transcript;
    if (field === 'email') {
      formattedTranscript = transcript
        .toLowerCase()
        .replace(/\s+at\s+/gi, '@')
        .replace(/\s/g, '');
    }
    onFieldChange(field, formattedTranscript);
  };
  
  const getTooltipContent = (field: string) => {
    const examples = {
        name: "e.g., 'John Doe'",
        email: "e.g., 'john.doe@example.com'",
        phone: "e.g., '123-456-7890'",
        location: "e.g., 'San Francisco, CA'",
        github: "e.g., 'github.com/johndoe'",
        linkedin: "e.g., 'linkedin.com/in/johndoe'",
    };
    return `Say your ${field}. ${examples[field as keyof typeof examples] || ''}`;
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setResumeData({ ...resumeData, imageUrl: loadEvent.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-muted flex-shrink-0 border-2 border-dashed flex items-center justify-center">
            {resumeData.imageUrl ? (
                <img src={resumeData.imageUrl} alt="User" className="rounded-full w-full h-full object-cover" />
            ) : (
                <UserCircle className="w-12 h-12 text-muted-foreground" />
            )}
        </div>
        <div className="flex-grow">
            <Label>Profile Photo</Label>
            <p className="text-xs text-muted-foreground mb-2">Upload a professional headshot.</p>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" onClick={handleImageUploadClick}>
                <UploadCloud className="h-4 w-4 mr-2" />
                Upload Image
            </Button>
        </div>
    </div>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <Input
            id="name"
            value={resumeData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="e.g., John Doe"
            className="pr-12"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <SpeechRecognitionButton
              onResult={(transcript) => handleSpeechResult("name", transcript)}
              tooltipContent={getTooltipContent('name')}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
           <div className="relative">
            <Input
              id="email"
              type="email"
              value={resumeData.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
              placeholder="e.g., john.doe@example.com"
              className="pr-12"
            />
             <div className="absolute top-1/2 -translate-y-1/2 right-2">
               <SpeechRecognitionButton
                onResult={(transcript) => handleSpeechResult("email", transcript)}
                tooltipContent={getTooltipContent('email')}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
           <div className="relative">
            <Input
              id="phone"
              value={resumeData.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              placeholder="e.g., 123-456-7890"
              className="pr-12"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <SpeechRecognitionButton
                onResult={(transcript) => handleSpeechResult("phone", transcript)}
                tooltipContent={getTooltipContent('phone')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Input
              id="location"
              value={resumeData.location}
              onChange={(e) => onFieldChange("location", e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="pr-12"
            />
             <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <SpeechRecognitionButton
                onResult={(transcript) => handleSpeechResult("location", transcript)}
                tooltipContent={getTooltipContent('location')}
              />
            </div>
          </div>
        </div>
         <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <div className="relative">
            <Input
              id="github"
              value={resumeData.github}
              onChange={(e) => onFieldChange("github", e.target.value)}
              placeholder="e.g., github.com/johndoe"
              className="pr-12"
            />
             <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <SpeechRecognitionButton
                onResult={(transcript) => handleSpeechResult("github", transcript)}
                tooltipContent={getTooltipContent('github')}
              />
            </div>
          </div>
        </div>
      </div>
       <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <div className="relative">
            <Input
              id="linkedin"
              value={resumeData.linkedin}
              onChange={(e) => onFieldChange("linkedin", e.target.value)}
              placeholder="e.g., linkedin.com/in/johndoe"
              className="pr-12"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <SpeechRecognitionButton
                onResult={(transcript) => handleSpeechResult("linkedin", transcript)}
                tooltipContent={getTooltipContent('linkedin')}
              />
            </div>
          </div>
        </div>
    </div>
  );
}
