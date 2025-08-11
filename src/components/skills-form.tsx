"use client";

import { useState } from "react";
import type { ResumeData } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, Sparkles } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";

interface SkillsFormProps {
  skills: string[];
  loading: boolean;
  onFieldChange: (field: "skills", value: string[]) => void;
  onSuggestSkills: () => void;
}

export default function SkillsForm({
  skills,
  loading,
  onFieldChange,
  onSuggestSkills,
}: SkillsFormProps) {
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      onFieldChange("skills", [...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onFieldChange(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="skills" className="flex items-center justify-between">
          Skills
          <Button
            variant="ghost"
            size="sm"
            onClick={onSuggestSkills}
            disabled={loading}
            className="text-accent hover:text-accent"
          >
            {loading ? (
              <LoadingSpinner className="mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Suggest Skills
          </Button>
        </Label>
        <div className="flex gap-2">
          <Input
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            placeholder="e.g., JavaScript"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
