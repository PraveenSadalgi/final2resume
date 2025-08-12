
export interface WorkProject {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  projects?: WorkProject[];
}

export interface Education {
  id:string;
  school: string;
  degree: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface CoverLetterData {
  jobDescription: string;
  tone: 'Professional' | 'Creative' | 'Enthusiastic';
  generatedLetter: string;
}

export interface ResumeData {
  template: 'one-column' | 'two-column';
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  coverLetter: CoverLetterData;
}
