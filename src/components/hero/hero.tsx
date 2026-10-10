"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Link2, Mail, Phone } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { scrollToSection } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { HeroSceneFallback } from "@/components/three/hero-scene";
import { TextScramble } from "@/components/animations/text-scramble";
import { SplitName } from "@/components/animations/split-name";
import { MagneticButton } from "@/components/animations/magnetic-button";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <HeroSceneFallback /> },
);

const iconMap = {
  linkedin: Link2,
  github: GitBranch,
  email: Mail,
  phone: Phone,
};

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setTitleIndex((i) => (i + 1) % portfolio.personal.titles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 scroll-mt-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80 mb-4">
              Portfolio OS
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              <SplitName text={portfolio.personal.name} />
            </h1>
            <p className="mt-4 text-xl text-zinc-300 min-h-[2rem]">
              <TextScramble text={portfolio.personal.titles[titleIndex]} />
            </p>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl">
              {portfolio.personal.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button onClick={() => scrollToSection("projects")}>View Projects</Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="glass" onClick={() => scrollToSection("contact")}>
                  Contact Me
                </Button>
              </MagneticButton>
            </div>
            <div className="mt-8 flex gap-3">
              {portfolio.social.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="glass rounded-full p-2.5 text-zinc-300 hover:text-white transition"
                    aria-label={link.label}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
          <div>{reducedMotion ? <HeroSceneFallback /> : <HeroScene />}</div>
        </div>
      </Container>
    </section>
  );
}
