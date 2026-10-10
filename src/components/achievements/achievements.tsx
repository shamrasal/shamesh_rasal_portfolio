import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeUp } from "@/components/animations/fade-up";

export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Achievements"
      subtitle="Certifications, delivery milestones, and continuous learning."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {portfolio.achievements.map((item, index) => (
          <FadeUp key={item.id} delay={index * 0.04}>
            <GlassCard className="hover:bg-white/[0.08] transition">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium text-white">{item.title}</h3>
                {item.year ? (
                  <span className="text-xs text-zinc-500">{item.year}</span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-sm uppercase tracking-wide text-zinc-500 mb-3">Learning</h3>
        <ul className="grid gap-2 md:grid-cols-2 text-sm text-zinc-400">
          {portfolio.blogs.map((blog) => (
            <li key={blog.id} className="glass rounded-xl px-4 py-3">
              {blog.title} · {blog.source}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
