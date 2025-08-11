"use client";

import type { Education } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle, Trash2 } from "lucide-react";

interface EducationFormProps {
  education: Education[];
  onNestedFieldChange: (
    section: "education",
    index: number,
    field: keyof Education,
    value: string
  ) => void;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
}

export default function EducationForm({
  education,
  onNestedFieldChange,
  onAddEducation,
  onRemoveEducation,
}: EducationFormProps) {
  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <Card key={edu.id} className="relative">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${edu.id}`}>School</Label>
                <Input
                  id={`school-${edu.id}`}
                  value={edu.school}
                  onChange={(e) =>
                    onNestedFieldChange("education", index, "school", e.target.value)
                  }
                  placeholder="e.g., University of Technology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) =>
                    onNestedFieldChange("education", index, "degree", e.target.value)
                  }
                  placeholder="e.g., B.S. in Computer Science"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edu-date-${edu.id}`}>Date</Label>
              <Input
                id={`edu-date-${edu.id}`}
                value={edu.date}
                onChange={(e) =>
                  onNestedFieldChange("education", index, "date", e.target.value)
                }
                placeholder="e.g., 2014 - 2018"
              />
            </div>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => onRemoveEducation(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Card>
      ))}
      <Button variant="outline" onClick={onAddEducation} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
