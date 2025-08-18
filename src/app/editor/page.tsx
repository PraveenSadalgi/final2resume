
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { generateExperience } from "@/ai/flows/generate-experience";
import { generateProfessionalSummary } from "@/ai/flows/generate-summary";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { generateProjectDescription } from "@/ai/flows/generate-project-description";
import { generateWorkProjectDescription } from "@/ai/flows/generate-work-project-description";
import { suggestRelevantSkills } from "@/ai/flows/suggest-skills";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { useToast } from "@/hooks/use-toast";
import type { Education, Experience, Project, ResumeData, WorkProject } from "@/lib/types";
import { classicTemplate } from "@/lib/mock-data";

// Helper to generate unique IDs on the client
const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(classicTemplate);
  const [isClient, setIsClient] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    experience: null as string | null,
    skills: false,
    project: null as string | null, // This will hold the ID of the personal project being loaded
    workProject: null as string | null,
  });
  const [activeSpeechField, setActiveSpeechField] = useState<string | null>(null);

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
        router.replace('/editor', { scroll: false });
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

  // Function to handle professional summary generation
  const handleGenerateSummary = async () => {
    setLoadingStates((prev) => ({ ...prev, summary: true }));
    try {
      const profession = resumeData.experience[0]?.role || "a professional";
      const generatedSummary = await generateProfessionalSummary({
        profession,
        summary: resumeData.summary,
      });
      setResumeData((prev) => ({ ...prev, summary: generatedSummary.summary }));
    } catch (error) {
      // console.error("Error generating summary:", error);
      console.error("Error generating summary:", error);
      toast({ title: "Error", description: "Failed to generate summary.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, summary: false }));
    }
  };

  // Function to handle experience description generation
  const handleGenerateExperience = async (experienceId: string) => {
    const index = resumeData.experience.findIndex(exp => exp.id === experienceId);
    if (index === -1) {
      toast({ title: "Error", description: "Experience not found.", variant: "destructive" });
      return;
    }

    setLoadingStates((prev) => ({ ...prev, experience: resumeData.experience[index].id }));
    try {
      const exp = resumeData.experience[index];
      const generatedDescription = await generateExperience({
        profession: exp.role || "a professional",
        role: exp.role,
        desiredExperience: exp.description,
      });
      handleNestedFieldChange( "experience", index, "description", generatedDescription.experiences );
    } catch (error) {
      console.error("Error generating experience:", error);
      toast({ title: "Error", description: "Failed to generate experience.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, experience: null }));
    }
  };

  // Function to handle personal project description generation
  const handleGenerateProject = async (projectId: string) => {
    const index = resumeData.projects.findIndex(p => p.id === projectId);
    if (index === -1) {
      toast({ title: "Error", description: "Personal project not found.", variant: "destructive" });
      return;
    }

    setLoadingStates(prev => ({ ...prev, project: resumeData.projects[index]?.id || null }));
    try {
      const project = resumeData.projects[index];
      const generatedDescription = await generateProjectDescription({
        projectName: project.name,
        projectDescription: project.description
      });
      handleNestedFieldChange('projects', index, 'description', generatedDescription.description);
    } catch (error) {
      // console.error("Error generating personal project description:", error);
      console.error("Error generating project description:", error);
      toast({ title: "Error", description: "Failed to generate project description.", variant: "destructive" });
    }
  };

  const generateWorkProjDescription = async (experienceIndex: number, projectIndex: number) => {
    const workProject = resumeData.experience[experienceIndex]?.projects?.[projectIndex];
    if (!workProject) return;

    setLoadingStates(prev => ({ ...prev, workProject: workProject.id }));
    try {
      const generatedDescription = await generateWorkProjectDescription({
        projectName: workProject.name,
        role: workProject.role,
        projectDescription: workProject.description,
      });
      handleWorkProjectChange(experienceIndex, projectIndex, 'description', result.description);
    } catch (error) {
      console.error("Error generating work project description:", error);
      toast({ title: "Error", description: "Failed to generate work project description.", variant: "destructive" });
    }
     // Reset loading state after successful generation or error
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

  return (
    <>
      <div className="relative flex flex-col h-[calc(100vh-69px)] bg-gradient-to-br from-background via-background/95 to-muted/40">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl"
          animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <main className="relative flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.1fr] overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="no-print overflow-y-auto"
          >
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
                onGenerateSummary={handleGenerateSummary}
                onGenerateExperience={handleGenerateExperience}
                onGenerateProject={handleGenerateProject}
                onGenerateWorkProjectDescription={generateWorkProjDescription}
                onSuggestSkills={suggestSkills}
                loadingStates={{...loadingStates, speech: false}}
                onAddWorkProject={addWorkProject}
                onRemoveWorkProject={removeWorkProject}
                onWorkProjectChange={handleWorkProjectChange}
                activeSpeechField={activeSpeechField}
                setActiveSpeechField={setActiveSpeechField}
              />
            ) : (
              <div className="p-4 text-muted-foreground animate-pulse">Loading editor...</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="bg-muted/30 backdrop-blur-md rounded-tl-2xl lg:rounded-tl-3xl p-4 lg:p-8 overflow-y-auto flex justify-center shadow-inner"
          >
            {isClient ? (
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-3xl"
              >
                <ResumePreview resumeData={resumeData} />
              </motion.div>
            ) : (
              <div className="p-4 text-muted-foreground animate-pulse">Loading preview...</div>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
}
