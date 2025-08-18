
"use client";

import type { ResumeData } from "@/lib/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function CorporateCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, location, email, phone, github } = resumeData || {};
  const addressLines = location?.split(', ');

  // A simple way to get the current date, you might want to format it differently
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-800 font-serif text-[11pt] leading-relaxed w-full aspect-[8.5/11] flex flex-col">
      <header className="relative h-28">
         <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 816 112" preserveAspectRatio="none">
            <path d="M0 0 C200 80, 600 0, 816 60 L816 0 Z" fill="#4A4E69" />
        </svg>
      </header>

      <main className="flex-1 px-12 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{name || 'Olivia Wilson'}</h1>
           <address className="not-italic text-sm text-gray-600 mt-2">
            {addressLines?.[0] || '123 Anywhere St.'}<br/>
            {addressLines?.[1] || 'Any City'}, {addressLines?.[2] || 'ST 12345'}
           </address>
        </div>

        <p className="text-sm font-semibold text-gray-700 mb-8">{currentDate}</p>

        <div className="text-sm text-gray-700 space-y-4 whitespace-pre-wrap">
            {coverLetterText}
        </div>
      </main>

      <footer className="relative h-24 mt-auto">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 816 96" preserveAspectRatio="none">
            <path d="M0 96 C200 16, 600 96, 816 36 V 96 Z" fill="#4A4E69" />
        </svg>
         <div className="absolute bottom-4 right-12 text-white text-xs flex items-center gap-6">
            <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{phone || '+123-456-7890'}</span>
            </div>
             <div className="flex items-center gap-2">
                <Mail size={14} />
                 <span>{email || 'hello@reallygreatsite.com'}</span>
            </div>
             <div className="flex items-center gap-2">
                <Globe size={14} />
                 <span>{github || 'www.reallygreatsite.com'}</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
