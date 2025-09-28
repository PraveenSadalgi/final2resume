
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
  UserCircle,
  FolderKanban,
  FolderGit2,
  Award,
  Link,
  Github,
} from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

export default function CreativeTemplate({ resumeData }: TemplateProps) {
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

  const SectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-xl font-bold text-primary tracking-wide mb-3">{title}</h2>
  );
  
  const ensureProtocol = (url: string) => {
    if (!url) return "#";
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };


  return (
    <div className="flex h-full bg-white text-gray-800 text-[9.5pt] leading-normal font-serif">
      {/* Sidebar */}
      <aside className="w-[280px] bg-neutral-50 text-gray-700 p-6 flex flex-col">
        <div className="text-center mb-8">
          <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
             {imageUrl ? (
                <img src={imageUrl} alt={name} className="rounded-full w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full rounded-full bg-primary/10"></div>
             )}
          </div>
          <h1 className="text-3xl font-bold text-primary leading-tight">{name}</h1>
          {experience[0] && <p className="text-md text-gray-600 mt-1">{experience[0].role}</p>}
        </div>

        <div className="space-y-4 text-xs">
           <div className="flex items-start gap-2.5">
            <Mail size={14} className="mt-0.5 shrink-0 text-primary" />
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>{phone}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>{location}</span>
          </div>
           <div className="flex items-start gap-2.5">
            <Globe size={14} className="mt-0.5 shrink-0 text-primary" />
            <a href={ensureProtocol(github)} target="_blank" rel="noopener noreferrer">{github}</a>
          </div>
           <div className="flex items-start gap-2.5">
            <Linkedin size={14} className="mt-0.5 shrink-0 text-primary" />
            <a href={ensureProtocol(linkedin)} target="_blank" rel="noopener noreferrer">{linkedin}</a>
          </div>
        </div>

        <div className="mt-auto pt-8">
            <SectionTitle title="Skills" />
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill} className="text-xs bg-primary/10 text-primary py-1 px-2 rounded">{skill}</span>
                ))}
            </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <section className="mb-6">
          <SectionTitle title="About Me" />
          <p className="text-sm text-gray-600">{summary}</p>
        </section>
        
        <section className="mb-6">
          <SectionTitle title="Experience" />
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="relative pl-5">
                 <div className="absolute left-0 top-1.5 h-full w-px bg-gray-200"></div>
                 <div className="absolute left-[-3px] top-1.5 h-2 w-2 rounded-full bg-primary"></div>
                 <p className="text-xs text-gray-500 mb-0.5">{exp.date}</p>
                 <h3 className="font-bold text-base">{exp.role}</h3>
                 <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
                 <div
                    className="text-xs prose prose-sm max-w-none text-gray-500"
                    style={{ whiteSpace: "pre-wrap" }}
                    >
                    {exp.description}
                </div>
                 {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                        <h4 className="font-bold text-sm flex items-center gap-2 mb-1">
                        <FolderGit2 className="h-4 w-4 text-primary/80"/>
                        Key Projects
                        </h4>
                        {exp.projects.map(p => (
                        <div key={p.id} className="mb-2 last:mb-0">
                            <p className="font-semibold text-xs">{p.name} <span className="font-normal text-gray-500">- {p.role}</span></p>
                            <p className="text-xs text-gray-600">{p.description}</p>
                        </div>
                        ))}
                    </div>
                 )}
              </div>
            ))}
          </div>
        </section>

         {projects && projects.length > 0 && (
          <section className="mb-6">
            <SectionTitle title="Projects" />
            <div className="space-y-3">
              {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-x-3">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        {proj.liveLink && (
                            <a href={ensureProtocol(proj.liveLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                <Link size={14} />
                            </a>
                        )}
                        {proj.githubLink && (
                            <a href={ensureProtocol(proj.githubLink)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                <Github size={14} />
                            </a>
                        )}
                    </div>
                      <div
                          className="text-xs prose prose-sm max-w-none text-gray-500"
                          style={{ whiteSpace: "pre-wrap" }}
                          >
                          {proj.description}
                      </div>
                  </div>
              ))}
            </div>
          </section>
         )}

        {achievements && achievements.length > 0 && (
          <section className="mb-6">
            <SectionTitle title="Achievements" />
            <div
              className="text-xs prose prose-sm max-w-none text-gray-500 space-y-1"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {achievements.map((ach, i) => <p key={i}>{ach}</p>)}
            </div>
          </section>
        )}

        <section>
          <SectionTitle title="Education" />
           <div className="space-y-3">
             {education.map((edu) => (
                <div key={edu.id}>
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                </div>
            ))}
           </div>
        </section>
      </main>
    </div>
  );
}
