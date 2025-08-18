
"use client";

import type { Experience, WorkProject } from "@/lib/types";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { PlusCircle, Sparkles, Trash2, FolderGit2 } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface ExperienceFormProps {
  experience: Experience[];
  loadingStates: {
    experience: string | null;
    workProject: string | null;
  };
  onNestedFieldChange: (
    section: "experience",
    index: number,
    field: keyof Experience,
    value: string
  ) => void;
  onAddExperience: () => void;
  onRemoveExperience: (index: number) => void;
  onGenerateExperience: (id: string) => void;
  onAddWorkProject: (experienceIndex: number) => void;
  onRemoveWorkProject: (experienceIndex: number, projectIndex: number) => void;
  onWorkProjectChange: (
    experienceIndex: number,
    projectIndex: number,
    field: keyof WorkProject,
    value: string
  ) => void;
  onGenerateWorkProjectDescription: (experienceIndex: number, projectIndex: number) => void;
}

export default function ExperienceForm({
  experience,
  loadingStates,
  onNestedFieldChange,
  onAddExperience,
  onRemoveExperience,
  onGenerateExperience,
  onAddWorkProject,
  onRemoveWorkProject,
  onWorkProjectChange,
  onGenerateWorkProjectDescription,
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
                  onClick={() => onGenerateExperience(exp.id)}
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="projects-at-work">
                <AccordionTrigger>
                  <h4 className="font-semibold flex items-center gap-2">
                    <FolderGit2 className="h-4 w-4" />
                    Projects at Work
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-3">
                    {(exp.projects || []).map((workProject, projIndex) => (
                      <Card key={workProject.id} className="bg-muted/50 relative p-3">
                        <CardContent className="p-0 space-y-3">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label htmlFor={`wp-name-${workProject.id}`}>Project Name</Label>
                              <Input
                                id={`wp-name-${workProject.id}`}
                                value={workProject.name}
                                onChange={(e) => onWorkProjectChange(index, projIndex, "name", e.target.value)}
                                placeholder="e.g., Internal Dashboard"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor={`wp-role-${workProject.id}`}>Your Role</Label>
                              <Input
                                id={`wp-role-${workProject.id}`}
                                value={workProject.role}
                                onChange={(e) => onWorkProjectChange(index, projIndex, "role", e.target.value)}
                                placeholder="e.g., Lead Developer"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`wp-desc-${workProject.id}`} className="flex items-center justify-between">
                              Short Description
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onGenerateWorkProjectDescription(index, projIndex)}
                                disabled={loadingStates.workProject === workProject.id}
                                className="text-accent hover:text-accent h-auto py-0 px-2"
                              >
                                {loadingStates.workProject === workProject.id ? (
                                  <LoadingSpinner className="mr-2" />
                                ) : (
                                  <Sparkles className="h-4 w-4 mr-2" />
                                )}
                                Improve with AI
                              </Button>
                            </Label>
                            <Textarea
                              id={`wp-desc-${workProject.id}`}
                              value={workProject.description}
                              onChange={(e) => onWorkProjectChange(index, projIndex, "description", e.target.value)}
                              placeholder="e.g., Built a reporting tool..."
                              rows={2}
                              className="text-sm"
                            />
                          </div>
                        </CardContent>
                         <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 text-muted-foreground hover:text-destructive h-6 w-6"
                          onClick={() => onRemoveWorkProject(index, projIndex)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </Card>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => onAddWorkProject(index)} className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

    