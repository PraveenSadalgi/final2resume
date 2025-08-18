
"use client";

import { useRouter } from "next/navigation";
import type { ResumeData } from "@/lib/types";
import { allTemplates, templateDetails } from "@/lib/mock-data";
import ResumePreview from "@/components/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
            {allTemplates.map((templateData, index) => {
              const details = templateDetails[templateData.template];
              return (
                <motion.div
                  key={templateData.template}
                  className="group flex flex-col items-center gap-4 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleUseTemplate(templateData)}
                >
                  <div className="w-full max-w-[600px] rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-primary/40 group-hover:scale-105 transform">
                     <ResumePreview resumeData={templateData} />
                  </div>
                  <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-1 transition-colors group-hover:text-primary">{details.name}</h2>
                      <p className="text-sm text-muted-foreground max-w-md">{details.description}</p>
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
