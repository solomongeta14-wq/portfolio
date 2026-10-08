"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useReveal } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Education() {
  const reveal = useReveal({ y: 28, duration: 0.5 });

  return (
    <section id="education" className="mt-20 scroll-mt-24 bg-page sm:ml-7 md:ml-0 lg:mt-24">
      <div className="container mx-auto px-6 md:px-20">
        <SectionHeading title="My Education Journey" />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Timeline line (desktop: center, mobile: left) */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 hidden h-full w-0.5 -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-lime), var(--accent-lime-border), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-4 h-full w-0.5 md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-lime), var(--accent-lime-border), transparent)",
            }}
          />

          {portfolio.education.map((entry, idx) => (
            <motion.div key={entry.degree} {...reveal} className="relative">
              {/* Desktop row */}
              <div className="relative hidden w-full items-center md:flex">
                <div className="flex w-[45%] justify-end pr-8">
                  {idx % 2 === 0 ? <EducationCard entry={entry} align="right" /> : null}
                </div>
                <div className="relative z-10 flex w-[10%] items-center justify-center">
                  <span
                    className="h-4 w-4 rounded-full border-4"
                    style={{
                      backgroundColor: "var(--page-bg)",
                      borderColor: "var(--accent-lime)",
                      boxShadow: "0 0 12px var(--accent-lime)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="w-[45%] pl-8">
                  {idx % 2 === 1 ? <EducationCard entry={entry} align="left" /> : null}
                </div>
              </div>

              {/* Mobile row */}
              <div className="relative flex w-full items-start gap-4 pl-10 md:hidden">
                <span
                  className="absolute top-6 left-3 z-10 h-3 w-3 rounded-full border-2"
                  style={{
                    backgroundColor: "var(--page-bg)",
                    borderColor: "var(--accent-lime)",
                    boxShadow: "0 0 8px var(--accent-lime)",
                  }}
                  aria-hidden="true"
                />
                <EducationCard entry={entry} align="left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  entry,
  align,
}: {
  entry: (typeof portfolio.education)[number];
  align: "left" | "right";
}) {
  return (
    <div
      className="group relative w-full rounded-2xl p-5 transition-all duration-300 hover:border-accent-border md:p-7"
      style={{
        backgroundColor: "var(--card-bg-alt)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        aria-hidden="true"
        className={`absolute top-7 hidden h-3 w-3 rotate-45 rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block ${
          align === "right" ? "-right-1.5" : "-left-1.5"
        }`}
        style={{ backgroundColor: "var(--accent-lime)" }}
      />
      <div className="flex items-start gap-4">
        <div
          className="shrink-0 rounded-xl bg-gradient-to-br from-lime-500 to-blue-500 p-2.5"
          aria-hidden="true"
        >
          <GraduationCap size={22} className="text-white" />
        </div>
        <div className="min-w-0">
          {entry.period && (
            <p className="mb-0.5 font-mono text-xs text-accent">{entry.period}</p>
          )}
          <h3 className="text-lg leading-tight font-bold text-hi md:text-xl">{entry.degree}</h3>
          <p className="mt-1 text-sm text-med italic">{entry.institution}</p>
          <span
            className="mt-3 inline-flex items-center rounded-lg px-3 py-1 text-[11px] font-semibold tracking-widest uppercase"
            style={{
              backgroundColor: "var(--accent-lime-bg)",
              border: "1px solid var(--accent-lime-border)",
              color: "var(--accent-lime)",
            }}
          >
            {entry.location}
          </span>
        </div>
      </div>
    </div>
  );
}
