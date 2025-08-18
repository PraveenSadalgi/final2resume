
"use client";

import type { ResumeData } from "@/lib/types";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData | null;
  coverLetterText: string;
}

export default function ElegantCoverLetter({ resumeData, coverLetterText }: TemplateProps) {
  const { name, email, phone, location, github, experience } = resumeData || {};
  const role = experience?.[0]?.role || "Marketing Manager";

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Split the cover letter to extract the salutation
  const salutationMatch = coverLetterText.match(/^(Dear [^,]+,)/);
  const salutation = salutationMatch ? salutationMatch[1] : "Dear Hiring Manager,";
  const body = salutationMatch ? coverLetterText.substring(salutation.length).trim() : coverLetterText;


  return (
    <div className="bg-[#F8F5F1] text-[#5C5C5C] font-serif text-[10pt] leading-relaxed w-full aspect-[8.5/11] p-10 flex flex-col rounded-lg">
      <header className="flex items-start justify-between pb-8">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex-shrink-0">
             <img src={`https://placehold.co/112x112.png`} alt={name} data-ai-hint="profile picture" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-5xl font-extrabold text-[#2C2C2C] tracking-tight">{name || 'Henrietta Mitchell'}</h1>
            <p className="text-md text-[#A67B7B] tracking-[0.2em] font-sans font-semibold mt-1">{role}</p>
          </div>
        </div>
      </header>

       <main className="flex-1 flex gap-10">
            {/* Contact Info Sidebar */}
            <aside className="w-1/3 space-y-3 pt-2">
                 <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#A67B7B]" />
                    <span className="text-xs">{phone || '123-456-7890'}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#A67B7B]" />
                    <span className="text-xs">{email || 'hello@reallygreatsite.com'}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[#A67B7B]" />
                    <span className="text-xs">{location || '123 Anywhere St., Any City'}</span>
                </div>
                 <div className="flex items-center gap-3">
                    <Globe size={16} className="text-[#A67B7B]" />
                    <span className="text-xs">{github || 'reallygreatsite.com'}</span>
                </div>
            </aside>
            
            {/* Letter Content */}
            <div className="w-2/3 flex-1 flex flex-col">
                <div className="text-right text-xs mb-8">
                    <p className="font-bold text-gray-500 mb-2">TO:</p>
                    <p>[Hiring Manager Name]</p>
                    <p>[Company Name]</p>
                </div>

                <div className="mb-6">
                    <p className="bg-gray-200/60 text-gray-700 font-sans font-bold text-xs tracking-widest py-2 px-4 inline-block">{salutation}</p>
                </div>
                
                <div className="text-xs space-y-4 whitespace-pre-wrap flex-1 text-gray-600">
                    {body}
                </div>
                
                <footer className="mt-auto pt-8">
                    <p className="text-sm">Sincerely,</p>
                    <p className="font-serif text-2xl mt-2">{name || 'Henrietta Mitchell'}</p>
                </footer>
            </div>
       </main>
    </div>
  );
}
