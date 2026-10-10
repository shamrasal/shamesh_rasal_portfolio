"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, svg } from "animejs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ExperienceLine() {
  const reducedMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const target = wrapRef.current?.parentElement;
    if (!path || !target || reducedMotion) return;

    const animation = animate(svg.createDrawable(path), {
      draw: ["0 0", "0 1"],
      ease: "linear",
      autoplay: onScroll({ target, sync: true }),
    });

    return () => {
      animation.pause();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute bottom-2 left-3 top-2 w-2 md:left-4"
      aria-hidden
    >
      <svg className="h-full w-full overflow-visible" viewBox="0 0 2 100" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M1 0 V100"
          fill="none"
          stroke="rgba(34,211,238,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          style={reducedMotion ? { strokeDasharray: "none" } : undefined}
        />
      </svg>
    </div>
  );
}
