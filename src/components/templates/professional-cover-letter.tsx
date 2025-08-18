
"use client";

import type { ResumeData } from "@/lib/types";
import { Mail, Phone, Globe } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function ProfessionalCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, email, phone, location, github } = resumeData || {};
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-800 font-sans text-[10pt] leading-relaxed w-full aspect-[8.5/11] flex flex-col">
      {/* Header */}
      <header className="relative p-10 pb-2">
        <div className="absolute top-0 left-0 w-full h-24 bg-primary/5"></div>
         <div className="relative z-10">
            <h1 className="text-4xl font-bold text-primary">{name || 'Olivia Wilson'}</h1>
            <p className="text-sm text-gray-500 mt-1">{location || '123 Anywhere St., Any City, ST 12345'}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-10 py-6">
        <p className="text-sm text-gray-600 mb-8">{currentDate}</p>
        <div className="space-y-4 whitespace-pre-wrap text-sm text-gray-700">
          {coverLetterText}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative p-10 pt-4 mt-auto">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-primary/5"></div>
        <div className="relative z-10 flex justify-end items-center gap-6 text-xs text-primary">
            {phone && <div className="flex items-center gap-2"><Phone size={14} /><span>{phone}</span></div>}
            {email && <div className="flex items-center gap-2"><Mail size={14} /><span>{email}</span></div>}
            {github && <div className="flex items-center gap-2"><Globe size={14} /><span>{github}</span></div>}
        </div>
      </footer>
    </div>
  );
}
