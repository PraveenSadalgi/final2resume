
"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateCoverLetter } from "@/ai/flows/generate-cover-letter";
import CoverLetterForm from "@/components/cover-letter-form";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData, CoverLetterData, CoverLetterTemplate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, LayoutTemplate } from "lucide-react";
import { professionalCoverLetterTemplate } from "@/lib/mock-data";
import CorporateCoverLetter from "@/components/templates/corporate-cover-letter";
import ElegantCoverLetter from "@/components/templates/elegant-cover-letter";
import ProfessionalCoverLetter from "@/components/templates/professional-cover-letter";
import CreativeCoverLetter from "@/components/templates/creative-cover-letter";
import ModernCoverLetter from "@/components/templates/modern-cover-letter";
import { motion } from "framer-motion";

const initialCoverLetterData: CoverLetterData = {
  jobDescription: "",
  tone: "Professional",
  generatedLetter: "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position I saw on [Platform]. With my experience in [Your Key Skill/Area] and my track record of [Brief Achievement], I am confident I would be a valuable asset to your team.\n\nIn my previous role at [Previous Company], I was responsible for [A Key Responsibility]. One of my major accomplishments was [Quantifiable Achievement], which demonstrates my ability to [Relevant Skill]. I am particularly drawn to [Company Name]'s work in [Area of Interest] and I am eager to contribute to a company that values [Company Value].\n\nMy resume provides further detail on my qualifications. Thank you for your time and consideration. I look forward to hearing from you soon.\n\nSincerely,\n[Your Name]",
};

const templateComponents: Record<string, React.FC<any>> = {
    CorporateCoverLetter,
    ElegantCoverLetter,
    ProfessionalCoverLetter,
    CreativeCoverLetter,
    ModernCoverLetter,
};

function CoverLetterGenerator() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData);
  const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterTemplate>(professionalCoverLetterTemplate);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateQuery = searchParams.get('template');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("resumeDataForCoverLetter");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setResumeData(parsedData);
      } catch (error) {
        console.error("Failed to parse resume data from localStorage", error);
        toast({ title: "Error", description: "Could not load resume data. Please create a resume first.", variant: "destructive" });
        setResumeData(null);
      }
    } else {
        toast({ title: "No Resume Data", description: "Please create a resume first to generate a cover letter.", variant: "destructive" });
    }

    const templateData = localStorage.getItem("selectedCoverLetterTemplate");
    if (templateData && templateQuery) {
        try {
            setSelectedTemplate(JSON.parse(templateData));
            localStorage.removeItem("selectedCoverLetterTemplate");
            router.replace('/cover-letter', { scroll: false });
        } catch (error) {
            console.error("Failed to parse template data from localStorage", error);
        }
    }
  }, [router, templateQuery, toast]);

  const handleCoverLetterChange = (
    field: keyof CoverLetterData,
    value: string
  ) => {
    setCoverLetterData((prev) => ({ ...prev, [field]: value }));
  };

  const generateLetter = async () => {
    if (!resumeData) {
      toast({ title: "Error", description: "Resume data not found. Please go back and select a resume.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await generateCoverLetter({
        resumeData: JSON.stringify(resumeData),
        jobDescription: coverLetterData.jobDescription,
        tone: coverLetterData.tone,
        template: selectedTemplate.prompt,
      });
      handleCoverLetterChange('generatedLetter', result.coverLetter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({ title: "Error", description: "Failed to generate cover letter.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const CoverLetterPreview = useMemo(() => {
    const Component = templateComponents[selectedTemplate.component];
    if (Component) {
      return <Component resumeData={resumeData} coverLetterText={coverLetterData.generatedLetter} />;
    }
    // Fallback for templates without a visual component yet
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full aspect-[8.5/11]">
            <pre className="whitespace-pre-wrap font-serif text-sm">
                {coverLetterData.generatedLetter}
            </pre>
        </div>
    );
  }, [selectedTemplate, resumeData, coverLetterData.generatedLetter]);


  if (!isClient) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-69px)] bg-muted/40">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-4 md:p-6 lg:p-8 bg-background border-r overflow-y-auto md:h-[calc(100vh-69px)]">
          <div className="max-w-4xl mx-auto">
              <Button asChild variant="ghost" className="mb-4 -ml-4">
              <Link href="/editor">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resume Editor
              </Link>
              </Button>

              <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                      <div>
                          <h1 className="text-2xl font-bold mb-1">Cover Letter Generator</h1>
                          <p className="text-muted-foreground">Create a compelling cover letter based on your resume and the job you want.</p>
                      </div>
                      <Button asChild variant="outline" className="w-full sm:w-auto">
                          <Link href="/cover-letter/templates">
                              <LayoutTemplate className="mr-2 h-4 w-4" />
                              Choose Template
                          </Link>
                      </Button>
                  </div>

              {resumeData ? (
                  <CoverLetterForm
                      coverLetterData={coverLetterData}
                      loading={loading}
                      onCoverLetterChange={handleCoverLetterChange}
                      onGenerateCoverLetter={generateLetter}
                      selectedTemplate={selectedTemplate}
                      previewRef={previewRef}
                  />
              ) : (
                  <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">Could not load resume data.</p>
                      <Button onClick={() => router.push('/editor')}>Go to Editor</Button>
                  </div>
              )}
              </div>
          </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto flex justify-center">
          <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-2xl"
              >
              <div ref={previewRef} className="transform scale-[0.35] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.8] origin-top">
                  {CoverLetterPreview}
              </div>
          </motion.div>
      </div>
    </div>
  );
}

export default function CoverLetterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoverLetterGenerator />
    </Suspense>
  )
}
