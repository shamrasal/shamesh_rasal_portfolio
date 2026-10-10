export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "phone";
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  highlights: string[];
  technologies: string[];
};

export type ProjectCaseStudy = {
  id: string;
  name: string;
  tagline: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: "award" | "certification" | "project" | "learning";
  year?: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  detail?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type TechOrbitItem = {
  id: string;
  name: string;
  years: number;
  projects: number;
  experience: string;
};

export type PortfolioSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
};

export type PortfolioData = {
  personal: {
    name: string;
    legalName: string;
    titles: string[];
    summary: string;
    email: string;
    phone: string;
    location: string;
    resumePath: string;
  };
  social: SocialLink[];
  stats: { id: string; label: string; value: number; suffix?: string }[];
  experience: ExperienceItem[];
  projects: ProjectCaseStudy[];
  skills: SkillCategory[];
  techOrbit: TechOrbitItem[];
  achievements: Achievement[];
  education: EducationItem[];
  certifications: Certification[];
  blogs: { id: string; title: string; source: string }[];
  resume: {
    headline: string;
    downloadLabel: string;
  };
  seo: PortfolioSeo;
  navSections: { id: string; label: string }[];
};
