
"use client";

import { useRouter } from "next/navigation";
import type { CoverLetterTemplate } from "@/lib/types";
import { allCoverLetterTemplates, classicTemplate as mockResumeData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CorporateCoverLetter from "@/components/templates/corporate-cover-letter";
import ElegantCoverLetter from "@/components/templates/elegant-cover-letter";
import ProfessionalCoverLetter from "@/components/templates/professional-cover-letter";
import CreativeCoverLetter from "@/components/templates/creative-cover-letter";
import ModernCoverLetter from "@/components/templates/modern-cover-letter";

// A map of template components to render previews
const templateComponents: Record<string, React.FC<any>> = {
  CorporateCoverLetter,
  ElegantCoverLetter,
  ProfessionalCoverLetter,
  CreativeCoverLetter,
  ModernCoverLetter,
  // Add other components here as they are created
};

const placeholderText = "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position I saw on [Platform]. With my experience in [Your Key Skill/Area] and my track record of [Brief Achievement], I am confident I would be a valuable asset to your team.\n\nIn my previous role at [Previous Company], I was responsible for [A Key Responsibility]. One of my major accomplishments was [Quantifiable Achievement], which demonstrates my ability to [Relevant Skill]. I am particularly drawn to [Company Name]'s work in [Area of Interest] and I am eager to contribute to a company that values [Company Value].\n\nMy resume provides further detail on my qualifications. Thank you for your time and consideration. I look forward to hearing from you soon.\n\nSincerely,\n[Your Name]";


export default function CoverLetterTemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (templateData: CoverLetterTemplate) => {
    localStorage.setItem("selectedCoverLetterTemplate", JSON.stringify(templateData));
    router.push(`/cover-letter?template=${templateData.id}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-69px)] bg-gradient-to-br from-background via-blue-50 to-indigo-100 antialiased">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
            <Link href="/cover-letter">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Choose a Cover Letter Template</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Select a structure and style that best fits the role you're applying for.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
            {allCoverLetterTemplates.map((template, index) => {
              const PreviewComponent = templateComponents[template.component];
              return (
                <motion.div
                  key={template.id}
                  className="group flex flex-col items-center gap-6 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleUseTemplate(template)}
                >
                  <div className="w-full max-w-[600px] rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/40 group-hover:scale-105 transform bg-white">
                     {PreviewComponent ? (
                        <PreviewComponent resumeData={mockResumeData} coverLetterText={placeholderText} />
                     ) : (
                        <div className="p-8">
                           <h2 className="text-xl font-bold mb-4">{template.name}</h2>
                           <pre className="whitespace-pre-wrap font-serif text-sm">
                               {placeholderText}
                           </pre>
                        </div>
                     )}
                  </div>
                  <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-1 transition-colors group-hover:text-primary">{template.name}</h2>
                      <p className="text-sm text-muted-foreground max-w-md">{template.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
