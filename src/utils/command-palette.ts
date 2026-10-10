import type { PortfolioData } from "@/types/portfolio";

export type CommandItem = {
  id: string;
  label: string;
  group: string;
  keywords: string;
  action: "scroll" | "download" | "link";
  target: string;
};

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function buildCommandItems(data: PortfolioData): CommandItem[] {
  const sectionItems: CommandItem[] = data.navSections.map((section) => ({
    id: `section-${section.id}`,
    label: `Go to ${section.label}`,
    group: "Sections",
    keywords: `${section.label} ${section.id}`,
    action: "scroll",
    target: section.id,
  }));

  const projectItems: CommandItem[] = data.projects.map((project) => ({
    id: `project-${project.id}`,
    label: `Project: ${project.name}`,
    group: "Projects",
    keywords: `${project.name} ${project.tagline} ${project.techStack.join(" ")}`,
    action: "scroll",
    target: "projects",
  }));

  const socialItems: CommandItem[] = data.social.map((link) => ({
    id: `social-${link.id}`,
    label: link.label,
    group: "Social",
    keywords: link.label,
    action: "link",
    target: link.href,
  }));

  const resumeItem: CommandItem = {
    id: "resume-download",
    label: data.resume.downloadLabel,
    group: "Resume",
    keywords: "resume cv pdf download",
    action: "download",
    target: data.personal.resumePath,
  };

  return [...sectionItems, ...projectItems, ...socialItems, resumeItem];
}

export function filterCommandItems(items: CommandItem[], query: string): CommandItem[] {
  const normalized = normalizeQuery(query);
  if (!normalized) return items;
  return items.filter((item) => {
    const haystack = `${item.label} ${item.keywords} ${item.group}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
