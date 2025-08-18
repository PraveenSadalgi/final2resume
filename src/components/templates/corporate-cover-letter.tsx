
"use client";

import type { ResumeData } from "@/lib/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function CorporateCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, location, email, phone, github, experience } = resumeData || {};
  const role = experience?.[0]?.role || "Professional";

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-800 font-serif text-[11pt] leading-relaxed w-full aspect-[8.5/11] flex flex-col relative overflow-hidden">
        {/* Decorative Header */}
        <header className="absolute top-0 left-0 w-full h-48">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/10"></div>
            <div
                className="absolute -top-12 -left-24 w-72 h-72 rounded-full bg-primary/20"
            />
             <div
                className="absolute top-4 right-[-4rem] w-64 h-64 rounded-full bg-accent/10"
            />
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 px-12 py-10 mt-20 flex flex-col">
            {/* Sender Info */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-primary">{name || 'Your Name'}</h1>
                    <p className="text-lg text-gray-600 mt-1">{role}</p>
                </div>
                 <div className="w-24 h-24 rounded-full bg-muted flex-shrink-0 border-4 border-white shadow-lg">
                   <img src={`https://placehold.co/96x96.png`} alt={name} data-ai-hint="profile picture" className="rounded-full w-full h-full object-cover" />
                </div>
            </div>
            
            {/* Date and Recipient */}
            <div className="mb-8">
                <p className="text-sm text-gray-500">{currentDate}</p>
                <div className="mt-4 text-sm">
                    <p>Hiring Manager</p>
                    <p>[Company Name]</p>
                    <p>[Company Address]</p>
                </div>
            </div>

            {/* Letter Body */}
            <div className="text-sm text-gray-700 space-y-4 whitespace-pre-wrap flex-1">
                {coverLetterText}
            </div>
        </main>

        {/* Decorative Footer */}
        <footer className="relative z-10 h-20 w-full mt-auto">
            <div className="absolute bottom-0 left-0 w-full h-full bg-primary/90"></div>
             <div className="absolute bottom-0 right-0 w-2/3 h-full bg-primary"></div>
              <div className="absolute z-20 bottom-4 left-12 text-white text-xs flex items-center gap-6">
                {phone && <div className="flex items-center gap-2"><Phone size={14} /><span>{phone}</span></div>}
                {email && <div className="flex items-center gap-2"><Mail size={14} /><span>{email}</span></div>}
                {github && <div className="flex items-center gap-2"><Globe size={14} /><span>{github}</span></div>}
            </div>
        </footer>
    </div>
  );
}
