"use client";

import type { ResumeData } from "@/lib/types";
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  Mail,
  Phone,
  Globe,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TwoColumnTemplate({ resumeData }: TemplateProps) {
  const {
    name,
    email,
    phone,
    location,
    github,
    linkedin,
    summary,
    experience,
    education,
    skills,
  } = resumeData;

  const SidebarSection = ({
    title,
    Icon,
    children,
  }: {
    title: string;
    Icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <section className="mb-5">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white mb-2">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      {children}
    </section>
  );

  const MainSection = ({
    title,
    Icon,
    children,
  }: {
    title: string;
    Icon: React.ElementType;
    children: React.ReactNode;
  }) => (
     <section className="mb-6">
      <h2 className="flex items-center gap-3 text-lg font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">
        <Icon className="h-5 w-5" />
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="flex bg-white text-gray-800 text-[9pt] leading-normal h-full">
      {/* Sidebar */}
      <aside className="w-1/3 bg-primary text-white p-6 flex flex-col">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight">{name}</h1>
            {experience[0] && <p className="text-lg text-white/80">{experience[0].role}</p>}
        </div>
        
        <SidebarSection title="Contact" Icon={Mail}>
            <ul className="space-y-1.5 text-xs">
                {location && <li className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0"/> {location}</li>}
                {email && <li className="flex items-start gap-2"><Mail size={12} className="mt-0.5 shrink-0"/> {email}</li>}
                {phone && <li className="flex items-start gap-2"><Phone size={12} className="mt-0.5 shrink-0"/> {phone}</li>}
                {github && <li className="flex items-start gap-2"><Globe size={12} className="mt-0.5 shrink-0"/> {github}</li>}
                {linkedin && <li className="flex items-start gap-2"><Linkedin size={12} className="mt-0.5 shrink-0"/> {linkedin}</li>}
            </ul>
        </SidebarSection>
        
        <SidebarSection title="Education" Icon={GraduationCap}>
             {education.map((edu) => (
                <div key={edu.id} className="mb-2 last:mb-0">
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-xs text-white/80">{edu.school}</p>
                    <p className="text-xs text-white/60">{edu.date}</p>
                </div>
            ))}
        </SidebarSection>

         <SidebarSection title="Skills" Icon={Lightbulb}>
            <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-white/20 text-white text-xs border-0">{skill}</Badge>
                ))}
            </div>
        </SidebarSection>

      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        <section className="mb-6">
            <h2 className="text-lg font-bold text-primary mb-2">Summary</h2>
            <p className="text-xs text-gray-700">{summary}</p>
        </section>

        <MainSection title="Experience" Icon={Briefcase}>
            {experience.map(exp => (
                <div key={exp.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.company}</h3>
                        <span className="text-xs font-medium text-gray-600">{exp.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">{exp.role}</p>
                    <div
                        className="text-xs prose prose-sm max-w-none text-gray-600"
                        style={{ whiteSpace: "pre-wrap" }}
                        >
                        {exp.description}
                    </div>
                </div>
            ))}
        </MainSection>
      </main>
    </div>
  );
}
