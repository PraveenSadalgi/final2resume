
"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { ResumeData } from "@/lib/types";
import { SpeechRecognitionButton } from "./speech-recognition-button";

interface PersonalDetailsFormProps {
  resumeData: ResumeData;
  onFieldChange: (field: keyof ResumeData, value: string) => void;
  activeSpeechField: string | null;
  setActiveSpeechField: (field: string | null) => void;
}

export default function PersonalDetailsForm({
  resumeData,
  onFieldChange,
  activeSpeechField,
  setActiveSpeechField,
}: PersonalDetailsFormProps) {
  const fields: (keyof ResumeData)[] = ["name", "email", "phone", "location", "github", "linkedin"];

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

  return (
    <div className="space-y-4">
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
              fieldName="name"
              onResult={(transcript) => handleSpeechResult("name", transcript)}
              activeField={activeSpeechField}
              setActiveField={setActiveSpeechField}
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
                fieldName="email"
                onResult={(transcript) => handleSpeechResult("email", transcript)}
                activeField={activeSpeechField}
                setActiveField={setActiveSpeechField}
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
                fieldName="phone"
                onResult={(transcript) => handleSpeechResult("phone", transcript)}
                activeField={activeSpeechField}
                setActiveField={setActiveSpeechField}
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
                fieldName="location"
                onResult={(transcript) => handleSpeechResult("location", transcript)}
                activeField={activeSpeechField}
                setActiveField={setActiveSpeechField}
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
                fieldName="github"
                onResult={(transcript) => handleSpeechResult("github", transcript)}
                activeField={activeSpeechField}
                setActiveField={setActiveSpeechField}
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
                fieldName="linkedin"
                onResult={(transcript) => handleSpeechResult("linkedin", transcript)}
                activeField={activeSpeechField}
                setActiveField={setActiveSpeechField}
                tooltipContent={getTooltipContent('linkedin')}
              />
            </div>
          </div>
        </div>
    </div>
  );
}
