
"use client";

import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { allTemplates, templateDetails } from "@/lib/mock-data";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function TemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (templateData: ResumeData) => {
    localStorage.setItem("selectedTemplate", JSON.stringify(templateData));
    router.push(`/?template=${templateData.template}`);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Choose Your Template</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Select a template that best showcases your experience and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTemplates.map((templateData) => {
              const details = templateDetails[templateData.template];
              return (
                <div key={templateData.template} className="group flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-3">{details.name}</h2>
                  <div className="w-full max-w-[425px] aspect-[8.5/11] mb-4">
                     <div className="transform scale-[0.5] origin-top mx-auto">
                       <ResumePreview resumeData={templateData} />
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mb-4 h-10">{details.description}</p>
                  <Button onClick={() => handleUseTemplate(templateData)}>
                    Use This Template
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
