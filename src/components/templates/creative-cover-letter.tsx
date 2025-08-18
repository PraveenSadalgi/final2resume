
"use client";

import type { ResumeData } from "@/lib/types";
import { Mail, Phone, Globe, MapPin, User, Calendar } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function CreativeCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, email, phone, location, github, experience } = resumeData || {};
  const role = experience?.[0]?.role || "Professional";

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-800 font-sans text-[10pt] leading-relaxed w-full aspect-[8.5/11] flex">
      {/* Sidebar */}
      <aside className="w-[35%] bg-primary/90 text-white p-8 flex flex-col justify-between">
        <div>
            <div className="w-24 h-24 rounded-full bg-muted mb-4 border-4 border-white/50 shadow-lg">
                <img src={`https://placehold.co/96x96.png`} alt={name} data-ai-hint="profile picture" className="rounded-full w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold leading-tight">{name || 'Your Name'}</h1>
            <p className="text-md text-white/80 mt-1">{role}</p>
        </div>
        <div className="text-xs space-y-3">
             <div className="flex items-center gap-3">
                <Mail size={14} />
                <span>{email || 'your.email@example.com'}</span>
            </div>
            <div className="flex items-center gap-3">
                <Phone size={14} />
                <span>{phone || '123-456-7890'}</span>
            </div>
            <div className="flex items-center gap-3">
                <MapPin size={14} />
                <span>{location || 'City, State'}</span>
            </div>
             <div className="flex items-center gap-3">
                <Globe size={14} />
                <span>{github || 'github.com/username'}</span>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[65%] p-10 flex flex-col">
         <div className="text-sm text-gray-600 mb-8 space-y-2">
            <div className="flex items-center gap-2">
                <Calendar size={14} /> <span>{currentDate}</span>
            </div>
             <div className="flex items-center gap-2">
                <User size={14} /> <span>Hiring Manager, [Company Name]</span>
            </div>
         </div>
        
        <div className="text-sm text-gray-700 space-y-4 whitespace-pre-wrap flex-1">
          {coverLetterText}
        </div>

        <footer className="mt-auto pt-8 text-right">
            <p className="text-sm">Sincerely,</p>
            <p className="font-serif text-2xl mt-2 text-primary">{name || 'Your Name'}</p>
        </footer>
      </main>
    </div>
  );
}
