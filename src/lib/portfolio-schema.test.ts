import { describe, expect, it } from "vitest";
import { portfolio } from "@/data/portfolio";
import { parsePortfolio } from "@/lib/portfolio-schema";

describe("portfolio schema", () => {
  it("parses the exported portfolio data", () => {
    const parsed = parsePortfolio(portfolio);
    expect(parsed.personal.name).toBe("Shamesh Rasal");
  });

  it("features MajhGhar first", () => {
    const parsed = parsePortfolio(portfolio);
    expect(parsed.projects[0]?.id).toBe("majghar");
    expect(parsed.projects[0]?.featured).toBe(true);
  });
});
