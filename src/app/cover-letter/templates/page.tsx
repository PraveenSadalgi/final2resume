
"use client";

import { useRouter } from "next/navigation";
import type { CoverLetterTemplate } from "@/lib/types";
import { allCoverLetterTemplates } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCoverLetterTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                    <Card className="h-full flex flex-col group hover:border-primary transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary" />
                                {template.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                           <p className="text-sm text-muted-foreground flex-1">{template.description}</p>
                           <Button 
                             onClick={() => handleUseTemplate(template)} 
                             className="mt-6 w-full transition-all group-hover:bg-accent group-hover:text-accent-foreground"
                            >
                             Use This Template
                           </Button>
                        </CardContent>
                    </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
