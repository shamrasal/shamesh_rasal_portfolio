import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Stagger, StaggerItem } from "@/components/animations/stagger";

export function SkillsOrbit() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Interactive stacks across frontend, backend, cloud, and real-time systems."
    >
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skills.map((group) => (
          <StaggerItem key={group.id} hover>
            <GlassCard className="h-full hover:bg-white/[0.08] transition">
              <h3 className="font-medium text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1 text-xs text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
