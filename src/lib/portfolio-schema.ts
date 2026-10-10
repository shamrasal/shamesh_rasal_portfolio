import { z } from "zod";
import type { PortfolioData } from "@/types/portfolio";

const socialSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  icon: z.enum(["linkedin", "github", "email", "phone"]),
});

const portfolioSchema = z.object({
  personal: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    titles: z.array(z.string()).min(1),
    summary: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    location: z.string().min(1),
    resumePath: z.string().min(1),
  }),
  social: z.array(socialSchema).min(1),
  stats: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.number(),
      suffix: z.string().optional(),
    }),
  ),
  experience: z.array(z.object({
    id: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    start: z.string(),
    end: z.string(),
    highlights: z.array(z.string()).min(1),
    technologies: z.array(z.string()),
  })).min(1),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    featured: z.boolean(),
    problem: z.string(),
    solution: z.string(),
    architecture: z.string(),
    features: z.array(z.string()),
    techStack: z.array(z.string()),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    image: z.string(),
  })).min(1),
  skills: z.array(z.object({
    id: z.string(),
    title: z.string(),
    items: z.array(z.string()).min(1),
  })),
  techOrbit: z.array(z.object({
    id: z.string(),
    name: z.string(),
    years: z.number(),
    projects: z.number(),
    experience: z.string(),
  })),
  achievements: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(["award", "certification", "project", "learning"]),
    year: z.string().optional(),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    period: z.string(),
    detail: z.string().optional(),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
  })),
  blogs: z.array(z.object({
    id: z.string(),
    title: z.string(),
    source: z.string(),
  })),
  resume: z.object({
    headline: z.string(),
    downloadLabel: z.string(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    ogImage: z.string(),
  }),
  navSections: z.array(z.object({
    id: z.string(),
    label: z.string(),
  })).min(1),
});

export function parsePortfolio(data: unknown): PortfolioData {
  return portfolioSchema.parse(data) as PortfolioData;
}

export { portfolioSchema };
