
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
  FolderKanban,
  FolderGit2,
  Award,
  Link,
  Github,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function ModernTemplate({ resumeData }: TemplateProps) {
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
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
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
    <div className="p-8 bg-white text-gray-800 font-sans text-[10pt] leading-normal">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{name}</h1>
        {experience[0] && <p className="text-lg text-primary mt-1">{experience[0].role}</p>}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-3">
          {location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {location}</span>}
          {email && <a href={`mailto:${email}`} className="flex items-center gap-1.5"><Mail size={12} /> {email}</a>}
          {phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {phone}</span>}
        </div>
         <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
          {github && <a href={ensureProtocol(github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Globe size={12} /> {github}</a>}
          {linkedin && <a href={ensureProtocol(linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5"><Linkedin size={12} /> {linkedin}</a>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
            <Section title="Summary">
                <p className="text-sm text-gray-700">{summary}</p>
            </Section>

            <Section title="Experience">
                {experience.map((exp) => (
                <div key={exp.id} className="mb-5 last:mb-0">
                    <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-base text-gray-800">{exp.company}</h3>
                    <span className="text-xs font-medium text-gray-500">{exp.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1.5">{exp.role}</p>
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
        <div className="col-span-1">
            <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                        {skill}
                        </Badge>
                    ))}
                </div>
            </Section>

            {projects && projects.length > 0 && (
              <Section title="Projects">
                  {projects.map((proj) => (
                  <div key={proj.id} className="mb-4 last:mb-0">
                      <div className="flex items-center gap-x-2">
                        <h3 className="font-semibold text-sm">{proj.name}</h3>
                        {proj.liveLink && (
                            <a href={ensureProtocol(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                <Link size={12} />
                            </a>
                        )}
                        {proj.githubLink && (
                            <a href={ensureProtocol(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
                    <div className="text-xs prose prose-sm max-w-none text-gray-600 space-y-1">
                        {achievements.map((ach, i) => (
                            <p key={i} className="flex items-start">
                                <Award className="h-3 w-3 mr-2 mt-0.5 shrink-0 text-primary/80" />
                                <span>{ach.replace(/•\s/g, '')}</span>
                            </p>
                        ))}
                    </div>
                </Section>
            )}
            
            <Section title="Education">
                {education.map((edu) => (
                <div key={edu.id} className="mb-3 last:mb-0">
                    <h3 className="font-semibold text-sm">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.degree}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                </div>
                ))}
            </Section>
        </div>
      </div>
    </div>
  );
}
