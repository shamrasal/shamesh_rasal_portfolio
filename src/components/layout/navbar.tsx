"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/magnetic-button";

export function Navbar() {
  const sectionIds = portfolio.navSections.map((s) => s.id);
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-2 left-0 right-0 z-50 mx-auto max-w-6xl px-4 transition-all",
        scrolled ? "top-2" : "top-4",
      )}
    >
      <motion.nav
        className="glass flex items-center justify-between rounded-2xl px-4 shadow-lg shadow-indigo-500/10"
        animate={{ paddingTop: scrolled ? 8 : 12, paddingBottom: scrolled ? 8 : 12 }}
        transition={{ duration: 0.25 }}
        aria-label="Primary"
      >
        <button
          type="button"
          className="font-semibold text-white"
          onClick={() => scrollToSection("hero")}
        >
          SR
        </button>
        <ul className="hidden md:flex items-center gap-1">
          {portfolio.navSections
            .filter((s) => s.id !== "hero")
            .map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition",
                    active === section.id ? "text-white" : "text-zinc-400 hover:text-white",
                  )}
                >
                  {active === section.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">{section.label}</span>
                </button>
              </li>
            ))}
        </ul>
        <div className="hidden md:block">
          <MagneticButton>
            <Button variant="glass" size="sm" onClick={() => scrollToSection("contact")}>
              Hire me
            </Button>
          </MagneticButton>
        </div>
        <button
          type="button"
          className="md:hidden text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>
      {open ? (
        <div className="md:hidden mt-2 glass rounded-2xl p-3">
          {portfolio.navSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="block w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-white"
              onClick={() => {
                scrollToSection(section.id);
                setOpen(false);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
