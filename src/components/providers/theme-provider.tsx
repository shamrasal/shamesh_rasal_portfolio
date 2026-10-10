"use client";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div className="dark text-foreground bg-background min-h-screen">{children}</div>;
}
