import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

export function Section({
  id,
  title,
  subtitle,
  className,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28 scroll-mt-24", className)}>
      <Container>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-zinc-400 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
