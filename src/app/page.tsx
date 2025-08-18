
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateExperience } from "@/ai/flows/generate-experience";
import { generateProfessionalSummary } from "@/ai/flows/generate-summary";
import { generateProjectDescription } from "@/ai/flows/generate-project-description";
import { generateWorkProjectDescription } from "@/ai/flows/generate-work-project-description";
import { suggestRelevantSkills } from "@/ai/flows/suggest-skills";
import { Header } from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { useToast } from "@/hooks/use-toast";
import type { Education, Experience, Project, ResumeData, WorkProject } from "@/lib/types";
import { classicTemplate } from "@/lib/mock-data";

// Helper to generate unique IDs on the client
const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(classicTemplate);
  const [isClient, setIsClient] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    experience: null as string | null,
    skills: false,
    project: null as string | null,
    workProject: null as string | null,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const templateQuery = searchParams.get('template');

  useEffect(() => {
    setIsClient(true);
    const templateData = localStorage.getItem("selectedTemplate");
    if (templateData && templateQuery) {
      try {
        setResumeData(JSON.parse(templateData));
        // Clear the item from localStorage after using it
        localStorage.removeItem("selectedTemplate");
        // Update URL to remove query param
        router.replace('/', { scroll: false });
      } catch (error) {
        console.error("Failed to parse template data from localStorage", error);
      }
    }
  }, [router, templateQuery]);

  const { toast } = useToast();

  const handleFieldChange = (
    field: keyof Omit<ResumeData, 'coverLetter'>,
    value: string | string[]
  ) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedFieldChange = (
    section: "experience" | "education" | "projects",
    index: number,
    field: keyof Experience | keyof Education | keyof Project,
    value: string
  ) => {
    setResumeData((prev) => {
      const newSection = [...prev[section]];
      (newSection[index] as any)[field] = value;
      return { ...prev, [section]: newSection };
    });
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateUniqueId(),
          role: "",
          company: "",
          date: "",
          description: "",
          projects: [],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: generateUniqueId(), school: "", degree: "", date: "" },
      ],
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };
  
  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: generateUniqueId(), name: "", description: "" },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addWorkProject = (experienceIndex: number) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      const projects = newExperience[experienceIndex].projects || [];
      projects.push({ id: generateUniqueId(), name: "", role: "", description: "" });
      newExperience[experienceIndex].projects = projects;
      return { ...prev, experience: newExperience };
    });
  };

  const removeWorkProject = (experienceIndex: number, projectIndex: number) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      const projects = newExperience[experienceIndex].projects || [];
      newExperience[experienceIndex].projects = projects.filter((_, i) => i !== projectIndex);
      return { ...prev, experience: newExperience };
    });
  };

  const handleWorkProjectChange = (
    experienceIndex: number,
    projectIndex: number,
    field: keyof WorkProject,
    value: string
  ) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      const projects = newExperience[experienceIndex].projects || [];
      (projects[projectIndex] as any)[field] = value;
      newExperience[experienceIndex].projects = projects;
      return { ...prev, experience: newExperience };
    });
  };

  const generateSummary = async () => {
    setLoadingStates((prev) => ({ ...prev, summary: true }));
    try {
      const profession = resumeData.experience[0]?.role || "a professional";
      const result = await generateProfessionalSummary({ profession });
      handleFieldChange("summary", result.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({ title: "Error", description: "Failed to generate summary.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, summary: false }));
    }
  };

  const generateExp = async (index: number) => {
    setLoadingStates((prev) => ({ ...prev, experience: resumeData.experience[index].id }));
    try {
      const exp = resumeData.experience[index];
      const result = await generateExperience({
        profession: exp.role || "a professional",
        role: exp.role,
        desiredExperience: exp.description,
      });
      handleNestedFieldChange( "experience", index, "description", result.experiences );
    } catch (error) {
      console.error("Error generating experience:", error);
      toast({ title: "Error", description: "Failed to generate experience.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, experience: null }));
    }
  };

  const generateProjDescription = async (index: number) => {
    setLoadingStates(prev => ({ ...prev, project: resumeData.projects[index].id }));
    try {
      const project = resumeData.projects[index];
      const result = await generateProjectDescription({
        projectName: project.name,
        projectDescription: project.description
      });
      handleNestedFieldChange('projects', index, 'description', result.description);
    } catch (error) {
      console.error("Error generating project description:", error);
      toast({ title: "Error", description: "Failed to generate project description.", variant: "destructive" });
    } finally {
      setLoadingStates(prev => ({ ...prev, project: null }));
    }
  };

  const generateWorkProjDescription = async (experienceIndex: number, projectIndex: number) => {
    const workProject = resumeData.experience[experienceIndex]?.projects?.[projectIndex];
    if (!workProject) return;

    setLoadingStates(prev => ({ ...prev, workProject: workProject.id }));
    try {
      const result = await generateWorkProjectDescription({
        projectName: workProject.name,
        role: workProject.role,
        projectDescription: workProject.description,
      });
      handleWorkProjectChange(experienceIndex, projectIndex, 'description', result.description);
    } catch (error) {
      console.error("Error generating work project description:", error);
      toast({ title: "Error", description: "Failed to generate work project description.", variant: "destructive" });
    } finally {
      setLoadingStates(prev => ({ ...prev, workProject: null }));
    }
  };
  
  const suggestSkills = async () => {
    setLoadingStates((prev) => ({ ...prev, skills: true }));
    try {
      const profession = resumeData.experience[0]?.role || "a professional";
      const chosenRoles = resumeData.experience.map(e => e.role).join(', ');
      const result = await suggestRelevantSkills({ profession, chosenRoles });
      handleFieldChange("skills", [...new Set([...resumeData.skills, ...result.skills])]);
    } catch (error) {
      console.error("Error suggesting skills:", error);
      toast({ title: "Error", description: "Failed to suggest skills.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, skills: false }));
    }
  };

  const setTemplate = (template: 'one-column' | 'two-column' | 'modern' | 'creative' | 'minimalist') => {
    setResumeData(prev => ({...prev, template}));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header 
        resumeData={resumeData}
      />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr] overflow-hidden">
        <div className="no-print overflow-y-auto">
          {isClient ? (
            <ResumeEditor
              resumeData={resumeData}
              onFieldChange={handleFieldChange}
              onNestedFieldChange={handleNestedFieldChange}
              onAddExperience={addExperience}
              onRemoveExperience={removeExperience}
              onAddEducation={addEducation}
              onRemoveEducation={removeEducation}
              onAddProject={addProject}
              onRemoveProject={removeProject}
              onGenerateSummary={generateSummary}
              onGenerateExperience={generateExp}
              onGenerateProjectDescription={generateProjDescription}
              onGenerateWorkProjectDescription={generateWorkProjDescription}
              onSuggestSkills={suggestSkills}
              loadingStates={loadingStates}
              onAddWorkProject={addWorkProject}
              onRemoveWorkProject={removeWorkProject}
              onWorkProjectChange={handleWorkProjectChange}
            />
          ) : (
            <div className="p-4">Loading editor...</div>
          )}
        </div>
        <div className="bg-muted/30 p-4 lg:p-8 overflow-y-auto flex justify-center">
          {isClient ? (
            <ResumePreview resumeData={resumeData} />
          ) : (
            <div className="p-4">Loading preview...</div>
          )}
        </div>
      </main>
    </div>
  );
}
