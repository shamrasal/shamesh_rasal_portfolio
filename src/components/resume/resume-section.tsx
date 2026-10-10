import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  return (
    <Section
      id="resume"
      title="Resume"
      subtitle={portfolio.resume.headline}
    >
      <GlassCard className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-white font-medium">{portfolio.personal.legalName}</p>
          <p className="text-sm text-zinc-400 mt-1">
            {portfolio.experience[0]?.role} · {portfolio.personal.location}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            {portfolio.experience.slice(0, 3).map((exp) => (
              <li key={exp.id}>
                {exp.start} – {exp.end}: {exp.role} @ {exp.company}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={portfolio.personal.resumePath} download>
              {portfolio.resume.downloadLabel}
            </a>
          </Button>
          <Button asChild variant="glass">
            <a href={portfolio.personal.resumePath} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </Button>
        </div>
      </GlassCard>
    </Section>
  );
}
