"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import type { ProjectCaseStudy } from "@/types/portfolio";
import { Section } from "@/components/layout/section";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectModal } from "@/components/projects/project-modal";
import { TiltCard } from "@/components/animations/tilt-card";

export function ProjectsGrid() {
  const [selected, setSelected] = useState<ProjectCaseStudy | null>(null);
  const [open, setOpen] = useState(false);

  const openProject = (project: ProjectCaseStudy) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Case studies with architecture, outcomes, and production learnings."
    >
      <Stagger className="grid gap-6 md:grid-cols-2">
        {portfolio.projects.map((project) => (
          <StaggerItem key={project.id} hover>
            <TiltCard>
            <GradientBorder>
              <button
                type="button"
                className="w-full text-left p-5 hover:bg-white/[0.02] transition rounded-2xl"
                onClick={() => openProject(project)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cyan-300/80">
                      {project.featured ? "Featured" : "Project"}
                    </p>
                    <h3 className="text-xl font-medium text-white mt-1">{project.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{project.tagline}</p>
                  </div>
                  <Image src={project.image} alt="" width={40} height={40} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs text-zinc-400 border border-white/10 rounded-full px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            </GradientBorder>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
      <ProjectModal project={selected} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
