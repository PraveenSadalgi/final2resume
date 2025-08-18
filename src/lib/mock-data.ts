
import type { ResumeData, Template, CoverLetterTemplate } from "./types";

export const classicTemplate: ResumeData = {
  template: "one-column",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  location: "San Francisco, CA",
  github: "github.com/johndoe",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Innovative and results-driven Software Engineer with 5+ years of experience in developing and scaling web applications. Proficient in JavaScript, React, and Node.js. Passionate about building user-friendly interfaces and solving complex problems.",
  experience: [
    {
      id: "exp1",
      role: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      date: "Jan 2021 - Present",
      description:
        "• Led the development of a new microservices architecture, improving system scalability by 40%.\n• Mentored junior engineers, fostering a culture of growth and knowledge sharing.",
      projects: [{id: "work-proj-1", name: "Project Titan", role: "Lead Dev", description: "Oversaw the migration of a monolithic backend to a microservice-based architecture."}],
    },
    {
      id: "exp2",
      role: "Software Engineer",
      company: "Web Innovators",
      date: "Jun 2018 - Dec 2020",
      description:
        "• Developed and maintained client-side features for a high-traffic e-commerce platform using React and Redux.\n• Collaborated with UX/UI designers to implement responsive and accessible user interfaces.",
      projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      date: "2014 - 2018",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "GraphQL", "Docker"],
  projects: [
    {
      id: "proj1",
      name: "AI-Powered Resume Builder",
      description: "• Developed a full-stack web application using Next.js and Genkit to help users create professional resumes with AI-powered suggestions.",
    },
  ],
};

export const professionalTemplate: ResumeData = {
  ...classicTemplate,
  template: "two-column",
  summary: "A highly motivated Software Engineer with a passion for creating efficient, scalable, and user-friendly web applications. Experienced in the full software development lifecycle, from concept to deployment."
};

export const modernTemplate: ResumeData = {
  template: "modern",
  name: "Alex Smith",
  email: "alex.smith@email.com",
  phone: "555-123-4567",
  location: "New York, NY",
  github: "github.com/alexsmith",
  linkedin: "linkedin.com/in/alexsmith",
  summary:
    "Creative and detail-oriented Front-End Developer with a knack for creating beautiful and intuitive user interfaces. Expert in modern JavaScript frameworks and CSS preprocessors. Committed to continuous learning and staying ahead of industry trends.",
  experience: [
    {
      id: "exp1",
      role: "Lead Front-End Developer",
      company: "Innovatech",
      date: "2020 - Present",
      description:
        "• Spearheaded the redesign of the company's flagship product, resulting in a 25% increase in user engagement.\n• Implemented a component-based design system using Storybook, which accelerated development by 30%.",
       projects: [],
    },
     {
      id: "exp2",
      role: "UI Engineer",
      company: "Creative Minds",
      date: "2018 - 2020",
      description:
        "• Translated Figma designs into pixel-perfect, responsive web pages using React and Styled Components.\n• Worked closely with the product team to define feature requirements and improve user experience.",
       projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "Design Institute",
      degree: "B.F.A. in Graphic Design",
      date: "2014 - 2018",
    },
  ],
  skills: ["React", "Vue.js", "Sass", "Figma", "Storybook", "Webpack", "User Experience"],
  projects: [
    {
      id: "proj1",
      name: "Portfolio Website",
      description: "• Designed and built a personal portfolio website from scratch to showcase my work, featuring a clean design and smooth animations.",
    },
  ],
};

export const creativeTemplate: ResumeData = {
  template: "creative",
  name: "Samantha Bee",
  email: "samantha.b@email.co",
  phone: "321-654-0987",
  location: "Austin, TX",
  github: "github.com/sam-bee",
  linkedin: "linkedin.com/in/samantha-bee",
  summary:
    "A versatile Full-Stack Developer with a flair for design and a passion for building innovative products. Thrives in collaborative environments and enjoys tackling complex challenges. Always eager to explore new technologies and push creative boundaries.",
  experience: [
    {
      id: "exp1",
      role: "Full-Stack Developer",
      company: "Nexa Tech",
      date: "2019 - Present",
      description:
        "• Developed a real-time collaborative whiteboard application using WebSockets and Canvas API.\n• Built and maintained a GraphQL API to support the company's mobile and web clients.",
      projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "State University",
      degree: "B.A. in Digital Media",
      date: "2015 - 2019",
    },
  ],
  skills: ["Node.js", "GraphQL", "React Native", "WebSockets", "Python", "Adobe Creative Suite"],
  projects: [
    {
      id: "proj1",
      name: "Interactive Art Installation",
      description: "• Created an interactive art piece using Processing and Arduino that reacts to audience movement.",
    },
     {
      id: "proj2",
      name: "Indie Game Project",
      description: "• Developed a 2D platformer game using the Godot engine, handling both programming and art.",
    },
  ],
};


export const minimalistTemplate: ResumeData = {
  template: "minimalist",
  name: "David Chen",
  email: "david.chen@me.com",
  phone: "111-222-3333",
  location: "Seattle, WA",
  github: "github.com/davidchen",
  linkedin: "linkedin.com/in/davidchen",
  summary:
    "Backend Engineer specializing in building robust, scalable, and maintainable systems. Proficient in Go and Python, with extensive experience in cloud computing and database management. A firm believer in clean code and elegant solutions.",
  experience: [
    {
      id: "exp1",
      role: "Backend Engineer",
      company: "CloudCore",
      date: "2017 - Present",
      description:
        "• Designed and implemented a distributed data processing pipeline using Kafka and Go, handling millions of events per day.\n• Optimized database queries and schema, reducing API response times by 50%.",
       projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "Institute of Technology",
      degree: "M.S. in Computer Science",
      date: "2015 - 2017",
    },
  ],
  skills: ["Go", "Python", "Kubernetes", "Docker", "PostgreSQL", "AWS", "System Design"],
  projects: [
     {
      id: "proj1",
      name: "Open Source Contribution",
      description: "• Contributed to an open-source distributed database project, implementing a new feature for snapshot isolation.",
    },
  ],
};

export const technicalTemplate: ResumeData = {
  template: "technical",
  name: "Maria Garcia",
  email: "maria.garcia@cloud.dev",
  phone: "444-555-6666",
  location: "Raleigh, NC",
  github: "github.com/mgarcia",
  linkedin: "linkedin.com/in/mariagarcia",
  summary:
    "Site Reliability Engineer (SRE) with a strong background in automating, scaling, and securing cloud infrastructure. Proven ability to reduce downtime and improve system performance through proactive monitoring and incident response. Expert in containerization and orchestration technologies.",
  experience: [
    {
      id: "exp1",
      role: "Site Reliability Engineer",
      company: "DataStax",
      date: "2019 - Present",
      description:
        "• Developed and managed Kubernetes operators for automated database cluster management, reducing manual intervention by 80%.\n• Implemented a centralized logging and monitoring stack using Prometheus and Grafana, providing real-time insights into system health.",
       projects: [],
    },
     {
      id: "exp2",
      role: "DevOps Engineer",
      company: "Appify",
      date: "2017 - 2019",
      description:
        "• Built and maintained CI/CD pipelines for a suite of microservices, enabling developers to deploy code multiple times a day.\n• Managed AWS infrastructure using Terraform, ensuring consistent and repeatable environments.",
       projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "State College of Engineering",
      degree: "B.S. in Information Technology",
      date: "2013 - 2017",
    },
  ],
  skills: ["Kubernetes", "Terraform", "Ansible", "Prometheus", "Grafana", "CI/CD", "AWS", "GCP", "Python", "Bash"],
  projects: [],
};

export const executiveTemplate: ResumeData = {
  template: "executive",
  name: "James Maxwell",
  email: "j.maxwell@executive.com",
  phone: "777-888-9999",
  location: "Chicago, IL",
  github: "github.com/jmaxwell",
  linkedin: "linkedin.com/in/jamesmaxwell",
  summary:
    "Accomplished technology leader with over 15 years of experience driving product strategy, engineering execution, and team leadership for high-growth SaaS companies. A strategic thinker with a track record of delivering innovative products, scaling engineering organizations, and achieving business goals.",
  experience: [
    {
      id: "exp1",
      role: "Vice President of Engineering",
      company: "ScaleUp Solutions",
      date: "2018 - Present",
      description:
        "• Grew the engineering team from 20 to 100+ members, fostering a high-performance culture of innovation and accountability.\n• Led the successful launch of three major enterprise products, contributing to a 200% increase in annual recurring revenue (ARR).\n• Defined the company's long-term technology vision and roadmap, aligning engineering efforts with strategic business objectives.",
       projects: [],
    },
     {
      id: "exp2",
      role: "Director of Software Development",
      company: "Innovate Corp",
      date: "2012 - 2018",
      description:
        "• Managed multiple agile development teams responsible for the company's core product suite.\n• Oversaw the migration from a monolithic architecture to a modern, scalable microservices platform.",
       projects: [],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "Metropolitan University",
      degree: "MBA, Technology Management",
      date: "2010 - 2012",
    },
    {
      id: "edu2",
      school: "University of Science",
      degree: "B.S. in Computer Engineering",
      date: "2002 - 2006",
    },
  ],
  skills: ["Strategic Planning", "Product Management", "Team Leadership", "Budgeting & P&L", "Agile Methodologies", "SaaS", "Cloud Architecture", "Go-to-Market Strategy"],
  projects: [],
};


export const allTemplates: ResumeData[] = [
  classicTemplate,
  professionalTemplate,
  modernTemplate,
  creativeTemplate,
  minimalistTemplate,
  technicalTemplate,
  executiveTemplate,
];

export const templateDetails: Record<Template, { name: string; description: string }> = {
    'one-column': { name: 'Classic', description: 'A timeless, single-column format that’s easy to read and universally accepted.' },
    'two-column': { name: 'Professional', description: 'A space-efficient two-column layout that separates skills and contact info for clarity.' },
    'modern': { name: 'Modern', description: 'A clean and stylish design with a focus on typography and visual hierarchy.' },
    'creative': { name: 'Creative', description: 'A unique and visually engaging template perfect for artists, designers, and developers.' },
    'minimalist': { name: 'Minimalist', description: 'A simple, elegant, and content-focused template that projects confidence and clarity.' },
    'technical': { name: 'Technical', description: 'A clean, structured, and ATS-friendly format perfect for technical and engineering roles.' },
    'executive': { name: 'Executive', description: 'A sophisticated and authoritative design for senior-level and leadership positions.' },
};

// Cover Letter Templates

export const professionalCoverLetterTemplate: CoverLetterTemplate = {
    id: 'cl-professional',
    name: 'Professional',
    description: 'A classic design with a modern touch. Features a clean header and footer, perfect for corporate applications.',
    component: 'ProfessionalCoverLetter',
    prompt: `
      Structure the cover letter with a clear header and footer.
      1. **Header:** The user's name and contact information should be at the top.
      2. **Date:** Include the current date.
      3. **Recipient:** Address the hiring manager formally.
      4. **Body:** Write a 3-4 paragraph letter connecting the user's resume to the job description. Maintain a professional tone.
      5. **Closing:** End with a formal closing (e.g., "Sincerely,") and the user's name.
      6. **Footer:** Repeat the contact information in a clean footer design.
    `
};

export const creativeCoverLetterTemplate: CoverLetterTemplate = {
    id: 'cl-creative',
    name: 'Creative',
    description: 'A stylish and modern template with a sidebar, perfect for creative fields.',
    component: 'CreativeCoverLetter',
    prompt: `
      Structure the cover letter with a distinct sidebar for contact details.
      1.  **Introduction:** State the role and express excitement about the company.
      2.  **Body Paragraph 1:** Connect skills to the top job requirements.
      3.  **Body Paragraph 2:** Elaborate on a key project or accomplishment.
      4.  **Conclusion:** Reiterate interest and thank the hiring manager.
    `
};

export const modernCoverLetterTemplate: CoverLetterTemplate = {
    id: 'cl-modern',
    name: 'Modern',
    description: 'A clean and minimalist design that is easy to read and focuses on the content.',
    component: 'ModernCoverLetter',
    prompt: `
      Generate a modern, minimalist cover letter.
      - Start with a clean header with the user's name and title.
      - Use bullet points to highlight 3-4 key qualifications that match the job description.
      - Expand on one of the points in a short paragraph.
      - Close with a confident call to action.
    `
};


export const corporateCoverLetterTemplate: CoverLetterTemplate = {
    id: 'cl-corporate',
    name: 'Corporate',
    description: 'A sophisticated design with a stylish header and footer, perfect for corporate and formal applications.',
    component: 'CorporateCoverLetter',
    prompt: `
      Generate a formal and professional cover letter.
      - Start with the user's name and address at the top.
      - Include the date.
      - Address the recipient formally (e.g., "Dear Hiring Manager," or "To whom it may concern,").
      - The body should be 3-4 paragraphs long, clearly articulating the user's qualifications and alignment with the job description.
      - Maintain a respectful and professional tone throughout.
      - End with a formal closing (e.g., "Sincerely," or "Kind regards,"), followed by the user's name.
    `
};

export const elegantCoverLetterTemplate: CoverLetterTemplate = {
    id: 'cl-elegant',
    name: 'Elegant',
    description: 'A refined and stylish template with a focus on typography and clean aesthetics, perfect for creative or modern roles.',
    component: 'ElegantCoverLetter',
    prompt: `
      Generate a cover letter with a distinct salutation.
      1. **Salutation:** Start with a clear and direct salutation, like "Dear [Hiring Manager Name],". This should be the very first part of the text.
      2. **Body:** Follow the salutation with 3-4 paragraphs that are professional and engaging.
         - **Intro:** State the position and your interest.
         - **Body Paragraphs:** Connect your experience to the job description, highlighting key skills and achievements.
         - **Conclusion:** Express your enthusiasm and include a call to action for an interview.
      3. **Closing:** End with a professional closing like "Sincerely,". Do not include your name after the closing; the template will handle that.
    `
};


export const allCoverLetterTemplates: CoverLetterTemplate[] = [
    professionalCoverLetterTemplate,
    creativeCoverLetterTemplate,
    modernCoverLetterTemplate,
    corporateCoverLetterTemplate,
    elegantCoverLetterTemplate,
];
