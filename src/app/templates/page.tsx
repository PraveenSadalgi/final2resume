"use client";

import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { allTemplates, templateDetails } from "@/lib/mock-data";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  const router = useRouter();

  const handleUseTemplate = (templateData: ResumeData) => {
    localStorage.setItem("selectedTemplate", JSON.stringify(templateData));
    router.push(`/editor?template=${templateData.template}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-69px)] bg-gradient-to-br from-background via-blue-50 to-indigo-100 antialiased">
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
              Select a template that best showcases your experience and skills. All templates are designed for clarity and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 xl:gap-12">
            {allTemplates.map((templateData, index) => {
              const details = templateDetails[templateData.template];
              return (
                <motion.div
                  key={templateData.template}
                  className="group flex flex-col items-center gap-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="w-full max-w-[500px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-transparent hover:border-primary transform hover:-translate-y-1">
                    <CardContent className="p-2">
                      <div className="w-full aspect-[8.5/11] overflow-hidden bg-white rounded-md">
                        {/* Scale down the preview slightly to fit better and show hover effect */}
                        <div className="transform scale-[0.58] origin-top mx-auto transition-transform duration-300 ease-in-out group-hover:scale-[0.6]">
                          {/* Ensure ResumePreview component handles the scaled rendering */}
                          <ResumePreview resumeData={templateData} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-1">{details.name}</h2>
                      {/* Added min-h to prevent layout shifts when description height varies */}
                      <p className="text-sm text-muted-foreground mb-4 min-h-[2.5em]">{details.description}</p>
                      <Button onClick={() => handleUseTemplate(templateData)} size="lg">
                          Use This Template
                      </Button>
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
