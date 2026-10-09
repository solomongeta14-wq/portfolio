"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Landmark, Sparkles, type LucideIcon } from "lucide-react";
import type { EducationEntry, EducationIcon } from "@/data/portfolio";
import { useReveal } from "@/lib/motion";

const milestoneIcons: Record<EducationIcon, LucideIcon> = {
  book: BookOpen,
  graduation: GraduationCap,
  university: Landmark,
};

/**
 * A single milestone on the education timeline. Alternates sides on desktop
 * and collapses to a left-aligned rail on mobile.
 */
export default function TimelineItem({
  entry,
  index,
  side,
}: {
  entry: EducationEntry;
  index: number;
  side: "left" | "right";
}) {
  const reveal = useReveal({ y: 30, delay: 0.08 * index, duration: 0.55 });
  const Icon = milestoneIcons[entry.icon];
  const step = String(index + 1).padStart(2, "0");

  return (
    <div className="relative">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className="absolute top-5 left-5 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full md:top-1/2 md:left-1/2 md:-translate-y-1/2"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--accent-lime-border)",
          color: "var(--accent-lime)",
          boxShadow: "0 0 0 5px var(--page-bg), 0 0 22px var(--glow-lime)",
        }}
      >
        <Icon size={20} aria-hidden="true" />
      </span>

      <motion.div
        {...reveal}
        className={`ml-16 md:ml-0 md:w-[46%] ${side === "left" ? "md:mr-auto" : "md:ml-auto"}`}
      >
        <article
          className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-accent-border md:p-7"
          style={{
            backgroundColor: "var(--card-bg-alt)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-70"
            style={{ backgroundColor: "var(--glow-lime)" }}
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
                {entry.level}
              </p>
              <span
                aria-hidden="true"
                className="font-mono text-2xl font-bold"
                style={{ color: "var(--border-subtle)" }}
              >
                {step}
              </span>
            </div>

            <h3 className="mt-2 text-xl leading-tight font-bold text-hi md:text-2xl">
              {entry.degree ?? entry.institution}
            </h3>
            {entry.degree && (
              <p className="mt-0.5 text-sm font-medium text-accent">{entry.institution}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {entry.period && (
                <span className="tag-pill" style={{ fontSize: "0.7rem" }}>
                  {entry.period}
                </span>
              )}
              {entry.credential && (
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
                  style={{
                    backgroundColor: "var(--accent-gold-bg)",
                    border: "1px solid var(--accent-gold)",
                    color: "var(--accent-gold-bright)",
                  }}
                >
                  {entry.credential}
                </span>
              )}
            </div>

            {entry.description && (
              <p className="mt-4 text-sm leading-relaxed text-lo">{entry.description}</p>
            )}

            {entry.humor && (
              <p
                className="mt-4 flex items-start gap-2 rounded-xl p-3 text-sm italic text-med"
                style={{
                  backgroundColor: "var(--page-bg-deep)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <Sparkles size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>{entry.humor}</span>
              </p>
            )}
          </div>
        </article>
      </motion.div>
    </div>
  );
}
