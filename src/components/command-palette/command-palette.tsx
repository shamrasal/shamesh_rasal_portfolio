"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import {
  buildCommandItems,
  filterCommandItems,
  type CommandItem,
} from "@/utils/command-palette";
import { scrollToSection } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function runCommand(item: CommandItem) {
  if (item.action === "scroll") scrollToSection(item.target);
  if (item.action === "link" && item.target !== "#") {
    window.open(item.target, "_blank", "noopener,noreferrer");
  }
  if (item.action === "download") {
    const a = document.createElement("a");
    a.href = item.target;
    a.download = "";
    a.click();
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useMemo(() => buildCommandItems(portfolio), []);
  const filtered = useMemo(() => filterCommandItems(items, query), [items, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    acc[item.group] = acc[item.group] ?? [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-[90] w-[min(92vw,560px)] -translate-x-1/2 rounded-2xl glass p-4 focus:outline-none"
          aria-label="Command palette"
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Input
            autoFocus
            placeholder="Search sections, projects, resume…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="mt-3 max-h-72 overflow-y-auto">
            {Object.keys(groups).length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-zinc-500">No results</p>
            ) : (
              Object.entries(groups).map(([group, groupItems]) => (
                <div key={group} className="mb-3">
                  <p className="px-2 text-xs uppercase tracking-wide text-zinc-500">{group}</p>
                  <ul>
                    {groupItems.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="w-full text-left rounded-lg px-2 py-2 text-sm text-zinc-200 hover:bg-white/10"
                          onClick={() => {
                            runCommand(item);
                            setOpen(false);
                            setQuery("");
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
          <p className="mt-2 text-xs text-zinc-500">Press Esc to close · Ctrl/Cmd+K</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
