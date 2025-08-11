"use client";

import type { Experience } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { PlusCircle, Sparkles, Trash2 } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";

interface ExperienceFormProps {
  experience: Experience[];
  loadingStates: { experience: string | null };
  onNestedFieldChange: (
    section: "experience",
    index: number,
    field: keyof Experience,
    value: string
  ) => void;
  onAddExperience: () => void;
  onRemoveExperience: (index: number) => void;
  onGenerateExperience: (index: number) => void;
}

export default function ExperienceForm({
  experience,
  loadingStates,
  onNestedFieldChange,
  onAddExperience,
  onRemoveExperience,
  onGenerateExperience,
}: ExperienceFormProps) {
  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <Card key={exp.id} className="relative">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${exp.id}`}>Role</Label>
                <Input
                  id={`role-${exp.id}`}
                  value={exp.role}
                  onChange={(e) =>
                    onNestedFieldChange("experience", index, "role", e.target.value)
                  }
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) =>
                    onNestedFieldChange(
                      "experience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Tech Solutions Inc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`exp-date-${exp.id}`}>Date</Label>
              <Input
                id={`exp-date-${exp.id}`}
                value={exp.date}
                onChange={(e) =>
                  onNestedFieldChange("experience", index, "date", e.target.value)
                }
                placeholder="e.g., Jan 2021 - Present"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor={`description-${exp.id}`}
                className="flex items-center justify-between"
              >
                Description
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGenerateExperience(index)}
                  disabled={loadingStates.experience === exp.id}
                  className="text-accent hover:text-accent"
                >
                  {loadingStates.experience === exp.id ? (
                    <LoadingSpinner className="mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Generate with AI
                </Button>
              </Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) =>
                  onNestedFieldChange(
                    "experience",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="• Led the development of..."
                rows={4}
              />
            </div>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => onRemoveExperience(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Card>
      ))}
      <Button variant="outline" onClick={onAddExperience} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
