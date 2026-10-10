import { cn } from "@/lib/utils";

export function GradientBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-[1px] bg-gradient-to-br from-indigo-400/60 via-cyan-400/40 to-purple-500/50",
        className,
      )}
    >
      <div className="rounded-2xl bg-[#0a0a12]/90 h-full">{children}</div>
    </div>
  );
}
