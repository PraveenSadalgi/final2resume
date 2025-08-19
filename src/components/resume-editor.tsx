
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Education, Experience, Project, ResumeData, WorkProject } from "@/lib/types";
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
  onFieldChange: (field: keyof Omit<ResumeData, 'coverLetter'>, value: string | string[]) => void;
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
 onGenerateSummary: () => Promise<void>;
  onGenerateExperience: (id: string) => Promise<void>;
  onGenerateProject: (id: string) => Promise<void>;
 onGenerateWorkProjectDescription: (experienceIndex: number, projectIndex: number) => Promise<void>;
  onSuggestSkills: () => void;
  loadingStates: {
    summary: boolean;
    experience: string | null;
    skills: boolean;
    project: string | null;
    workProject: string | null;
  };
  onAddWorkProject: (experienceIndex: number) => void;
  onRemoveWorkProject: (experienceIndex: number, projectIndex: number) => void;
  onWorkProjectChange: (
    experienceIndex: number,
    projectIndex: number,
    field: keyof WorkProject,
    value: string
  ) => void;
  activeSpeechField: string | null;
  setActiveSpeechField: (field: string | null) => void;
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
  onGenerateProject,
  onGenerateWorkProjectDescription,
  onSuggestSkills,
  loadingStates,
  onAddWorkProject,
  onRemoveWorkProject,
  onWorkProjectChange,
  activeSpeechField,
  setActiveSpeechField,
}: ResumeEditorProps) {
  const sections = [
    {
      value: "personal",
      title: "Personal Details",
      Icon: User,
      Component: PersonalDetailsForm,
      props: { 
        onFieldChange, 
        activeSpeechField, 
        setActiveSpeechField 
      },
    },
    {
      value: "summary",
      title: "Summary",
      Icon: FileText,
      Component: SummaryForm,
      props: {
        summary: resumeData.summary,
        onFieldChange,
        onGenerateSummary,
        loading: loadingStates.summary,
        activeSpeechField,
        setActiveSpeechField,
      },
    },
    {
      value: "experience",
      title: "Experience",
      Icon: Briefcase,
      Component: ExperienceForm,
      props: {
        experience: resumeData.experience,
        loadingStates: { 
          experience: loadingStates.experience,
          workProject: loadingStates.workProject,
        },
        onNestedFieldChange,
        onAddExperience,
        onRemoveExperience,
        onGenerateExperience,
        onAddWorkProject,
        onRemoveWorkProject,
        onWorkProjectChange,
        onGenerateWorkProjectDescription,
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
        onGenerateProjectDescription: onGenerateProject,
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
      <Controls resumeData={resumeData} />
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

    