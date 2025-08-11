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

export default function OneColumnTemplate({ resumeData }: TemplateProps) {
  const {
    name,
    email,
    phone,
    location,
    website,
    linkedin,
    summary,
    experience,
    education,
    skills,
  } = resumeData;

  const Section = ({
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
    <div className="p-8 bg-white text-gray-800 text-[10pt] leading-snug">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">{name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2">
          {location && <span className="flex items-center gap-1.5"><MapPin size={12} /> {location}</span>}
          {email && <span className="flex items-center gap-1.5"><Mail size={12} /> {email}</span>}
          {phone && <span className="flex items-center gap-1.5"><Phone size={12} /> {phone}</span>}
          {website && <span className="flex items-center gap-1.5"><Globe size={12} /> {website}</span>}
          {linkedin && <span className="flex items-center gap-1.5"><Linkedin size={12} /> {linkedin}</span>}
        </div>
      </header>

      <p className="text-center text-sm mb-6">{summary}</p>

      <Section title="Professional Experience" Icon={Briefcase}>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base">{exp.role}</h3>
              <span className="text-xs font-medium text-gray-600">{exp.date}</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">{exp.company}</p>
            <div
              className="text-xs prose prose-sm max-w-none text-gray-600"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {exp.description}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Education" Icon={GraduationCap}>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold">{edu.school}</h3>
              <span className="text-xs font-medium text-gray-600">{edu.date}</span>
            </div>
            <p className="text-sm">{edu.degree}</p>
          </div>
        ))}
      </Section>

      <Section title="Skills" Icon={Lightbulb}>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      </Section>
    </div>
  );
}
