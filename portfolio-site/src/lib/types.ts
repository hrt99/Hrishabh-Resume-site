export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  profileImage?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  showCode?: boolean;
  showLinks?: boolean;
  certificateUrl?: string;
  certificateFile?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  credentialId?: string;
  url?: string;
  file?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  file?: string;
  url?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements?: Achievement[];
  resumeFile?: string;
  introLetter?: string;
}