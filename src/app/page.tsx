
"use client";

import { useState, useEffect } from "react";
import { generateExperience } from "@/ai/flows/generate-experience";
import { generateProfessionalSummary } from "@/ai/flows/generate-summary";
import { suggestRelevantSkills } from "@/ai/flows/suggest-skills";
import { Header } from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { useToast } from "@/hooks/use-toast";
import type { Education, Experience, ResumeData } from "@/lib/types";

const initialResumeData: ResumeData = {
  template: "two-column",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Innovative and results-driven Software Engineer with 5+ years of experience in developing and scaling web applications. Proficient in JavaScript, React, and Node.js. Passionate about building user-friendly interfaces and solving complex problems.",
  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      date: "Jan 2021 - Present",
      description:
        "• Led the development of a new microservices architecture, improving system scalability by 40%.\n• Mentored junior engineers, fostering a culture of growth and knowledge sharing.",
    },
    {
      id: "exp2",
      role: "Software Engineer",
      company: "Web Innovators",
      date: "Jun 2018 - Dec 2020",
      description:
        "• Developed and maintained client-side features for a high-traffic e-commerce platform using React and Redux.\n• Collaborated with UX/UI designers to implement responsive and accessible user interfaces.",
    },
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      date: "2014 - 2018",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "GraphQL", "Docker"],
};

// Helper to generate unique IDs on the client
const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isClient, setIsClient] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    summary: false,
    experience: null as string | null,
    skills: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { toast } = useToast();

  const handleFieldChange = (
    field: keyof ResumeData,
    value: string | string[]
  ) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedFieldChange = (
    section: "experience" | "education",
    index: number,
    field: keyof Experience | keyof Education,
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
  
  const generateSummary = async () => {
    setLoadingStates((prev) => ({ ...prev, summary: true }));
    try {
      const profession = resumeData.experience[0]?.role || "a professional";
      const result = await generateProfessionalSummary({ profession });
      setResumeData((prev) => ({ ...prev, summary: result.summary }));
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

  const suggestSkills = async () => {
    setLoadingStates((prev) => ({ ...prev, skills: true }));
    try {
      const profession = resumeData.experience[0]?.role || "a professional";
      const chosenRoles = resumeData.experience.map(e => e.role).join(', ');
      const result = await suggestRelevantSkills({ profession, chosenRoles });
      setResumeData(prev => ({...prev, skills: [...new Set([...prev.skills, ...result.skills])]}));
    } catch (error) {
      console.error("Error suggesting skills:", error);
      toast({ title: "Error", description: "Failed to suggest skills.", variant: "destructive" });
    } finally {
      setLoadingStates((prev) => ({ ...prev, skills: false }));
    }
  };
  
  const setTemplate = (template: 'one-column' | 'two-column') => {
    setResumeData(prev => ({...prev, template}));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
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
              onGenerateSummary={generateSummary}
              onGenerateExperience={generateExp}
              onSuggestSkills={suggestSkills}
              loadingStates={loadingStates}
              onSetTemplate={setTemplate}
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
