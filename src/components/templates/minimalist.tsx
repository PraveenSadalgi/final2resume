
"use client";

import type { ResumeData } from "@/lib/types";
import {
  FolderKanban,
  FolderGit2,
  Award,
  Link,
  Github
} from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function MinimalistTemplate({ resumeData }: TemplateProps) {
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
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="mb-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
        {title}
      </h2>
      {children}
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
    <div className="p-10 bg-white text-gray-800 font-light text-[10pt] leading-relaxed">
      <header className="text-left mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-5xl font-thin tracking-tighter text-gray-900">{name}</h1>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
          <span>{location}</span>
          <span>&bull;</span>
          <a href={`mailto:${email}`}>{email}</a>
          <span>&bull;</span>
          <span>{phone}</span>
           <span>&bull;</span>
          <a href={ensureProtocol(github)} target="_blank" rel="noopener noreferrer">{github}</a>
           <span>&bull;</span>
          <a href={ensureProtocol(linkedin)} target="_blank" rel="noopener noreferrer">{linkedin}</a>
        </div>
      </header>

      <div className="grid grid-cols-[2fr_1fr] gap-10">
        <div>
            <Section title="Profile">
                <p className="text-sm">{summary}</p>
            </Section>

            <Section title="Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline">
                    <h3 className="font-normal text-base text-gray-800">{exp.role}</h3>
                    <span className="text-xs font-light text-gray-500">{exp.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                    <div
                        className="text-xs prose prose-sm max-w-none text-gray-600"
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
        </div>
        <div>
            <Section title="Education">
                {education.map((edu) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                    <h3 className="font-normal text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                </div>
                ))}
            </Section>

             <Section title="Skills">
                <ul className="list-disc list-inside text-sm space-y-1">
                    {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </Section>
            
            {projects && projects.length > 0 && (
                <Section title="Projects">
                    {projects.map((proj) => (
                    <div key={proj.id} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-x-2">
                           <h3 className="font-normal text-sm">{proj.name}</h3>
                           {proj.liveLink && (
                                <a href={ensureProtocol(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                                    <Link size={12} />
                                </a>
                            )}
                            {proj.githubLink && (
                                <a href={ensureProtocol(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                                    <Github size={12} />
                                </a>
                            )}
                        </div>
                        <div
                        className="text-xs prose prose-sm max-w-none text-gray-600"
                        style={{ whiteSpace: "pre-wrap" }}
                        >
                        {proj.description}
                        </div>
                    </div>
                    ))}
                </Section>
            )}

            {achievements && achievements.length > 0 && (
                <Section title="Achievements">
                     <div
                        className="text-xs prose prose-sm max-w-none text-gray-600 space-y-1"
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                         {achievements.map((ach, i) => <p key={i}>{ach}</p>)}
                    </div>
                </Section>
            )}
        </div>
      </div>
    </div>
  );
}
