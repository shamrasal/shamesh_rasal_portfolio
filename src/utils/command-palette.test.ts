import { describe, expect, it } from "vitest";
import { portfolio } from "@/data/portfolio";
import {
  buildCommandItems,
  filterCommandItems,
  normalizeQuery,
} from "@/utils/command-palette";

describe("command palette utils", () => {
  it("normalizes query strings", () => {
    expect(normalizeQuery("  Projects ")).toBe("projects");
  });

  it("returns all items for empty query", () => {
    const items = buildCommandItems(portfolio);
    expect(filterCommandItems(items, "")).toHaveLength(items.length);
  });

  it("filters by label and keywords", () => {
    const items = buildCommandItems(portfolio);
    const results = filterCommandItems(items, "majh");
    expect(results.some((r) => r.label.includes("MajhGhar"))).toBe(true);
  });

  it("returns no results for nonsense query", () => {
    const items = buildCommandItems(portfolio);
    expect(filterCommandItems(items, "zzzznotfound")).toHaveLength(0);
  });
});
