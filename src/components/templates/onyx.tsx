
"use client";

import type { ResumeData } from "@/lib/types";
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  MapPin,
  Github,
  Link as LinkIcon,
  UserCircle,
  Calendar,
} from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function OnyxTemplate({ resumeData }: TemplateProps) {
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
    imageUrl,
  } = resumeData;

  const ensureProtocol = (url: string) => {
    if (!url) return "#";
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };
  
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">{title}</h2>
        {children}
    </section>
  );

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10pt] leading-relaxed">
      <header className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
          <div className="text-xs text-gray-600 mt-2 space-y-1">
             <p>{phone}</p>
             <p><a href={`mailto:${email}`} className="hover:text-primary">{email}</a></p>
             {github && <p><a href={ensureProtocol(github)} className="hover:text-primary">{github}</a></p>}
          </div>
        </div>
        <div className="w-24 h-24 rounded-md bg-muted flex-shrink-0 border flex items-center justify-center">
            {imageUrl ? (
                <img src={imageUrl} alt={name} className="rounded-md w-full h-full object-cover" />
            ) : (
                <UserCircle className="w-16 h-16 text-gray-300" />
            )}
        </div>
      </header>

      {summary && <p className="text-xs text-gray-700 mb-4">{summary}</p>}

      <Section title="Education">
         {education.map((edu) => (
            <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-base">{edu.school}</h3>
                    <div className="text-xs font-medium text-gray-600 flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{edu.date}</span>
                    </div>
                </div>
                <p className="text-sm">{edu.degree}</p>
            </div>
        ))}
      </Section>

      <Section title="Experience">
        {experience.map((exp) => (
          <div key={exp.id} className="mb-3 last:mb-0">
            <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">{exp.role}</h3>
                <div className="text-xs font-medium text-gray-600 flex items-center gap-2">
                    <Calendar size={12} />
                    <span>{exp.date}</span>
                </div>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{exp.company}</p>
            <div
              className="text-xs prose prose-sm max-w-none text-gray-600"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {exp.description}
            </div>
          </div>
        ))}
      </Section>

       {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3 last:mb-0">
                <h3 className="font-bold text-base flex items-center gap-x-2">{proj.name}
                  {proj.githubLink && <a href={ensureProtocol(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">Repo</a>}
                  {proj.liveLink && <> | <a href={ensureProtocol(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">Live</a></>}
                </h3>
              <div
                className="text-xs prose prose-sm max-w-none text-gray-600 mt-1"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {proj.description}
              </div>
            </div>
          ))}
        </Section>
      )}

      <Section title="Skills">
        <div
            className="text-xs prose prose-sm max-w-none text-gray-600"
            style={{ whiteSpace: "pre-wrap" }}
        >
            {skills.map(skill => `• ${skill}`).join('\n')}
        </div>
      </Section>

       {achievements && achievements.length > 0 && (
        <Section title="Achievements">
          <div
            className="text-xs prose prose-sm max-w-none text-gray-600 space-y-1"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {achievements.map((ach) => ach).join('\n')}
          </div>
        </Section>
      )}

    </div>
  );
}
