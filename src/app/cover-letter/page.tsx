
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateCoverLetter } from "@/ai/flows/generate-cover-letter";
import { speechToCoverLetter } from "@/ai/flows/speech-to-resume";
import CoverLetterForm from "@/components/cover-letter-form";
import SpeechInputDialog from "@/components/speech-input-dialog";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData, CoverLetterData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialCoverLetterData: CoverLetterData = {
  jobDescription: "",
  tone: "Professional",
  generatedLetter: "",
};

export default function CoverLetterPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeechDialogOpen, setIsSpeechDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const data = localStorage.getItem("resumeDataForCoverLetter");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setResumeData(parsedData);
      } catch (error) {
        console.error("Failed to parse resume data from localStorage", error);
        setResumeData(null);
      }
    }
  }, []);

  const handleCoverLetterChange = (
    field: keyof CoverLetterData,
    value: string
  ) => {
    setCoverLetterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpeechToCoverLetter = async (audioDataUri: string) => {
    setLoading(true);
    try {
      const result = await speechToCoverLetter({ audioDataUri });
      handleCoverLetterChange("jobDescription", result.jobDescription);
      toast({ title: "Success", description: "Job description has been filled out." });
    } catch (error) {
      console.error("Error processing speech for cover letter:", error);
      toast({ title: "Error", description: "Failed to process audio for the cover letter.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
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
      });
      handleCoverLetterChange('generatedLetter', result.coverLetter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast({ title: "Error", description: "Failed to generate cover letter.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <div className="p-4">Loading...</div>;
  }
  
  return (
    <>
      <SpeechInputDialog
        isOpen={isSpeechDialogOpen}
        onClose={() => setIsSpeechDialogOpen(false)}
        onSave={handleSpeechToCoverLetter}
        instructions="Please state the job description you are applying for. Speak clearly to ensure accurate transcription."
        title="Speak to Fill Job Description"
      />
      <div className="flex flex-col h-[calc(100vh-69px)] bg-background">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
              <Link href="/editor">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resume Editor
              </Link>
            </Button>

            <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold mb-1">Cover Letter Generator</h1>
              <p className="text-muted-foreground mb-6">Create a compelling cover letter based on your resume and the job you want.</p>
              {resumeData ? (
                  <CoverLetterForm
                      coverLetterData={coverLetterData}
                      loading={loading}
                      onCoverLetterChange={handleCoverLetterChange}
                      onGenerateCoverLetter={generateLetter}
                      onSpeak={() => setIsSpeechDialogOpen(true)}
                  />
              ) : (
                  <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">Could not load resume data.</p>
                      <Button onClick={() => router.push('/editor')}>Go to Editor</Button>
                  </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
