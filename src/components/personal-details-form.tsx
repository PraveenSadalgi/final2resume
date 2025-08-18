
"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { ResumeData } from "@/lib/types";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

interface PersonalDetailsFormProps {
  resumeData: ResumeData;
  onFieldChange: (field: keyof ResumeData, value: string) => void;
  onSpeakToFill: () => void;
}

export default function PersonalDetailsForm({
  resumeData,
  onFieldChange,
  onSpeakToFill,
}: PersonalDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm" onClick={onSpeakToFill}>
            <Mic className="h-4 w-4 mr-2" />
            Speak to Fill
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={resumeData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          placeholder="e.g., John Doe"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={resumeData.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            placeholder="e.g., john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={resumeData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            placeholder="e.g., 123-456-7890"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={resumeData.location}
            onChange={(e) => onFieldChange("location", e.target.value)}
            placeholder="e.g., San Francisco, CA"
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={resumeData.github}
            onChange={(e) => onFieldChange("github", e.target.value)}
            placeholder="e.g., github.com/johndoe"
          />
        </div>
      </div>
       <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={resumeData.linkedin}
            onChange={(e) => onFieldChange("linkedin", e.target.value)}
            placeholder="e.g., linkedin.com/in/johndoe"
          />
        </div>
    </div>
  );
}
