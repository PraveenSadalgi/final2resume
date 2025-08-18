
"use client";

import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { allTemplates, templateDetails } from "@/lib/mock-data";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function TemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (templateData: ResumeData) => {
    localStorage.setItem("selectedTemplate", JSON.stringify(templateData));
    router.push(`/editor?template=${templateData.template}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-69px)] bg-gradient-to-br from-background via-blue-50 to-indigo-100">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-primary">
            <Link href="/editor">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Choose Your Template</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Select a template that best showcases your experience and skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {allTemplates.map((templateData) => {
              const details = templateDetails[templateData.template];
              return (
                <div key={templateData.template} className="group flex flex-col items-center gap-4">
                    <Card className="w-full max-w-[480px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary">
                      <CardContent className="p-0">
                         <div className="w-full aspect-[8.5/11] overflow-hidden bg-white">
                           <div className="transform scale-[0.6] origin-top mx-auto transition-transform duration-300 ease-in-out group-hover:scale-[0.62]">
                               <ResumePreview resumeData={templateData} />
                            </div>
                         </div>
                      </CardContent>
                    </Card>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-1">{details.name}</h2>
                        <p className="text-sm text-muted-foreground mb-4 h-10">{details.description}</p>
                        <Button onClick={() => handleUseTemplate(templateData)} size="lg">
                            Use This Template
                        </Button>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
