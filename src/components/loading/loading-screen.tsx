"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, splitText, stagger, svg } from "animejs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const blobsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const path = pathRef.current;
    const root = rootRef.current;
    const name = nameRef.current;
    if (!path || !root || !name) {
      onComplete();
      return;
    }

    const blobs = blobsRef.current.filter(Boolean) as HTMLDivElement[];
    const split = splitText(name, { chars: { wrap: "clip" } });
    const progressProxy = { value: 0 };

    const timeline = createTimeline({
      defaults: { ease: "out(3)" },
    });

    timeline.add(
      svg.createDrawable(path),
      { draw: ["0 0", "0 1"], duration: 900, ease: "inOut(3)" },
      0,
    );

    if (split.chars?.length) {
      timeline.add(
        split.chars,
        {
          y: ["100%", "0%"],
          opacity: [0, 1],
          duration: 640,
        },
        stagger(65, { from: "center" }),
      );
    }

    if (blobs.length) {
      timeline.add(
        blobs,
        {
          scale: [0.75, 1.2],
          translateX: stagger([-18, 18]),
          translateY: stagger([12, -16]),
          loop: true,
          alternate: true,
          duration: 1600,
          ease: "inOutSine",
        },
        0,
      );
    }

    timeline.add(
      progressProxy,
      {
        value: 100,
        duration: 1700,
        ease: "outCubic",
        onUpdate: () => setProgress(Math.round(progressProxy.value)),
      },
      0,
    );

    timeline.add(
      root,
      {
        opacity: [1, 0],
        scale: [1, 1.06],
        duration: 520,
        ease: "inOutQuad",
        onComplete: () => {
          if (finished.current) return;
          finished.current = true;
          onComplete();
        },
      },
      1900,
    );

    return () => {
      timeline.pause();
      split.revert();
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050508]"
      role="status"
      aria-label="Loading portfolio"
    >
      <div
        ref={(el) => {
          blobsRef.current[0] = el;
        }}
        className="absolute left-[18%] top-[22%] h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <div
        ref={(el) => {
          blobsRef.current[1] = el;
        }}
        className="absolute right-[16%] top-[28%] h-48 w-48 rounded-full bg-cyan-400/25 blur-3xl"
      />
      <div
        ref={(el) => {
          blobsRef.current[2] = el;
        }}
        className="absolute bottom-[18%] left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl"
      />
      <svg width="140" height="90" viewBox="0 0 140 90" className="relative mb-6">
        <path
          ref={pathRef}
          d="M18 62 C18 28 48 18 70 45 C92 72 122 62 122 28"
          fill="none"
          stroke="url(#load-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="load-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <p
        ref={nameRef}
        className="relative text-2xl font-semibold tracking-[0.35em] text-white"
      >
        SHAMESH
      </p>
      <p className="relative mt-6 text-sm text-zinc-400">Initializing experience… {progress}%</p>
    </div>
  );
}
