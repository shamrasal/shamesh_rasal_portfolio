import type { PortfolioData } from "@/types/portfolio";

export type TerminalLine = { type: "input" | "output" | "error"; text: string };

const HELP_TEXT = `Available commands:
  help       Show this message
  projects   List featured projects
  skills     List skill categories
  resume     Download resume PDF
  contact    Show contact details
  clear      Clear terminal`;

export function parseTerminalCommand(input: string): string {
  return input.trim().toLowerCase();
}

export function runTerminalCommand(
  rawInput: string,
  data: PortfolioData,
): TerminalLine[] {
  const command = parseTerminalCommand(rawInput);
  if (!command) return [];

  switch (command) {
    case "help":
      return [{ type: "output", text: HELP_TEXT }];
    case "projects":
      return data.projects.map((p) => ({
        type: "output",
        text: `• ${p.name} — ${p.tagline}`,
      }));
    case "skills":
      return data.skills.map((s) => ({
        type: "output",
        text: `• ${s.title}: ${s.items.slice(0, 6).join(", ")}`,
      }));
    case "resume":
      return [
        {
          type: "output",
          text: `Resume: ${data.personal.resumePath}`,
        },
      ];
    case "contact":
      return [
        { type: "output", text: `Email: ${data.personal.email}` },
        { type: "output", text: `Phone: ${data.personal.phone}` },
        { type: "output", text: `Location: ${data.personal.location}` },
      ];
    case "clear":
      return [];
    default:
      return [
        {
          type: "error",
          text: `Unknown command "${rawInput.trim()}". Type help for available commands.`,
        },
      ];
  }
}
