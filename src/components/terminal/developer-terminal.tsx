"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { runTerminalCommand, type TerminalLine } from "@/utils/terminal";
import { GlassCard } from "@/components/ui/glass-card";

export function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "Welcome. Type `help` to explore this portfolio." },
  ]);

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const next: TerminalLine[] = [
      ...lines,
      { type: "input", text: `> ${trimmed}` },
      ...runTerminalCommand(trimmed, portfolio),
    ];
    if (trimmed.toLowerCase() === "clear") {
      setLines([]);
    } else {
      setLines(next);
    }
    setInput("");
  };

  return (
    <GlassCard className="font-mono text-sm">
      <div className="mb-3 text-xs text-zinc-500">Developer Terminal</div>
      <div className="h-48 overflow-y-auto space-y-1 text-zinc-300" aria-live="polite">
        {lines.map((line, i) => (
          <p
            key={`${line.type}-${i}`}
            className={
              line.type === "error"
                ? "text-red-400"
                : line.type === "input"
                  ? "text-cyan-300"
                  : "text-zinc-300"
            }
          >
            {line.text}
          </p>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <span className="text-cyan-400">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="flex-1 bg-transparent outline-none text-white"
          aria-label="Terminal command input"
          placeholder="help"
        />
      </div>
    </GlassCard>
  );
}
