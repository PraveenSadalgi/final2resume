
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
} from "lucide-react";
import { Badge } from "../ui/badge";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function TechnicalTemplate({ resumeData }: TemplateProps) {
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
    <section className={`mb-5 ${className}`}>
      <h2 className="text-[11pt] font-semibold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10pt] leading-relaxed">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
          {location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {location}</span>}
          {email && <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-primary">{email}</a>}
          {phone && <span>{phone}</span>}
          {linkedin && <a href={`https://${linkedin}`} className="flex items-center gap-1.5 hover:text-primary">linkedin.com/in/...</a>}
          {github && <a href={`https://${github}`} className="flex items-center gap-1.5 hover:text-primary">github.com/...</a>}
        </div>
      </header>

       {summary && (
        <Section title="Summary">
            <p className="text-xs text-gray-700">{summary}</p>
        </Section>
       )}
      
      <Section title="Skills">
        <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-medium rounded">
                {skill}
                </Badge>
            ))}
        </div>
      </Section>

      <Section title="Experience">
        {experience.map((exp) => (
        <div key={exp.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline mb-0.5">
            <div>
                <h3 className="font-bold text-base text-gray-800">{exp.role}</h3>
                <p className="text-sm font-semibold text-primary">{exp.company}</p>
            </div>
            <span className="text-xs font-normal text-gray-500">{exp.date}</span>
            </div>
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
      
      {projects.length > 0 && (
        <Section title="Personal Projects">
            {projects.map((proj) => (
            <div key={proj.id} className="mb-3 last:mb-0">
                <h3 className="font-bold text-sm">{proj.name}</h3>
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

      <Section title="Education">
        {education.map((edu) => (
        <div key={edu.id} className="flex justify-between items-baseline">
            <div>
                <h3 className="font-bold text-sm">{edu.school}</h3>
                <p className="text-xs text-gray-600">{edu.degree}</p>
            </div>
            <span className="text-xs font-normal text-gray-500">{edu.date}</span>
        </div>
        ))}
      </Section>
    </div>
  );
}
