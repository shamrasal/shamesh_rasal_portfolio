"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function TextScramble({ text, className }: { text: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      el.textContent = text;
      return;
    }

    const animation = animate(el, {
      innerHTML: scrambleText({ text, duration: 700 }),
      duration: 700,
      ease: "linear",
    });

    return () => {
      animation.pause();
    };
  }, [text, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
