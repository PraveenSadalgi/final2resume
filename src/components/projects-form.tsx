
"use client";

import type { Project } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { PlusCircle, Sparkles, Trash2 } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";

interface ProjectsFormProps {
  projects: Project[];
  loadingStates: { project: string | null };
  onNestedFieldChange: (
    section: "projects",
    index: number,
    field: keyof Project,
    value: string
  ) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
  onGenerateProjectDescription: (id: string) => void;
}

export default function ProjectsForm({
  projects,
  loadingStates,
  onNestedFieldChange,
  onAddProject,
  onRemoveProject,
  onGenerateProjectDescription,
}: ProjectsFormProps) {
  return (
    <div className="space-y-4">
      {projects.map((proj, index) => (
        <Card key={proj.id} className="relative">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`project-name-${proj.id}`}>Project Name</Label>
              <Input
                id={`project-name-${proj.id}`}
                value={proj.name}
                onChange={(e) =>
                  onNestedFieldChange("projects", index, "name", e.target.value)
                }
                placeholder="e.g., Awesome Project"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor={`project-description-${proj.id}`}
                className="flex items-center justify-between"
              >
                Description
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGenerateProjectDescription(proj.id)}
                  disabled={loadingStates.project === proj.id}
                  className="text-accent hover:text-accent"
                >
                  {loadingStates.project === proj.id ? (
                    <LoadingSpinner className="mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Generate with AI
                </Button>
              </Label>
              <Textarea
                id={`project-description-${proj.id}`}
                value={proj.description}
                onChange={(e) =>
                  onNestedFieldChange(
                    "projects",
                    index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="• Developed a cool feature that does..."
                rows={4}
              />
            </div>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => onRemoveProject(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Card>
      ))}
      <Button variant="outline" onClick={onAddProject} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
