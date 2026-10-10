"use client";

import { useCallback, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { GlobalBackground } from "@/components/background/global-background";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { SkillsOrbit } from "@/components/skills/skills-orbit";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { TechOrbit } from "@/components/skills/tech-orbit";
import { Achievements } from "@/components/achievements/achievements";
import { ResumeSection } from "@/components/resume/resume-section";
import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/footer/footer";
import { DeveloperTerminal } from "@/components/terminal/developer-terminal";
import { Container } from "@/components/layout/container";

export function PortfolioShell() {
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);
  useLenis(ready);

  return (
    <>
      {!ready ? <LoadingScreen onComplete={onLoaded} /> : null}
      <a href="#hero" className="skip-link">Skip to content</a>
      <GlobalBackground />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <main id="main-content">
        <Hero />
        <About />
        <ExperienceTimeline />
        <SkillsOrbit />
        <ProjectsGrid />
        <TechOrbit />
        <Achievements />
        <Container className="pb-10">
          <DeveloperTerminal />
        </Container>
        <ResumeSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
