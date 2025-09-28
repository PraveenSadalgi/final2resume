
"use client";

import type { ResumeData } from "@/lib/types";
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  MapPin,
  FolderGit2,
  Award,
  Link,
  Github,
} from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ExecutiveTemplate({ resumeData }: TemplateProps) {
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
    projects,
    achievements,
  } = resumeData;

  const Section = ({
    title,
    children,
    className = ""
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <section className={`mb-6 ${className}`}>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3">
        {title}
      </h2>
      <div className="border-l-2 border-gray-200 pl-4">
        {children}
      </div>
    </section>
  );

  const ensureProtocol = (url: string) => {
    if (!url) return "#";
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };


  return (
    <div className="p-10 bg-white text-gray-800 font-serif text-[10pt] leading-relaxed">
      <header className="text-center mb-8 pb-4 border-b-2 border-primary">
        <h1 className="text-5xl font-thin tracking-wider text-gray-900 uppercase">{name}</h1>
        {experience[0] && <p className="text-lg text-gray-500 mt-1 tracking-widest">{experience[0].role}</p>}
      </header>

      <div className="grid grid-cols-[2fr_1fr] gap-x-12">
        {/* Left Column */}
        <div>
            <p className="text-sm italic text-gray-600 mb-6 text-center">{summary}</p>
            
            <Section title="Professional Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-5 last:mb-0 relative">
                    <div className="absolute -left-[19.5px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base text-gray-800">{exp.company}</h3>
                        <span className="text-xs font-light text-gray-500">{exp.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 mb-1.5">{exp.role}</p>
                    <div
                        className="text-xs prose prose-sm max-w-none text-gray-700"
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                    {exp.description}
                    </div>
                     {exp.projects && exp.projects.length > 0 && (
                        <div className="mt-2 pl-4">
                            <h4 className="font-semibold text-xs flex items-center gap-2 mb-1 text-primary/90">
                            <FolderGit2 className="h-3.5 w-3.5"/>
                            Key Projects
                            </h4>
                            <div className="space-y-1.5">
                            {exp.projects.map(p => (
                                <div key={p.id} className="pl-4">
                                <p className="font-semibold text-xs text-gray-800">{p.name} <span className="font-normal text-gray-500">- {p.role}</span></p>
                                <p className="text-xs text-gray-600">{p.description}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    )}
                </div>
                ))}
            </Section>

             {projects && projects.length > 0 && (
                 <Section title="Key Projects">
                    {projects.map((proj) => (
                        <div key={proj.id} className="mb-4 last:mb-0 relative">
                            <div className="absolute -left-[19.5px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                             <div className="flex items-center gap-x-2">
                                <h3 className="font-bold text-sm">{proj.name}</h3>
                                {proj.liveLink && (
                                    <a href={ensureProtocol(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:underline">
                                        <Link size={12} />
                                    </a>
                                )}
                                {proj.githubLink && (
                                    <a href={ensureProtocol(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:underline">
                                        <Github size={12} />
                                    </a>
                                )}
                            </div>
                            <div
                            className="text-xs prose prose-sm max-w-none text-gray-700"
                            style={{ whiteSpace: "pre-wrap" }}
                            >
                            {proj.description}
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {achievements && achievements.length > 0 && (
                <Section title="Awards & Achievements">
                    {achievements.map((ach, i) => (
                        <div key={i} className="mb-4 last:mb-0 relative">
                             <div className="absolute -left-[19.5px] top-1 h-2 w-2 rounded-full bg-primary"></div>
                             <p className="text-xs text-gray-700">{ach.replace(/•\s/g, '')}</p>
                        </div>
                    ))}
                </Section>
            )}
        </div>
        {/* Right Column */}
        <div className="border-l border-gray-200 pl-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3">Contact</h2>
             <ul className="space-y-1.5 text-xs text-gray-600 mb-6">
                {location && <li className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0"/> {location}</li>}
                {email && <li className="flex items-start gap-2"><Mail size={12} className="mt-0.5 shrink-0"/> <a href={`mailto:${email}`}>{email}</a></li>}
                {phone && <li className="flex items-start gap-2"><Phone size={12} className="mt-0.5 shrink-0"/> {phone}</li>}
                {github && <li className="flex items-start gap-2"><Globe size={12} className="mt-0.5 shrink-0"/> <a href={ensureProtocol(github)} target="_blank" rel="noopener noreferrer">{github}</a></li>}
                {linkedin && <li className="flex items-start gap-2"><Linkedin size={12} className="mt-0.5 shrink-0"/> <a href={ensureProtocol(linkedin)} target="_blank" rel="noopener noreferrer">{linkedin}</a></li>}
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3">Core Competencies</h2>
             <ul className="text-sm space-y-1">
                    {skills.map((skill) => (
                        <li key={skill} className="text-xs text-gray-700">{skill}</li>
                    ))}
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-3 mt-6">Education</h2>
            {education.map((edu) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
