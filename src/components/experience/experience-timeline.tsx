import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ExperienceLine } from "@/components/experience/experience-line";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Leading teams and shipping production systems across web, cloud, and real-time products."
    >
      <Stagger className="relative space-y-6">
        <ExperienceLine />
        {portfolio.experience.map((item) => (
          <StaggerItem key={item.id} hover>
            <div className="relative pl-10 md:pl-12">
              <div className="absolute left-1.5 top-6 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] md:left-2.5" />
              <GlassCard>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium text-white">{item.role}</h3>
                    <p className="text-zinc-400">{item.company}</p>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {item.start} – {item.end}
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc pl-5">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
