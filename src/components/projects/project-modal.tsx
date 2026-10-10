"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { ProjectCaseStudy } from "@/types/portfolio";
import { Button } from "@/components/ui/button";

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectCaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[90] w-[min(92vw,720px)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl glass p-6 focus:outline-none"
          aria-describedby={`project-desc-${project.id}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-white">
                {project.name}
              </Dialog.Title>
              <Dialog.Description
                id={`project-desc-${project.id}`}
                className="text-zinc-400 mt-1"
              >
                {project.tagline}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          <div className="mt-6 space-y-4 text-sm text-zinc-300">
            <div>
              <h4 className="text-white font-medium">Problem</h4>
              <p className="mt-1">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-white font-medium">Solution</h4>
              <p className="mt-1">{project.solution}</p>
            </div>
            <div>
              <h4 className="text-white font-medium">Architecture</h4>
              <p className="mt-1">{project.architecture}</p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.liveUrl ? (
              <Button asChild variant="glass" size="sm">
                <a href={project.liveUrl}>Live Demo</a>
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button asChild variant="ghost" size="sm">
                <a href={project.githubUrl}>GitHub</a>
              </Button>
            ) : null}
          </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
