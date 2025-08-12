
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Education, Experience, Project, ResumeData } from "@/lib/types";
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  User,
  FileText,
  FolderKanban,
} from "lucide-react";
import PersonalDetailsForm from "./personal-details-form";
import SummaryForm from "./summary-form";
import ExperienceForm from "./experience-form";
import EducationForm from "./education-form";
import SkillsForm from "./skills-form";
import Controls from "./controls";
import ProjectsForm from "./projects-form";

interface ResumeEditorProps {
  resumeData: ResumeData;
  onFieldChange: (field: keyof ResumeData, value: string | string[]) => void;
  onNestedFieldChange: (
    section: "experience" | "education" | "projects",
    index: number,
    field: keyof Experience | keyof Education | keyof Project,
    value: string
  ) => void;
  onAddExperience: () => void;
  onRemoveExperience: (index: number) => void;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
  onGenerateSummary: () => void;
  onGenerateExperience: (index: number) => void;
  onGenerateProjectDescription: (index: number) => void;
  onSuggestSkills: () => void;
  loadingStates: {
    summary: boolean;
    experience: string | null;
    skills: boolean;
    project: string | null;
  };
  onSetTemplate: (template: 'one-column' | 'two-column') => void;
}

export default function ResumeEditor({
  resumeData,
  onFieldChange,
  onNestedFieldChange,
  onAddExperience,
  onRemoveExperience,
  onAddEducation,
  onRemoveEducation,
  onAddProject,
  onRemoveProject,
  onGenerateSummary,
  onGenerateExperience,
  onGenerateProjectDescription,
  onSuggestSkills,
  loadingStates,
  onSetTemplate,
}: ResumeEditorProps) {
  const sections = [
    {
      value: "personal",
      title: "Personal Details",
      Icon: User,
      Component: PersonalDetailsForm,
      props: { onFieldChange },
    },
    {
      value: "summary",
      title: "Summary",
      Icon: FileText,
      Component: SummaryForm,
      props: {
        onFieldChange,
        onGenerateSummary,
        loading: loadingStates.summary,
      },
    },
    {
      value: "experience",
      title: "Experience",
      Icon: Briefcase,
      Component: ExperienceForm,
      props: {
        experience: resumeData.experience,
        loadingStates: { experience: loadingStates.experience },
        onNestedFieldChange,
        onAddExperience,
        onRemoveExperience,
        onGenerateExperience,
      },
    },
    {
      value: "projects",
      title: "Projects",
      Icon: FolderKanban,
      Component: ProjectsForm,
      props: {
        projects: resumeData.projects,
        loadingStates: { project: loadingStates.project },
        onNestedFieldChange,
        onAddProject,
        onRemoveProject,
        onGenerateProjectDescription,
      },
    },
    {
      value: "education",
      title: "Education",
      Icon: GraduationCap,
      Component: EducationForm,
      props: {
        education: resumeData.education,
        onNestedFieldChange,
        onAddEducation,
        onRemoveEducation,
      },
    },
    {
      value: "skills",
      title: "Skills",
      Icon: Lightbulb,
      Component: SkillsForm,
      props: {
        skills: resumeData.skills,
        onFieldChange,
        onSuggestSkills,
        loading: loadingStates.skills,
      },
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <Controls resumeData={resumeData} onSetTemplate={onSetTemplate}/>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={["personal"]} className="p-4">
          {sections.map(({ value, title, Icon, Component, props }) => (
            <AccordionItem value={value} key={value}>
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  {title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Component resumeData={resumeData} {...props} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
