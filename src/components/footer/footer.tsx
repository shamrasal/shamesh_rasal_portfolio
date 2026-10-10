"use client";

import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/layout/container";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>© 2026 {portfolio.personal.name}. All rights reserved.</p>
        <button
          type="button"
          className="text-zinc-300 hover:text-white transition"
          onClick={() => scrollToSection("hero")}
        >
          Back to top
        </button>
      </Container>
    </footer>
  );
}
