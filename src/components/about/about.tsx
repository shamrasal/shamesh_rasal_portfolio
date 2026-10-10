"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { portfolio } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { FadeUp } from "@/components/animations/fade-up";

export function About() {
  const reducedMotion = useReducedMotion();
  const [values, setValues] = useState(() =>
    portfolio.stats.map((stat) => (reducedMotion ? stat.value : 0)),
  );
  const started = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setValues(portfolio.stats.map((stat) => stat.value));
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        portfolio.stats.forEach((stat, index) => {
          const proxy = { value: 0 };
          animate(proxy, {
            value: stat.value,
            duration: 1200,
            delay: index * 80,
            ease: "outCubic",
            onUpdate: () => {
              setValues((prev) => {
                const next = [...prev];
                next[index] = Math.round(proxy.value);
                return next;
              });
            },
          });
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Section id="about" title="About" subtitle="Engineering products with clarity, speed, and polish.">
      <div ref={rootRef} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <FadeUp>
          <GlassCard>
            <p className="text-zinc-300 leading-relaxed">{portfolio.personal.summary}</p>
            <pre className="mt-6 rounded-xl bg-black/40 p-4 text-xs text-cyan-200 overflow-x-auto">
              <code>{`const engineer = {
  name: "${portfolio.personal.legalName}",
  location: "${portfolio.personal.location}",
  focus: ["React", "Next.js", "Real-time", "AWS"],
};`}</code>
            </pre>
          </GlassCard>
        </FadeUp>
        <div className="grid grid-cols-2 gap-4">
          {portfolio.stats.map((stat, i) => (
            <FadeUp key={stat.id} delay={i * 0.05}>
              <GlassCard className="text-center">
                <p className="text-3xl font-semibold text-white">
                  {values[i]}
                  {stat.suffix ?? ""}
                </p>
                <p className="mt-2 text-xs text-zinc-400">{stat.label}</p>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}
