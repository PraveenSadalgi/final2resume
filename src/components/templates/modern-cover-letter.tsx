
"use client";

import type { ResumeData } from "@/lib/types";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function ModernCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, email, phone, location, experience } = resumeData || {};
  const role = experience?.[0]?.role || "Professional";

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-800 font-sans text-[11pt] leading-relaxed w-full aspect-[8.5/11] p-12">
        <header className="flex justify-between items-start mb-12">
            <div>
                <h1 className="text-5xl font-extrabold text-gray-800 tracking-tighter">{name || 'Your Name'}</h1>
                <p className="text-lg text-primary font-medium tracking-wide">{role}</p>
            </div>
            <div className="text-right text-xs text-gray-500">
                <p>{email || 'your.email@example.com'}</p>
                <p>{phone || '(123) 456-7890'}</p>
                <p>{location || 'City, State'}</p>
            </div>
        </header>

        <main>
            <p className="text-sm text-gray-500 mb-8">{currentDate}</p>
            <div className="mb-8 text-sm">
                <p className="font-bold">Hiring Manager</p>
                <p>[Company Name]</p>
                <p>[Company Address]</p>
            </div>
            <div className="text-sm text-gray-700 space-y-4 whitespace-pre-wrap">
                {coverLetterText}
            </div>
        </main>
    </div>
  );
}
