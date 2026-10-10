"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { portfolio } from "@/data/portfolio";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactForm() {
  const reducedMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Failed to send message");
      }
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      if (!reducedMotion) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
      }
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Let's build something ambitious — reach out for collaborations or senior frontend roles."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-3 text-sm text-zinc-300">
          <p>
            <span className="text-zinc-500">Email</span>
            <br />
            {portfolio.personal.email}
          </p>
          <p>
            <span className="text-zinc-500">Phone</span>
            <br />
            {portfolio.personal.phone}
          </p>
          <p>
            <span className="text-zinc-500">Location</span>
            <br />
            {portfolio.personal.location}
          </p>
        </GlassCard>
        <GlassCard>
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                aria-invalid={!!errors.name}
              />
              {errors.name ? <p className="text-xs text-red-400 mt-1">{errors.name}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                aria-invalid={!!errors.email}
              />
              {errors.email ? <p className="text-xs text-red-400 mt-1">{errors.email}</p> : null}
            </div>
            <div>
              <Label htmlFor="subject">Subject (optional)</Label>
              <Input
                id="subject"
                value={values.subject ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                className="flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                aria-invalid={!!errors.message}
              />
              {errors.message ? (
                <p className="text-xs text-red-400 mt-1">{errors.message}</p>
              ) : null}
            </div>
            {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}
            {status === "success" ? (
              <p className="text-sm text-emerald-400" role="status">
                Message sent successfully. I&apos;ll get back to you soon.
              </p>
            ) : null}
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}
