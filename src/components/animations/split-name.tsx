"use client";

import { useEffect, useRef } from "react";
import { createTimeline, splitText, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SplitName({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const split = splitText(el, { chars: { wrap: "clip" } });
    const timeline = createTimeline({
      defaults: { ease: "out(3)", duration: 700 },
    });

    if (split.chars?.length) {
      timeline.add(
        split.chars,
        { y: ["100%", "0%"], opacity: [0, 1] },
        stagger(40, { from: "center" }),
      );
    }

    return () => {
      timeline.pause();
      split.revert();
    };
  }, [reducedMotion, text]);

  return (
    <span ref={ref} className="text-gradient inline-block">
      {text}
    </span>
  );
}
