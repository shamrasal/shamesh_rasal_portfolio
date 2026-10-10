import { describe, expect, it } from "vitest";
import { portfolio } from "@/data/portfolio";
import { parseTerminalCommand, runTerminalCommand } from "@/utils/terminal";

describe("terminal utils", () => {
  it("parses commands case-insensitively", () => {
    expect(parseTerminalCommand("  HELP ")).toBe("help");
  });

  it("returns empty for blank input", () => {
    expect(runTerminalCommand("   ", portfolio)).toEqual([]);
  });

  it("lists projects", () => {
    const lines = runTerminalCommand("projects", portfolio);
    expect(lines.length).toBeGreaterThan(0);
    expect(lines[0]?.text).toContain("MajhGhar");
  });

  it("handles unknown commands", () => {
    const lines = runTerminalCommand("foobar", portfolio);
    expect(lines[0]?.type).toBe("error");
  });
});
