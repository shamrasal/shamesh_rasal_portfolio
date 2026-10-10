"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";

export function TechOrbit() {
  const [active, setActive] = useState(portfolio.techOrbit[0]?.id);

  const selected = portfolio.techOrbit.find((t) => t.id === active) ?? portfolio.techOrbit[0];

  return (
    <Section
      id="tech-stack"
      title="Tech Stack"
      subtitle="Technologies I use in production — hover to explore depth."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="z-10 text-center">
            <p className="text-2xl font-semibold">{selected?.name}</p>
            <p className="text-xs text-zinc-400 mt-1">Core stack</p>
          </div>
          {portfolio.techOrbit.map((tech, i) => {
            const angle = (i / portfolio.techOrbit.length) * Math.PI * 2;
            const x = (Math.cos(angle) * 110).toFixed(2);
            const y = (Math.sin(angle) * 110).toFixed(2);
            return (
              <button
                key={tech.id}
                type="button"
                className={`absolute rounded-full px-3 py-1 text-xs border transition ${
                  active === tech.id
                    ? "bg-white/15 border-cyan-300/40 text-white"
                    : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                }`}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                onMouseEnter={() => setActive(tech.id)}
                onFocus={() => setActive(tech.id)}
              >
                {tech.name}
              </button>
            );
          })}
        </div>
        <GlassCard>
          <h3 className="text-lg font-medium">{selected?.name}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Years</dt>
              <dd>{selected?.years}+</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Projects</dt>
              <dd>{selected?.projects}+</dd>
            </div>
            <div>
              <dt className="text-zinc-500 mb-1">Experience</dt>
              <dd className="text-zinc-300">{selected?.experience}</dd>
            </div>
          </dl>
        </GlassCard>
      </div>
    </Section>
  );
}
