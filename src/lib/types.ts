export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

export interface ResumeData {
  template: 'one-column' | 'two-column';
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}
